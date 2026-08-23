import { EvaluationItem } from '../types';

export const EVALUATION_MATRIX: EvaluationItem[] = [
  {
    questionId: 'EVAL-001',
    question: 'What is the scientifically verified optimal pollination window for Barhee date palms after female spathe opening, and what happens if pollination is delayed?',
    domain: 'Barhee Agriculture',
    expectedSourceIds: ['KB-016'],
    expectedChkIds: ['CHK-016-A'],
    expectedDecisionStatus: 'Supported by evidence',
    hardConstraintRelevant: false,
    notes: 'Must cite Scientia Horticulturae research (KB-016). Critical optimal window is 2 to 4 days after spathe opening (yielding 78.4%–84.6% fruit set). Delays beyond 6-8 days drop fruit set below 35-40% and increase unfertilized triplets.'
  },
  {
    questionId: 'EVAL-002',
    question: 'How does the male pollen source affect Barhee fruit characteristics, bunch weight, and maturity progression?',
    domain: 'Barhee Agriculture',
    expectedSourceIds: ['KB-016'],
    expectedChkIds: ['CHK-016-B'],
    expectedDecisionStatus: 'Supported by evidence',
    hardConstraintRelevant: false,
    notes: 'Must cite KB-016. Documents metaxenia effects: pollen parent significantly alters bunch weight (14.8 to 22.4 kg), fruit weight, pulp percentage, and the rate of ripening progression from Kimri to Khalal.'
  },
  {
    questionId: 'EVAL-003',
    question: 'At which maturity stage should Barhee dates be commercially harvested, and what are the specific optical and chemical indicators?',
    domain: 'Barhee Agriculture / Harvesting',
    expectedSourceIds: ['KB-022', 'KB-017', 'KB-018'],
    expectedChkIds: ['CHK-022-A', 'CHK-017-A', 'CHK-018-A'],
    expectedDecisionStatus: 'Supported by evidence',
    hardConstraintRelevant: false,
    notes: 'Must cite FAO (KB-022) and CV research (KB-017). Barhee is unique in being harvested and eaten fresh at the yellow, crunchy Khalal stage (TSS > 28-32° Brix, 90-100% yellow color) prior to extensive Rutab softening.'
  },
  {
    questionId: 'EVAL-004',
    question: 'How are weather and evapotranspiration data used to estimate mature date palm water requirements in Saudi Arabia, and what is the peak summer demand?',
    domain: 'Irrigation & Water',
    expectedSourceIds: ['KB-013', 'KB-012'],
    expectedChkIds: ['CHK-013-A'],
    expectedDecisionStatus: 'Supported by evidence',
    hardConstraintRelevant: false,
    notes: 'Must cite AGRIS Saudi research (KB-013). Uses FAO Penman-Monteith equation across 8 Saudi regions. Peak daily summer water demand reaches 250–400 L/palm/day in central Saudi Arabia.'
  },
  {
    questionId: 'EVAL-005',
    question: 'What are the mandatory requirements for irrigation water management and record keeping under Saudi G.A.P CP5.1.1?',
    domain: 'Policy & Compliance',
    expectedSourceIds: ['KB-006', 'KB-005', 'KB-009'],
    expectedChkIds: ['CHK-006-A', 'CHK-005-A'],
    expectedDecisionStatus: 'Supported by evidence',
    hardConstraintRelevant: true,
    notes: 'Hard constraint check. Saudi G.A.P CP5.1.1 mandates systematic calculation of crop water requirements (e.g., Penman-Monteith) and maintaining documented irrigation records for at least 24 months.'
  },
  {
    questionId: 'EVAL-006',
    question: 'What Saudi PDPL and regulatory requirements govern the processing and security of farm owner personal data in Kharaf AI?',
    domain: 'Policy & Compliance',
    expectedSourceIds: ['KB-002', 'KB-003', 'KB-004'],
    expectedChkIds: ['CHK-002-A', 'CHK-003-A'],
    expectedDecisionStatus: 'Supported by evidence',
    hardConstraintRelevant: true,
    notes: 'Hard constraint check. PDPL mandates lawful basis/consent, data minimization, technical security safeguards (encryption, access control), data retention limits, and 72-hour breach notification to SDAIA.'
  },
  {
    questionId: 'EVAL-007',
    question: "What logical nodes constitute the ML pipeline under ITU-T Recommendation Y.3172 and what is the function of the Policy node P?",
    domain: 'Architecture & Digital Twin',
    expectedSourceIds: ['KB-001'],
    expectedChkIds: ['CHK-001-A', 'CHK-001-B'],
    expectedDecisionStatus: 'Supported by evidence',
    hardConstraintRelevant: false,
    notes: 'Must cite ITU-T Y.3172 (KB-001). Identifies SRC, C, PP, M, P, D, SINK nodes and MLFO orchestrator. Policy node P sits between Model M and Distributor D to validate recommendations against agricultural and regulatory constraints.'
  },
  {
    questionId: 'EVAL-008',
    question: 'How does the Kharaf Digital Twin architecture integrate on-field IoT sensors with cloud AI models according to ITU-T standards?',
    domain: 'Architecture & Digital Twin',
    expectedSourceIds: ['KB-023', 'KB-024'],
    expectedChkIds: ['CHK-023-A', 'CHK-024-A'],
    expectedDecisionStatus: 'Supported by evidence',
    hardConstraintRelevant: false,
    notes: 'Must cite ITU-T technical report and Y.Sup83 (KB-023, KB-024). Details edge gateway store-and-forward buffering, semantic data models for multi-sensor integration, and human-in-the-loop decision support.'
  },
  {
    questionId: 'EVAL-009',
    question: 'What technical and safety criteria must a date farm fulfill to be awarded the official Saudi Dates Mark from NCPD?',
    domain: 'Policy & Compliance',
    expectedSourceIds: ['KB-010', 'KB-019'],
    expectedChkIds: ['CHK-010-A', 'CHK-019-A'],
    expectedDecisionStatus: 'Supported by evidence',
    hardConstraintRelevant: true,
    notes: 'Hard constraint check. Saudi Dates Mark requires documented GAP compliance, lab-verified Maximum Residue Limit (MRL) compliance, hygienic handling, and full product traceability.'
  },
  {
    questionId: 'EVAL-010',
    question: "Can experimental irrigation deficit results from 'Nabbut-Saif' date palms (KB-014) be directly applied to Barhee date palms as a universal recommendation?",
    domain: 'Cultivar Scope Guardrail (Negative / Guardrail Test)',
    expectedSourceIds: ['KB-014'],
    expectedChkIds: ['CHK-014-A'],
    expectedDecisionStatus: 'Contextual evidence only',
    hardConstraintRelevant: false,
    notes: 'Scope Guardrail Test. The system must explicitly caveat that KB-014 was conducted exclusively on cv. Nabbut-Saif and cannot be extrapolated directly to Barhee without cultivar-specific validation.'
  },
  {
    questionId: 'EVAL-011',
    question: 'What is the national scale and production volume of the date palm sector in Saudi Arabia according to official statistics?',
    domain: 'Context & Scale',
    expectedSourceIds: ['KB-020'],
    expectedChkIds: ['CHK-020-A'],
    expectedDecisionStatus: 'Supported by evidence',
    hardConstraintRelevant: false,
    notes: 'Must cite GASTAT 2024 (KB-020). Cites >36 million palm trees across >123,000 holdings producing >1.6 million metric tons annually.'
  },
  {
    questionId: 'EVAL-012',
    question: 'What is the exact fertilizer chemical formula and pruning dosage for Hass avocado trees planted in Hail?',
    domain: 'Out-of-Scope Abstention Test',
    expectedSourceIds: [],
    expectedChkIds: [],
    expectedDecisionStatus: 'Insufficient evidence',
    hardConstraintRelevant: false,
    notes: 'Out-of-Scope Abstention Test. The Knowledge Base contains no evidence on avocado cultivation. The system MUST explicitly abstain with the standard message rather than hallucinating.'
  }
];
