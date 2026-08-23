export type AuthorityTier = 'Standard' | 'Law' | 'Regulation' | 'Official guidance' | 'Official requirements' | 'Official government source' | 'Official government information' | 'Official statistics' | 'Technical reference' | 'Technical reference / Guideline' | 'Technical report / Framework' | 'Technical supplement / Use case' | 'Peer-reviewed research' | 'Experimental / Empirical Research';

export type KnowledgeCategory = 'AI / Architecture' | 'Privacy / Policy' | 'Policy / Agriculture' | 'Water / Agriculture' | 'Farm Mapping / Agriculture' | 'Geospatial / Agriculture' | 'Agricultural / Policy' | 'Agricultural' | 'Scientific / Agricultural' | 'Scientific / Barhi' | 'AI / Computer Vision' | 'Food Safety / Policy' | 'Statistics / Agriculture' | 'Government / Agriculture' | 'Agricultural / Harvesting' | 'AI / Digital Agriculture';

export type DecisionStatus = 'Supported by evidence' | 'Contextual evidence only' | 'Insufficient evidence' | 'Requires human review';

export interface KBRecord {
  kbId: string;
  title: string;
  authority: string;
  type: string;
  topic: string;
  contribution: string;
  role: string;
  priority: 'Core' | 'Supporting' | 'Context';
  status: 'Verified' | 'Scope-Limited' | 'Draft';
  sourceUrl: string;
  category: KnowledgeCategory;
  kharafComponent: string;
  supportedQuestion: string;
  evidenceType: string;
  hardConstraint: boolean;
  scenario: string;
  chunkingPriority: 'High' | 'Medium' | 'Low';
  cultivarScope: 'Barhee' | 'Khalas' | 'Nabbut-Saif' | 'General / Multi-Cultivar' | 'None / Non-Botanical';
  geographicScope: string;
  doNotInferRestrictions: string[];
  caveats: string;
}

export interface KBChunk {
  chkId: string;
  kbId: string;
  sourceTitle: string;
  authority: string;
  section: string;
  content: string;
  claims: string[];
  evidenceType: string;
  cultivarRelevance: string;
  geographicRelevance: string;
  hardConstraint: boolean;
  doNotInfer: string[];
  caveats: string;
  mlFeatureRelevance?: string;
  reviewStatus: 'Verified' | 'Scope-Limited' | 'Audited';
}

export interface RetrievedChunkMatch {
  chunk: KBChunk;
  score: number;
  matchType: 'direct_evidence' | 'contextual_evidence' | 'out_of_scope';
  relevanceExplanation: string;
}

export interface GroundedRAGResponse {
  query: string;
  classification: {
    intent: string;
    targetDomain: 'Barhee Agriculture' | 'Irrigation & Water' | 'Policy & Compliance' | 'Architecture & Digital Twin' | 'Computer Vision / ML' | 'Food Safety' | 'General / Out of Scope';
    cultivarDetected: string;
    isBarheeSpecific: boolean;
    requiresHardConstraintCheck: boolean;
  };
  decisionStatus: DecisionStatus;
  answer: string;
  // Farmer-friendly structured breakdown
  plainSummary?: string;
  whatThisMeans?: string;
  thingsToConsider?: string[];
  recommendedNextStep?: string;
  userFriendlyStatus?: string;
  evidenceUsed: {
    sourceTitle: string;
    kbId: string;
    chkId: string;
    authority: string;
    evidenceType: string;
    scopeCaveat: string;
    hardConstraint: boolean;
    relevance: 'direct' | 'contextual';
  }[];
  constraintsApplied: {
    rule: string;
    description: string;
    status: 'COMPLIANT' | 'FLAGGED' | 'ABSTAINED';
  }[];
  isAbstention: boolean;
  abstentionReason?: string;
  executionTimeMs: number;
  engineUsed: 'Gemini 3.7 Flash + Kharaf RAG' | 'Deterministic Grounded Engine (Kharaf Fallback)';
}

export interface EvaluationItem {
  questionId: string;
  question: string;
  domain: string;
  expectedSourceIds: string[];
  expectedChkIds: string[];
  expectedDecisionStatus: DecisionStatus;
  hardConstraintRelevant: boolean;
  notes: string;
  lastRunResult?: {
    retrievedKbIds: string[];
    retrievedChkIds: string[];
    decisionStatus: DecisionStatus;
    answerStatus: 'PASS' | 'FAIL' | 'NEEDS REVIEW' | 'NOT TESTED';
    citationStatus: 'PASS' | 'FAIL' | 'PARTIAL';
    constraintCompliance: 'COMPLIANT' | 'VIOLATED' | 'N/A';
    testDate: string;
    summary: string;
  };
}

export interface PalmDigitalTwin {
  palmId: string; // e.g. "BH-001"
  name: string;
  cultivar: 'Barhee' | 'Khalas' | 'Nabbut-Saif';
  farmName: string;
  location: {
    region: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  ageYears: number;
  plantationDate: string;
  currentMaturityStage: 'Hababouk' | 'Kimri' | 'Khalal' | 'Rutab' | 'Tamar';
  maturityConfidence: number;
  daysSinceSpatheOpening: number;
  pollinationStatus: 'Pending' | 'Completed' | 'Optimal Window Active' | 'Window Passed';
  pollinationDate?: string;
  pollenSource?: string;
  currentTelemetry: {
    soilMoisturePercent: number;
    soilMoistureStatus: 'Deficit' | 'Optimal' | 'Excess';
    airTemperatureC: number;
    relativeHumidityPercent: number;
    solarRadiationWm2: number;
    vpdKPa: number;
    dailyWaterAppliedLiters: number;
    penmanMonteithEtcLday: number;
    lastUpdated: string;
  };
  cameraFeed: {
    hasImage: boolean;
    imageThumbnail: string;
    bunchColor: string;
    sugarBrixEstimate: number;
    clusterDefects: string[];
  };
  policyCompliance: {
    saudiGapStatus: 'Compliant' | 'Pending Audit' | 'Action Required';
    mewaArticle12Checked: boolean;
    pdplConsentLogged: boolean;
    saudiDatesMarkEligible: boolean;
  };
  simulatedDataNotice: string;
}

export interface ITU_PipelineExecution {
  step: 'SRC' | 'C' | 'PP' | 'M' | 'P' | 'D' | 'SINK';
  stepName: string;
  status: 'Complete' | 'Active' | 'Pending';
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  durationMs: number;
}
