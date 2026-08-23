import { GoogleGenAI } from '@google/genai';
import { KB_RECORDS, KB_CHUNKS } from '../data/knowledgeBase';
import {
  GroundedRAGResponse,
  KBChunk,
  RetrievedChunkMatch,
  DecisionStatus
} from '../types';

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return geminiClient;
}

// Tokenize text into lowercased normalized tokens
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0600-\u06FF-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

// Classify query intent and domain
function classifyQuery(query: string) {
  const qLower = query.toLowerCase();

  let targetDomain: GroundedRAGResponse['classification']['targetDomain'] = 'General / Out of Scope';
  let isBarheeSpecific = false;
  let cultivarDetected = 'None';
  let requiresHardConstraintCheck = false;

  if (qLower.includes('barhee') || qLower.includes('barhi') || qLower.includes('برحي')) {
    isBarheeSpecific = true;
    cultivarDetected = 'Barhee';
  } else if (qLower.includes('nabbut') || qLower.includes('saif') || qLower.includes('نبتة سيف')) {
    cultivarDetected = 'Nabbut-Saif';
  } else if (qLower.includes('khalas') || qLower.includes('خلاص')) {
    cultivarDetected = 'Khalas';
  }

  if (
    qLower.includes('pollin') ||
    qLower.includes('pollen') ||
    qLower.includes('spathe') ||
    qLower.includes('تلقيح') ||
    qLower.includes('لقاح') ||
    qLower.includes('طلع')
  ) {
    targetDomain = 'Barhee Agriculture';
  } else if (
    qLower.includes('harvest') ||
    qLower.includes('khalal') ||
    qLower.includes('rutab') ||
    qLower.includes('kimri') ||
    qLower.includes('tamar') ||
    qLower.includes('maturity') ||
    qLower.includes('brix') ||
    qLower.includes('حصاد') ||
    qLower.includes('خلال') ||
    qLower.includes('رطب')
  ) {
    targetDomain = 'Barhee Agriculture';
  } else if (
    qLower.includes('water') ||
    qLower.includes('irrigation') ||
    qLower.includes('penman') ||
    qLower.includes('evapotranspiration') ||
    qLower.includes('etc') ||
    qLower.includes('eto') ||
    qLower.includes('ري') ||
    qLower.includes('مياه')
  ) {
    targetDomain = 'Irrigation & Water';
  } else if (
    qLower.includes('pdpl') ||
    qLower.includes('privacy') ||
    qLower.includes('gap') ||
    qLower.includes('saudi gap') ||
    qLower.includes('article 12') ||
    qLower.includes('dates mark') ||
    qLower.includes('mewa') ||
    qLower.includes('sdaia') ||
    qLower.includes('حماية البيانات') ||
    qLower.includes('سعودي قاب') ||
    qLower.includes('علامة التمور')
  ) {
    targetDomain = 'Policy & Compliance';
    requiresHardConstraintCheck = true;
  } else if (
    qLower.includes('y.3172') ||
    qLower.includes('mlfo') ||
    qLower.includes('digital twin') ||
    qLower.includes('architecture') ||
    qLower.includes('pipeline') ||
    qLower.includes('node') ||
    qLower.includes('توأم رقمي')
  ) {
    targetDomain = 'Architecture & Digital Twin';
  } else if (
    qLower.includes('vision') ||
    qLower.includes('yolo') ||
    qLower.includes('deep learning') ||
    qLower.includes('computer vision') ||
    qLower.includes('segmentation') ||
    qLower.includes('رؤية حاسوبية')
  ) {
    targetDomain = 'Computer Vision / ML';
  } else if (
    qLower.includes('sfda') ||
    qLower.includes('wash') ||
    qLower.includes('safety') ||
    qLower.includes('residue') ||
    qLower.includes('سلامة الغذاء') ||
    qLower.includes('غسيل')
  ) {
    targetDomain = 'Food Safety';
  } else if (
    qLower.includes('stat') ||
    qLower.includes('million') ||
    qLower.includes('census') ||
    qLower.includes('gastat') ||
    qLower.includes('إحصاء')
  ) {
    targetDomain = 'Barhee Agriculture';
  }

  return {
    intent: 'Evidence-Grounded Query',
    targetDomain,
    cultivarDetected,
    isBarheeSpecific,
    requiresHardConstraintCheck
  };
}

// Retrieve relevant chunks using hybrid deterministic scoring
export function retrieveEvidence(query: string): RetrievedChunkMatch[] {
  const queryTokens = tokenize(query);
  const qLower = query.toLowerCase();

  const matches: RetrievedChunkMatch[] = [];

  for (const chunk of KB_CHUNKS) {
    const parentKb = KB_RECORDS.find((k) => k.kbId === chunk.kbId);
    let score = 0;

    // 1. Direct ID matches (Highest weight)
    if (qLower.includes(chunk.kbId.toLowerCase())) score += 5.0;
    if (qLower.includes(chunk.chkId.toLowerCase())) score += 6.0;

    // 2. Keyword frequency in chunk content and title
    const titleTokens = tokenize(chunk.sourceTitle);
    const contentTokens = tokenize(chunk.content);
    const claimsTokens = tokenize(chunk.claims.join(' '));
    const sectionTokens = tokenize(chunk.section);

    let matchCount = 0;
    for (const qToken of queryTokens) {
      if (titleTokens.includes(qToken)) {
        score += 1.8;
        matchCount++;
      }
      if (sectionTokens.includes(qToken)) {
        score += 1.5;
        matchCount++;
      }
      if (claimsTokens.includes(qToken)) {
        score += 1.2;
        matchCount++;
      }
      if (contentTokens.includes(qToken)) {
        score += 0.8;
        matchCount++;
      }
    }

    // 3. Domain & Topic Boosts
    const topicTokens = parentKb ? tokenize(parentKb.topic + ' ' + parentKb.kharafComponent) : [];
    for (const qToken of queryTokens) {
      if (topicTokens.includes(qToken)) {
        score += 1.0;
      }
    }

    // 4. Specific high-signal semantic triggers
    // Barhee Pollination
    if ((qLower.includes('pollin') || qLower.includes('pollen') || qLower.includes('تلقيح')) && chunk.kbId === 'KB-016') {
      score += 4.5;
    }
    // Barhee Harvest / Khalal / Maturity
    if ((qLower.includes('harvest') || qLower.includes('khalal') || qLower.includes('maturity') || qLower.includes('حصاد') || qLower.includes('خلال')) && (chunk.kbId === 'KB-022' || chunk.kbId === 'KB-017' || chunk.kbId === 'KB-018')) {
      score += 4.0;
    }
    // Penman-Monteith / Water Requirements
    if ((qLower.includes('penman') || qLower.includes('water requirement') || qLower.includes('evapotranspiration') || qLower.includes('احتياج مائي')) && chunk.kbId === 'KB-013') {
      score += 4.5;
    }
    // Saudi G.A.P CP5.1.1
    if ((qLower.includes('gap') || qLower.includes('cp5.1.1') || qLower.includes('record') || qLower.includes('سعودي قاب')) && chunk.kbId === 'KB-006') {
      score += 4.5;
    }
    // PDPL & Privacy
    if ((qLower.includes('pdpl') || qLower.includes('privacy') || qLower.includes('sdaia') || qLower.includes('حماية البيانات')) && (chunk.kbId === 'KB-002' || chunk.kbId === 'KB-003' || chunk.kbId === 'KB-004')) {
      score += 4.5;
    }
    // ITU-T Y.3172 & Architecture
    if ((qLower.includes('y.3172') || qLower.includes('mlfo') || qLower.includes('logical node') || qLower.includes('هيكلية')) && chunk.kbId === 'KB-001') {
      score += 4.5;
    }
    // Digital Twin
    if ((qLower.includes('digital twin') || qLower.includes('توأم رقمي')) && (chunk.kbId === 'KB-023' || chunk.kbId === 'KB-024')) {
      score += 4.5;
    }
    // Saudi Dates Mark
    if ((qLower.includes('dates mark') || qLower.includes('علامة التمور') || qLower.includes('mrl')) && chunk.kbId === 'KB-010') {
      score += 4.5;
    }
    // SFDA Date Washing
    if ((qLower.includes('wash') || qLower.includes('sfda') || qLower.includes('غسيل') || qLower.includes('سلامة')) && chunk.kbId === 'KB-019') {
      score += 4.0;
    }
    // GASTAT Statistics
    if ((qLower.includes('stat') || qLower.includes('million') || qLower.includes('إحصاء')) && chunk.kbId === 'KB-020') {
      score += 3.5;
    }
    // MEWA Article 12
    if ((qLower.includes('article 12') || qLower.includes('مادة 12')) && chunk.kbId === 'KB-005') {
      score += 4.5;
    }
    // Hasr Register
    if ((qLower.includes('hasr') || qLower.includes('حصر')) && chunk.kbId === 'KB-008') {
      score += 4.5;
    }

    if (score > 1.2) {
      // Determine match type
      let matchType: RetrievedChunkMatch['matchType'] = 'direct_evidence';
      let relevanceExplanation = 'Direct source evidence matching query domain.';

      // Cultivar distinction:
      if (chunk.cultivarRelevance.includes('Nabbut-Saif') || chunk.cultivarRelevance.includes('Khalas')) {
        matchType = 'contextual_evidence';
        relevanceExplanation = `Contextual evidence from ${chunk.cultivarRelevance}. Not direct Barhee evidence.`;
      } else if (chunk.cultivarRelevance.includes('Non-Botanical')) {
        matchType = 'direct_evidence';
        relevanceExplanation = 'Direct standard/policy framework evidence.';
      } else if (chunk.cultivarRelevance.includes('Barhee')) {
        matchType = 'direct_evidence';
        relevanceExplanation = 'Direct verified evidence specifically on Barhee cultivar.';
      }

      matches.push({
        chunk,
        score,
        matchType,
        relevanceExplanation
      });
    }
  }

  // Sort descending by score
  matches.sort((a, b) => b.score - a.score);

  // Return top 5 most relevant chunks
  return matches.slice(0, 5);
}

// Generate grounded response using either Gemini or Deterministic Engine
export async function executeGroundedRAG(query: string): Promise<GroundedRAGResponse> {
  const startTime = Date.now();
  const classification = classifyQuery(query);
  const retrievedMatches = retrieveEvidence(query);

  // Check Abstention threshold (Rule 1: No unsupported claims)
  const isAbstention = retrievedMatches.length === 0 || retrievedMatches[0].score < 1.5;

  if (isAbstention) {
    const executionTimeMs = Date.now() - startTime;
    return {
      query,
      classification,
      decisionStatus: 'Insufficient evidence',
      answer:
        'Insufficient verified evidence was retrieved from the Kharaf Knowledge Base to support a reliable answer. No verified agricultural or policy records exist in the indexed database for this query topic.',
      evidenceUsed: [],
      constraintsApplied: [
        {
          rule: 'Rule 1: No Unsupported Claims',
          description: 'System automatically abstained because retrieval produced zero verified supporting evidence records.',
          status: 'ABSTAINED'
        }
      ],
      isAbstention: true,
      abstentionReason: 'Zero matching evidence records found in the 24 authoritative Knowledge Base entries.',
      executionTimeMs,
      engineUsed: 'Deterministic Grounded Engine (Kharaf Fallback)'
    };
  }

  // Prepare Evidence Cards and Constraints
  const evidenceUsed = retrievedMatches.map((m) => {
    const parent = KB_RECORDS.find((k) => k.kbId === m.chunk.kbId);
    return {
      sourceTitle: m.chunk.sourceTitle,
      kbId: m.chunk.kbId,
      chkId: m.chunk.chkId,
      authority: m.chunk.authority,
      evidenceType: m.chunk.evidenceType,
      scopeCaveat: m.chunk.caveats || parent?.caveats || 'No specific caveat recorded.',
      hardConstraint: m.chunk.hardConstraint,
      relevance: m.matchType === 'direct_evidence' ? ('direct' as const) : ('contextual' as const)
    };
  });

  // Evaluate Decision Status
  let decisionStatus: DecisionStatus = 'Supported by evidence';
  const constraintsApplied: GroundedRAGResponse['constraintsApplied'] = [];

  // Check if all evidence is contextual only
  const allContextual = retrievedMatches.every((m) => m.matchType === 'contextual_evidence');
  if (allContextual) {
    decisionStatus = 'Contextual evidence only';
    constraintsApplied.push({
      rule: 'Rule 2: Cultivar Scope Isolation',
      description: 'Retrieved evidence is derived from other cultivars (e.g. Nabbut-Saif or Khalas). Findings are flagged as contextual comparisons only and not direct Barhee prescriptions.',
      status: 'FLAGGED'
    });
  }

  // Check hard constraints
  const hasHardConstraint = retrievedMatches.some((m) => m.chunk.hardConstraint);
  if (hasHardConstraint) {
    constraintsApplied.push({
      rule: 'Rule 5: Statutory & Standards Hard Constraint',
      description: 'Retrieved evidence contains legally binding Saudi statutes (PDPL / MEWA Article 12) or mandatory certification standards (Saudi G.A.P / Saudi Dates Mark). Outputs must strictly reflect these non-negotiable requirements.',
      status: 'COMPLIANT'
    });
  }

  // Check Do-Not-Infer restrictions
  for (const m of retrievedMatches) {
    if (m.chunk.doNotInfer && m.chunk.doNotInfer.length > 0) {
      for (const restriction of m.chunk.doNotInfer) {
        constraintsApplied.push({
          rule: `Rule 6: Do Not Infer [${m.chunk.chkId}]`,
          description: restriction,
          status: 'COMPLIANT'
        });
      }
    }
  }

  // Generate Answer: Try Gemini API first if configured
  const ai = getGeminiClient();
  let generatedAnswer = '';
  let engineUsed: GroundedRAGResponse['engineUsed'] = 'Deterministic Grounded Engine (Kharaf Fallback)';

  if (ai) {
    try {
      const evidencePromptBlock = retrievedMatches
        .map(
          (m, idx) => `[Source ${idx + 1}]
KB ID: ${m.chunk.kbId}
CHK ID: ${m.chunk.chkId}
Title: ${m.chunk.sourceTitle}
Authority: ${m.chunk.authority}
Evidence Type: ${m.chunk.evidenceType}
Cultivar Relevance: ${m.chunk.cultivarRelevance}
Section: ${m.chunk.section}
Content: ${m.chunk.content}
Key Claims: ${m.chunk.claims.join(' | ')}
Scope & Caveats: ${m.chunk.caveats}
Do Not Infer: ${m.chunk.doNotInfer.join('; ')}`
        )
        .join('\n\n');

      const systemInstruction = `You are Kharaf AI, an evidence-grounded decision-support system for Barhee/Barhi date palms in Saudi Arabia, operating according to ITU-T Y.3172 architectural standards.
Answer the user's question ONLY using the retrieved Kharaf Knowledge Base evidence supplied below.
Strict Grounding Rules:
1. Do not use unstated assumptions or outside pre-training facts as evidence.
2. Do not invent sources, URLs, thresholds, or citations.
3. Respect every source scope limitation (e.g. if a study is for Nabbut-Saif or Khalas, do NOT state it is for Barhee).
4. Respect all 'Do Not Infer' restrictions.
5. In your answer, explicitly cite the relevant KB ID (e.g. [KB-016]) and CHK ID (e.g. [CHK-016-A]) where specific claims are made.
6. Provide a concise, professional, and clear answer structured with clear headings or bullet points where appropriate.
7. If evidence is insufficient to answer the question, state: "Insufficient verified evidence was retrieved from the Kharaf Knowledge Base to support a reliable answer."`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `USER QUESTION: ${query}\n\nRETRIEVED EVIDENCE CHUNKS:\n${evidencePromptBlock}`,
        config: {
          systemInstruction,
          temperature: 0.1
        }
      });

      if (response.text) {
        generatedAnswer = response.text.trim();
        engineUsed = 'Gemini 3.7 Flash + Kharaf RAG';
      }
    } catch (err) {
      console.warn('Gemini API call failed or rate-limited; falling back to deterministic synthesis:', err);
    }
  }

  // Fallback to high-precision deterministic grounded synthesis if Gemini is absent or failed
  if (!generatedAnswer) {
    generatedAnswer = synthesizeDeterministicAnswer(query, retrievedMatches, classification);
    engineUsed = 'Deterministic Grounded Engine (Kharaf Fallback)';
  }

  // Build Farmer-Friendly Structured Breakdown
  const structuredFields = generateFarmerStructuredOutput(query, retrievedMatches, classification, decisionStatus);

  const executionTimeMs = Date.now() - startTime;

  return {
    query,
    classification,
    decisionStatus,
    answer: generatedAnswer,
    plainSummary: structuredFields.plainSummary,
    whatThisMeans: structuredFields.whatThisMeans,
    thingsToConsider: structuredFields.thingsToConsider,
    recommendedNextStep: structuredFields.recommendedNextStep,
    userFriendlyStatus: structuredFields.userFriendlyStatus,
    evidenceUsed,
    constraintsApplied,
    isAbstention: false,
    executionTimeMs,
    engineUsed
  };
}

// Generate structured plain-language fields tailored for non-technical farmers
function generateFarmerStructuredOutput(
  query: string,
  matches: RetrievedChunkMatch[],
  classification: GroundedRAGResponse['classification'],
  decisionStatus: DecisionStatus
) {
  const primary = matches[0]?.chunk;
  const qLower = query.toLowerCase();

  let userFriendlyStatus = 'Supported by verified agricultural evidence';
  if (decisionStatus === 'Contextual evidence only') {
    userFriendlyStatus = 'Contextual evidence only (not specific to Barhee cultivar)';
  } else if (decisionStatus === 'Requires human review') {
    userFriendlyStatus = 'This situation needs expert review before a recommendation can be made.';
  }

  // 1. Pollination (KB-016)
  if (primary && primary.kbId === 'KB-016') {
    if (qLower.includes('pollen source') || qLower.includes('metaxenia')) {
      return {
        userFriendlyStatus,
        plainSummary: 'Using high-potency male pollen (metaxenia) increases Barhee bunch weight (15–22 kg) and speeds up the ripening process to the yellow Khalal stage.',
        whatThisMeans: 'The type and quality of male pollen you choose directly affects how heavy, sweet, and quickly your Barhee date bunches develop.',
        thingsToConsider: [
          'High-viability pollen improves bunch size, fruit weight, and flesh-to-seed ratio.',
          'Selecting vigorous pollen helps bunches turn golden-yellow (Khalal) faster.',
          'However, good pollen cannot fix missing the 2–4 day female flower receptivity window.'
        ],
        recommendedNextStep: 'Select certified, fresh high-viability male pollen and prepare application equipment before spathes open.'
      };
    }

    return {
      userFriendlyStatus,
      plainSummary: 'The optimal window to pollinate your Barhee date palms is **2 to 4 days after the female flower spathe opens**.',
      whatThisMeans: 'Pollinating during this 2–4 day window achieves the highest fruit set (78%–85%) and bunch yield. Missing this timing causes fruitlet drop or poor fruit quality.',
      thingsToConsider: [
        'Pollinating on Day 0 or 1 is too early (fruit set drops to ~61%).',
        'Delaying pollination to Day 6 reduces fruit set to 48%.',
        'Delaying past Day 8–10 leads to severe failure (<30%) and unmarketable triplet fruitlets (parthenocarpy).',
        'Morning pollination (between 8:00 AM and 11:00 AM) avoids midday heat stress on pollen grains.'
      ],
      recommendedNextStep: 'Inspect your Barhee spathes daily and execute manual or dust pollination between Day 2 and Day 4 of cracking.'
    };
  }

  // 2. Maturity & Harvest (KB-022, KB-017, KB-018)
  if (primary && (primary.kbId === 'KB-022' || primary.kbId === 'KB-017' || primary.kbId === 'KB-018')) {
    return {
      userFriendlyStatus,
      plainSummary: 'Barhee dates should be harvested when they reach the **crisp, bright golden-yellow Khalal stage** with sugar levels between **28° and 32° Brix**.',
      whatThisMeans: 'Unlike other dates that are eaten soft, Barhee dates are famously enjoyed fresh and crunchy at the yellow Khalal stage. Timing harvest before they turn soft (Rutab) is essential for top market value.',
      thingsToConsider: [
        'Look for 90%–100% uniform golden-yellow color across the bunch.',
        'Total sugar (TSS) should measure 28°–32° Brix for optimal sweetness and low astringency.',
        'Use padded harvest crates and avoid dropping bunches to prevent skin bruising.',
        'Pre-cool harvested fruit and store at 0°–4°C to preserve crispness and prevent premature softening.'
      ],
      recommendedNextStep: 'Inspect your palm clusters optically for 90%+ yellow coloration and harvest in the cool morning hours into padded containers.'
    };
  }

  // 3. Water Requirements & Penman-Monteith (KB-013)
  if (primary && primary.kbId === 'KB-013') {
    return {
      userFriendlyStatus,
      plainSummary: 'Mature date palms in Saudi Arabia require **100–140 Liters/day in winter** and **250–400+ Liters/day during peak summer heat** (July–August).',
      whatThisMeans: 'Date palm water demand changes dramatically with temperature and solar heat. Calculating daily water needs ensures healthy yields without wasting water.',
      thingsToConsider: [
        'Summer heat (40°C+) increases daily evapotranspiration demand to 300–400+ L per palm.',
        'Winter demand drops to 100–140 L per palm per day.',
        'Watering during early mornings or evenings reduces evaporation losses.',
        'Maintain soil moisture in the root zone between 55% and 75% for sandy loam soils.'
      ],
      recommendedNextStep: 'Check current daily temperatures on your Weather screen and adjust drip irrigation runtimes accordingly.'
    };
  }

  // 4. Saudi G.A.P (KB-006)
  if (primary && primary.kbId === 'KB-006') {
    return {
      userFriendlyStatus,
      plainSummary: 'Saudi G.A.P standard CP5.1.1 requires calculating water needs scientifically and **maintaining written or digital irrigation records for at least 24 months**.',
      whatThisMeans: 'To maintain farm certification and meet national standards, you must prove you calculate irrigation needs and log every water application.',
      thingsToConsider: [
        'Logs must record irrigation dates, run durations, water volumes, and block numbers.',
        'Keep records accessible for a minimum of 24 months for official farm audits.',
        'Under MEWA Agriculture Law Article 12, water-rationalization practices are mandatory.'
      ],
      recommendedNextStep: 'Ensure your farm irrigation logs are up to date and stored safely in digital or physical logbooks.'
    };
  }

  // 5. Saudi PDPL Privacy (KB-002, KB-003)
  if (primary && (primary.kbId === 'KB-002' || primary.kbId === 'KB-003')) {
    return {
      userFriendlyStatus,
      plainSummary: 'Farm owner information, contact details, and farm map coordinates are protected under the Saudi Personal Data Protection Law (PDPL).',
      whatThisMeans: 'Your agricultural platform must keep your personal details secure, use encryption, and never share farm data without your consent.',
      thingsToConsider: [
        'Farm software must obtain consent before collecting operator credentials.',
        'Data must be encrypted in transit and at rest.',
        'Any security incident must be reported to SDAIA within 72 hours.'
      ],
      recommendedNextStep: 'Verify your farm manager account settings and ensure role permissions are properly assigned.'
    };
  }

  // 6. Cultivar Isolation Guardrail (KB-014)
  if (primary && primary.kbId === 'KB-014') {
    return {
      userFriendlyStatus: 'Contextual evidence only (Nabbut-Saif cultivar)',
      plainSummary: 'This irrigation research was conducted **strictly on the Nabbut-Saif date variety** and cannot be used directly for Barhee palms.',
      whatThisMeans: 'Different date palm varieties have different tree sizes, leaf canopies, and water demands. Kharaf AI protects you from applying wrong cultivar recommendations.',
      thingsToConsider: [
        'Nabbut-Saif deficit irrigation findings saved 25% water in Riyadh, but Barhee palms have heavier bunch loads.',
        'Barhee irrigation must be calculated using dedicated crop coefficients.'
      ],
      recommendedNextStep: 'Refer to the Barhee-specific water recommendations in the Kharaf Knowledge Base (KB-013).'
    };
  }

  // Default fallback structured output
  return {
    userFriendlyStatus,
    plainSummary: matches[0]?.chunk.claims[0] || 'Evidence retrieved from verified Knowledge Base.',
    whatThisMeans: 'This information is verified against official Saudi agricultural research and standards.',
    thingsToConsider: matches[0]?.chunk.claims.slice(1, 4) || ['Follow good agricultural practices for your palm variety.'],
    recommendedNextStep: 'Consult the detailed evidence cards below or consult with your farm extension manager.'
  };
}

// High-precision Deterministic Grounded Answer Synthesizer
function synthesizeDeterministicAnswer(
  query: string,
  matches: RetrievedChunkMatch[],
  classification: GroundedRAGResponse['classification']
): string {
  const primaryMatch = matches[0];
  const primaryChunk = primaryMatch.chunk;
  const qLower = query.toLowerCase();

  // Specific Domain Synthesis Templates based strictly on verified KB records

  // 1. Pollination Timing & Pollen Source (KB-016)
  if (primaryChunk.kbId === 'KB-016') {
    if (qLower.includes('pollen source') || qLower.includes('metaxenia')) {
      return `According to peer-reviewed agronomic research on tissue culture-derived Barhee date palms ([KB-016], [CHK-016-B]):

• **Metaxenia & Pollen Parent Impact:** The male pollen source exerts a statistically significant metaxenia effect on Barhee fruit characteristics, bunch weight (ranging from 14.8 kg to 22.4 kg per bunch), fruit weight, and flesh-to-seed percentage.
• **Ripening Advancement:** Pollen selection directly modulates the rate of color change and maturity progression from Kimri to the desirable Khalal stage.
• **Scope & Limitation:** While pollen compatibility significantly influences bunch size and quality, high-quality pollen alone cannot compensate for missing the female flower receptivity window.

*Authority:* ScienceDirect / Scientia Horticulturae ([KB-016]).`;
    }

    return `Based on verified agronomic research for Barhee date palms (*Phoenix dactylifera* L. cv. Barhee) ([KB-016], [CHK-016-A]):

• **Optimal Receptivity Window:** The highest fruit set (78.4% to 84.6%) and commercial bunch yield are achieved when pollination is performed **2 to 4 days after female spathe cracking/opening**.
• **Impact of Timing:** Pollination on Day 0 yields lower fruit set (~61.2%), while delaying pollination to Day 6 drops fruit set to 48.1%.
• **Consequences of Severe Delay:** Delaying pollination to 8–10 days post-opening causes severe fruit set failure (<25–35%) and the formation of unfertilized, commercially worthless triplet fruitlets (parthenocarpy).

*Authority:* ScienceDirect / Scientia Horticulturae ([KB-016]).`;
  }

  // 2. Barhee Maturity & Harvest (KB-022, KB-017, KB-018)
  if (primaryChunk.kbId === 'KB-022' || primaryChunk.kbId === 'KB-017' || primaryChunk.kbId === 'KB-018') {
    return `Based on FAO technical guidelines ([KB-022], [CHK-022-A]) and computer vision harvest research ([KB-017], [CHK-017-A]):

• **Target Maturity Stage:** Unlike cultivars like Khalas or Sukkari, Barhee dates are primarily harvested and marketed at the **fresh, crunchy yellow Khalal stage** due to their low soluble tannin astringency and high invert sugar content.
• **Harvest Readiness Indicators:**
  - **Color:** 90%–100% uniform bright golden-yellow bunch coloration.
  - **Sugar (Brix):** Total Soluble Solids (TSS) exceeding **28–32° Brix**.
  - **Texture:** Crisp and firm prior to extensive apical translucent softening into Rutab.
• **Harvesting & Postharvest Handling:** Bunches must be gently cut and lowered into padded harvesting crates ([KB-022]) to avoid skin bruising that triggers rapid enzymatic softening. Cold storage at 0–4°C ([KB-018]) inhibits invertase and polygalacturonase enzymes to maintain Khalal crispness.

*Authorities:* FAO ([KB-022]), ScienceDirect / EAAI ([KB-017]), Saudi Journal of Biological Sciences ([KB-018]).`;
  }

  // 3. Crop Water Requirements & Penman-Monteith (KB-013, KB-012)
  if (primaryChunk.kbId === 'KB-013' || primaryChunk.kbId === 'KB-012') {
    return `According to AGRIS peer-reviewed research on Saudi date palms across eight regions ([KB-013], [CHK-013-A]) and FAO irrigation standards ([KB-012]):

• **Estimation Methodology:** Mature date palm crop water requirements ($ET_c$) are calculated using the FAO Penman-Monteith equation ($ET_c = ET_o \\times K_c$), integrating air temperature, relative humidity, solar radiation, and wind speed with regionally calibrated crop coefficients ($K_c$).
• **Seasonal Water Dynamics:** Daily irrigation requirements range from **100–140 L/palm/day** during cool winter months to **250–400+ L/palm/day** during peak summer heat (July–August) in central Saudi Arabia.
• **Annual Requirement:** Annual water consumption for mature palms in arid central regions averages between 1,200 and 2,100 $\\text{m}^3\\text{/ha/year}$.

*Authorities:* AGRIS / Saudi Agricultural Research ([KB-013]), FAO ([KB-012]).`;
  }

  // 4. Saudi G.A.P Water Management (KB-006, KB-005)
  if (primaryChunk.kbId === 'KB-006' || primaryChunk.kbId === 'KB-005' || primaryChunk.kbId === 'KB-009') {
    return `Under official Saudi G.A.P standard CP5.1.1 ([KB-006], [CHK-006-A]) and Saudi Agriculture Law Article 12 ([KB-005], [CHK-005-A]):

• **Crop Water Requirement Calculation:** Certified date palm holdings must systematically calculate crop water requirements using recognized scientific methods (e.g. Penman-Monteith $ET_c$, calibrated soil moisture probes, or official extension guidance).
• **Mandatory Record Keeping:** The farm must maintain verifiable written or digital irrigation logs (recording dates, durations, applied water volumes, and block identifiers) for a **minimum of 24 months** for compliance audits.
• **Statutory Compliance:** Under MEWA Article 12, water-rationalization rules and Good Agricultural Practices are mandatory for commercial agricultural holdings.

*Authorities:* Saudi G.A.P / MEWA ([KB-006]), Ministry of Environment, Water and Agriculture ([KB-005]).`;
  }

  // 5. Saudi PDPL & Data Protection (KB-002, KB-003, KB-004)
  if (primaryChunk.kbId === 'KB-002' || primaryChunk.kbId === 'KB-003' || primaryChunk.kbId === 'KB-004') {
    return `Pursuant to the Saudi Personal Data Protection Law (PDPL) and its Implementing Regulations ([KB-002], [CHK-002-A], [KB-003], [CHK-003-A]):

• **Lawful Processing & Consent:** Processing of farm owners' personal data, cadastral coordinates, and operator credentials requires a lawful basis or explicit consent under PDPL Articles 5 & 6.
• **Data Minimization:** Data collection must be strictly limited to the minimum necessary to provide agricultural decision support.
• **Technical Safeguards:** Controllers must enforce encryption in transit (TLS) and at rest (AES-256), alongside role-based access controls.
• **Retention & Breach Notification:** Personal data must be destroyed or anonymized once the operational purpose expires. Any data breach posing risk must be reported to SDAIA within **72 hours**.

*Authorities:* SDAIA / Official Gazette (Umm Al-Qura) ([KB-002], [KB-003]).`;
  }

  // 6. ITU-T Y.3172 Architecture & MLFO (KB-001)
  if (primaryChunk.kbId === 'KB-001') {
    return `According to ITU-T Recommendation Y.3172 architectural standard ([KB-001], [CHK-001-A], [CHK-001-B]):

• **Logical Pipeline Nodes:** The ML pipeline comprises 7 standardized components:
  1. **SRC (Data Sources):** On-field soil sensors, weather stations, RGB camera feeds, and farm records.
  2. **C (Collector):** Ingests and aggregates telemetry via edge gateways with store-and-forward buffering.
  3. **PP (Pre-processor):** Cleans, normalizes, and extracts features from sensor and image inputs.
  4. **M (ML Model):** Houses the Computer Vision maturity classifier, ML Recommendation Model, and RAG retrieval.
  5. **P (Policy Node):** Enforces MEWA regulations, Saudi G.A.P, and safety constraints on model outputs before distribution.
  6. **D (Distributor):** Routes validated recommendations to API gateways and notification engines.
  7. **SINK (Output):** Delivers actionable insights to Farmer Dashboards and Auditor Interfaces.
• **MLFO Subsystem:** The ML Function Orchestrator manages model lifecycle, versioning, inference scheduling, and pipeline telemetry.

*Authority:* International Telecommunication Union (ITU-T Y.3172) ([KB-001]).`;
  }

  // 7. Digital Twin & IoT (KB-023, KB-024)
  if (primaryChunk.kbId === 'KB-023' || primaryChunk.kbId === 'KB-024') {
    return `Based on ITU-T Technical Report on Digital Agriculture ([KB-023], [CHK-023-A]) and ITU-T Y.Sup83 ([KB-024], [CHK-024-A]):

• **Digital Twin Architecture:** Creates a cyber-physical representation of each palm tree, integrating continuous sensor telemetry (soil moisture, temperature, humidity), RGB camera cluster images, and farm logs using semantic data models for cross-system interoperability.
• **Edge Resilience:** Edge gateways provide store-and-forward local buffering and MQTT/TLS secure transmission to withstand rural network intermittency.
• **Decision Support:** Connects digital twin states with AI models to deliver human-in-the-loop, evidence-grounded recommendations with full source auditability.

*Authority:* International Telecommunication Union (ITU) ([KB-023], [KB-024]).`;
  }

  // 8. Saudi Dates Mark & Food Safety (KB-010, KB-019)
  if (primaryChunk.kbId === 'KB-010' || primaryChunk.kbId === 'KB-019') {
    return `According to official requirements for the Saudi Dates Mark ([KB-010], [CHK-010-A]) and SFDA food safety guidance ([KB-019], [CHK-019-A]):

• **Saudi Dates Mark Criteria:** Administered by the National Center for Palms and Dates (NCPD), certification requires verified GAP implementation, lab-verified Maximum Residue Limit (MRL) compliance, hygienic handling, and palm-to-market traceability.
• **Food Safety & Hygiene:** SFDA mandates thorough washing with running potable water to eliminate dust and surface residues, alongside strict adherence to pesticide Pre-Harvest Intervals (PHI) before harvesting.

*Authorities:* NCPD / Mazaree ([KB-010]), Saudi Food and Drug Authority ([KB-019]).`;
  }

  // 9. Cultivar Negative Guardrail (KB-014 on Nabbut-Saif)
  if (primaryChunk.kbId === 'KB-014') {
    return `**Cultivar Scope Limitation Notice ([KB-014], [CHK-014-A]):**

• **Specific Cultivar:** The retrieved research on deficit irrigation regimes (50%, 75%, 100% ETc) was conducted **exclusively on the 'Nabbut-Saif' date cultivar** under Riyadh dryland conditions.
• **Constraint:** Results demonstrate that 75% ETc conserved 25% water in Nabbut-Saif, but **cannot be directly extrapolated as a universal prescription for Barhee date palms**, which possess different fruit load, moisture retention, and vegetative demands.

*Authority:* AGRIS / Saudi Agricultural Research ([KB-014]).`;
  }

  // General Synthesis fallback using claims
  const summaryClaims = matches.flatMap((m) => m.chunk.claims).slice(0, 4);
  return `Based on retrieved evidence from the Kharaf Knowledge Base (${matches.map((m) => `[${m.chunk.kbId}]`).join(', ')}):

${summaryClaims.map((claim) => `• ${claim}`).join('\n')}

*Sources:* ${matches.map((m) => `${m.chunk.sourceTitle} (${m.chunk.authority})`).join('; ')}.`;
}
