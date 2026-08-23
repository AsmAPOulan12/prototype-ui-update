# Kharaf AI (خَرَاف للذكاء الاصطناعي)

> **Evidence-Grounded Precision Decision Support & Digital Twin for Barhee Date Palms in Saudi Arabia**  
> Aligned with **ITU-T Recommendation Y.3172 (06/2019)** and Saudi Agricultural & Statutory Frameworks.

---

## 🌟 Executive Overview

**Kharaf AI** is a full-stack, evidence-grounded Retrieval-Augmented Generation (RAG) decision-support system and Digital Twin platform designed specifically for commercial and experimental **Barhee (*Phoenix dactylifera* L. cv. Barhee)** date palm cultivation across the Kingdom of Saudi Arabia.

Unlike generic chatbot wrappers or ungrounded generative interfaces, Kharaf AI operates under strict **Zero-Hallucination Grounding Guardrails**:
- Answers are synthesized exclusively from an audited, indexed repository of **24 authoritative Knowledge Base sources** (comprising peer-reviewed agronomic research, FAO technical compendia, MEWA statutory decrees, Saudi G.A.P standards, and SDAIA PDPL data protection laws).
- When retrieved evidence is insufficient or out of scope, the system **explicitly abstains** using standardized disclosure messages rather than fabricating advice.
- Strict **Cultivar Isolation** guarantees that research conducted on other cultivars (e.g. *Nabbut-Saif* or *Khalas*) is flagged as contextual comparisons and never issued as direct Barhee prescriptions.
- The machine learning lifecycle and data routing conform strictly to the international standard **ITU-T Recommendation Y.3172**.

---

## 🏗️ Architectural Foundations

Kharaf AI implements two standardized architectural blueprints:

### 1. ITU-T Y.3172 ML Pipeline Logical Hierarchy
The data flow and model lifecycle are decoupled into 7 standardized logical nodes:
1. **SRC (Data Sources):** On-field soil moisture probes (TDR), weather stations, RGB camera clusters, and historical Hasr cadastral logs.
2. **C (Collector):** Edge IoT Gateways with store-and-forward local buffering (ITU-T Y.Sup83) and MQTT/TLS communication.
3. **PP (Pre-processor):** Ingestion normalization, anomaly filtering, VPD calculation, and Penman-Monteith $ET_c$ feature extraction.
4. **M (ML Model):** YOLOv8 maturity detection, sugar/Brix estimation, RAG vector retrieval, and LLM inference.
5. **P (Policy Node):** Regulatory and statutory governance validation (MEWA Article 12, Saudi G.A.P CP5.1.1, PDPL). **Positioned strictly between Model M and Distributor D**.
6. **D (Distributor):** API routing and dispatching validated outputs to notification and client sinks.
7. **SINK (ML Output):** Farmer Decision Support Dashboard, Auditor Compliance Interface, and agronomic reports.
* **MLFO (ML Function Orchestrator):** Manages model versions, inference scheduling, pipeline telemetry, and evaluation matrix testing.

---

## 📚 Audited Knowledge Base (24 Records)

The Knowledge Base is indexed in `/src/data/knowledgeBase.ts` and structured under strict schema:
- **KB-001:** ITU-T Recommendation Y.3172 (ML Pipeline Architecture & Policy Node P)
- **KB-002:** Saudi Personal Data Protection Law (PDPL - Royal Decree M/19)
- **KB-003:** Saudi PDPL Implementing Regulations (SDAIA Resolution 1516)
- **KB-004:** Saudi Arabia National Data Governance Framework (SDAIA / NDMO)
- **KB-005:** Saudi Arabia Agriculture Law & Implementing Regulations (MEWA Article 12)
- **KB-006:** Saudi G.A.P Standard CP5.1.1 (Irrigation Record Keeping & Calculation)
- **KB-007:** Saudi National Water Strategy 2030 (Agricultural Rationalization Targets)
- **KB-008:** Hasr (حصر) Agricultural Registry & Cadastral Mapping Framework (MEWA)
- **KB-009:** Ministry of Environment, Water and Agriculture (MEWA) Official Extension Directives
- **KB-010:** Saudi Dates Mark (NCPD / Mazaree Standard Requirements)
- **KB-011:** SCTA / GASTAT Date Palm Census 2024 (Scale of Date Palm Holdings in KSA)
- **KB-012:** FAO Irrigation and Drainage Paper 56 (Crop Evapotranspiration Guidelines)
- **KB-013:** Penman-Monteith Evapotranspiration Across 8 Saudi Agro-Climatic Regions (AGRIS)
- **KB-014:** Deficit Irrigation Regimes in cv. Nabbut-Saif (AGRIS - Negative Cultivar Scope Guardrail)
- **KB-015:** Irrigation Salinity & Leaching Requirements in cv. Khalas (Al-Ahsa OASIS Research)
- **KB-016:** Metaxenia and Pollination Timing in Tissue-Cultured Barhee Palms (Scientia Horticulturae)
- **KB-017:** Deep Learning Computer Vision for Date Bunch Harvesting in Structured Orchards (EAAI)
- **KB-018:** Cold Storage & Postharvest Respiration of Fresh Khalal Date Palms (SJBS)
- **KB-019:** SFDA Guidance on Agricultural Produce Washing & Residue Limits
- **KB-020:** General Authority for Statistics (GASTAT) Agricultural Survey 2024
- **KB-021:** KACST National Center for Agriculture & Food Technology
- **KB-022:** FAO Date Palm Compendium: Barhee Fresh Harvest Guidelines
- **KB-023:** ITU-T Technical Report: AI for Agriculture & IoT Sensor Integration
- **KB-024:** ITU-T Recommendation Y.Sup83: Digital Twin Interoperability in Precision Agriculture

---

## 🛡️ Grounding Guardrails & Integrity Rules

1. **Rule 1 (No Unsupported Claims / Explicit Abstention):** Every claim must cite verified KB records (`[KB-xxx]`, `[CHK-xxx]`). If score $< 1.5$, system explicitly outputs:
   > *"Insufficient verified evidence was retrieved from the Kharaf Knowledge Base to support a reliable answer."*
2. **Rule 2 (Cultivar Scope Isolation):** Nabbut-Saif (KB-014) and Khalas (KB-015) evidence are strictly flagged as contextual comparisons and never asserted as Barhee guidance.
3. **Rule 3 (Geographic Scope):** Regional Penman-Monteith $ET_c$ differences are preserved.
4. **Rule 4 (Research Scope):** Empirical findings are presented as scientific evidence, not universal decrees.
5. **Rule 5 (Statutory & Standards Hard Constraints):** Saudi G.A.P CP5.1.1 (24-month irrigation records), Saudi Dates Mark, MEWA Article 12, and PDPL (consent/72h breach) are enforced as non-negotiable compliance rules.
6. **Rule 6 ("Do Not Infer" Restrictions):** Explicit inference limits encoded in chunks are enforced.
7. **Rule 7 (Transparent Uncertainty):** Every recommendation displays one of 4 decision states: *Supported by evidence*, *Contextual evidence only*, *Insufficient evidence*, or *Requires human review*.

---

## 🚀 Quick Start & Development

### 1. Installation
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` (managed automatically via AI Studio Settings):
```env
GEMINI_API_KEY="your-gemini-api-key"
PORT=3000
NODE_ENV="development"
```

*Note: If no Gemini API key is configured, Kharaf AI automatically executes in high-precision Deterministic Grounded Synthesis fallback mode.*

### 3. Run Development Server
```bash
npm run dev
```
Launches the full-stack Express + Vite server at `http://0.0.0.0:3000`.

### 4. Build for Production
```bash
npm run build
npm start
```
Bundles client SPA into `dist/` and backend TypeScript into standalone `dist/server.cjs` via `esbuild`.

---

## 🧪 RAG Evaluation & Audit Matrix

The system includes a built-in automated benchmark suite in `/src/data/evaluationMatrix.ts` with 12 empirical test cases (EVAL-001 through EVAL-012) testing:
- Barhee pollination receptivity window (Day 2–4)
- Metaxenia and bunch weight variations
- Fresh yellow Khalal harvesting and Brix (>28–32°)
- Penman-Monteith crop water estimation in 8 Saudi regions
- Saudi G.A.P CP5.1.1 24-month irrigation log retention
- Saudi PDPL data protection and 72-hour breach rules
- ITU-T Y.3172 pipeline logical nodes and Policy Node P
- Negative cultivar guardrail test on Nabbut-Saif
- Out-of-scope avocado query abstention test

---

## 👥 Contributors & Standards Reference
- **International Standard:** ITU-T Recommendation Y.3172 (06/2019)
- **Sector Focus:** Kingdom of Saudi Arabia Date Palm Agriculture (Barhee Cultivar)
