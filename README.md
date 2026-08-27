# Kharaf AI Vision (خَرَاف )

> **Evidence-Grounded Decision Support & Digital Twin for Barhee Date Palms in Saudi Arabia**

**Team:** Algora  
**Hackathon:** AI Readiness Hackathon – KSA

---

## 🌟 Executive Overview

Kharaf AI is an evidence-grounded agricultural decision-support MVP focused on **Barhee date palms (*Phoenix dactylifera* L. cv. Barhee)** in Saudi Arabia.

The solution combines a **Digital Twin approach** for representing palm-level operational context with a curated **Knowledge Base (KB)** that provides documented agricultural evidence for interpretation and decision support.

Unlike a generic chatbot, Kharaf does not treat the language model as the source of truth. The system retrieves relevant evidence, considers its scope and applicability, and uses that evidence to support the resulting response.

When sufficient supporting evidence is not available, Kharaf can explicitly identify the limitation instead of presenting an unsupported recommendation as verified.

The core concept is:

**Palm Context → Evidence Retrieval → Applicability Check → Grounded Decision Support**

Kharaf is designed to provide decision support that is:

- 🌴 **Contextual** — connected to the specific palm and its operational context
- 📚 **Evidence-grounded** — supported by curated agricultural sources
- 🧬 **Cultivar-aware** — distinguishes Barhee evidence from evidence concerning other cultivars
- 🔎 **Traceable** — allows supporting evidence and source information to be inspected
- 🛡️ **Uncertainty-aware** — can warn or abstain when evidence is insufficient
- 👨‍🌾 **Human-centered** — supports the farm manager rather than replacing agricultural judgment

---

## 🎯 Problem & Use Case

Agricultural decisions can depend on multiple types of information, including palm observations, irrigation and soil conditions, environmental factors, and farm records.

In practice, this information may be fragmented, while agricultural research and documented guidance may differ in cultivar, geographic context, experimental conditions, or intended use.

Kharaf addresses five connected gaps:

| Challenge | Kharaf Approach |
|---|---|
| **Fragmented palm context** | Organizes information around an individual palm and its farm context through a Digital Twin approach. |
| **Disconnected evidence** | Connects operational context with a curated Knowledge Base. |
| **Evidence applicability** | Considers evidence scope, cultivar, and context before using findings as guidance. |
| **Limited AI traceability** | Provides supporting evidence and source information for inspection. |
| **Insufficient evidence** | Supports explicit warning or abstention instead of presenting unsupported recommendations as verified. |

The goal is not simply to monitor a farm, but to connect **operational context, documented evidence, applicability constraints, and AI-supported interpretation** within one decision-support workflow.

---

## 🌴 Digital Twin Approach

Kharaf uses a **Digital Twin approach** to organize and represent the operational context of an individual date palm.

The Digital Twin represents **what is happening to a specific palm**, while the Knowledge Base provides evidence that can help interpret that context.

The MVP uses a structured software representation of palm-level information and demonstrates how this context can be connected to evidence-grounded decision support.

The architecture also provides a path toward future integration with additional field and environmental data sources.

> **Current MVP:** structured/demo operational context.  
> **Future architecture:** integration with live field, environmental, sensor, imagery, and farm-management sources.

---

## 🧠 How Kharaf AI Works

Kharaf separates **operational context** from **documented evidence**.

The decision-support workflow is:

**User Question → Palm/Farm Context → Retrieve Evidence → Check Scope & Applicability → Grounded Response / Warning / Abstention**

### 1. Context

The system works with palm-level and farm-related operational information.

### 2. Evidence Retrieval

Relevant records are retrieved from the curated Knowledge Base.

### 3. Scope & Applicability

Retrieved evidence is considered according to factors such as:

- cultivar
- geographic context
- research scope
- evidence type
- applicability boundaries

### 4. Grounded Response

When sufficient supporting evidence is available, it is used to support the response.

### 5. Warning or Abstention

When evidence is insufficient or outside the supported scope, the system can identify the limitation rather than treating the generated answer as verified agricultural guidance.

---

## 📚 Audited Knowledge Base

The audited Knowledge Base contains **24 indexed sources and 25 semantic chunks**, covering agricultural research, Saudi regulations and standards, ITU-T references, and date-palm cultivation evidence.

The KB includes metadata for:

- **Source authority**
- **Topic**
- **Evidence type**
- **Cultivar / context**
- **Applicability**
- **Evidence boundaries**

The Knowledge Base includes sources covering areas such as:

- ITU-T AI and ML architecture
- Saudi agricultural regulations and standards
- Data governance and privacy
- Irrigation and water management
- Date-palm cultivation
- Barhee-specific research
- Other-cultivar research used for contextual comparison
- Agricultural computer vision and technology

The KB is implemented as a structured evidence layer rather than an unorganized document collection.

### Evidence Workflow

**User Question → Retrieve Evidence → Check Scope & Applicability → Grounded Response / Warning / Abstention**

This allows Kharaf to distinguish between **retrieved evidence** and **applicable evidence**.

---

## 🧬 Cultivar-Aware Evidence

A central design principle of Kharaf is:

> **Valid evidence does not always mean applicable evidence.**

Agricultural research may be scientifically valid while being limited to a particular cultivar or experimental context.

For example, findings involving **Nabbut-Saif** or **Khalas** should not automatically be presented as direct recommendations for **Barhee**.

Kharaf therefore distinguishes between:

- **Directly applicable Barhee evidence**
- **Contextual evidence from other cultivars**
- **Insufficient evidence**
- **Evidence requiring human review**

This prevents a retrieval system from treating every semantically similar research result as equally applicable.

---

## 🛡️ Grounding Guardrails & Integrity Rules

Kharaf is designed around explicit evidence and applicability guardrails.

### 1. Unsupported Claims

The system is designed to avoid presenting unsupported conclusions as verified evidence.

When sufficient evidence is unavailable, Kharaf can produce an explicit insufficient-evidence outcome.

### 2. Cultivar Scope Isolation

Evidence concerning cultivars such as Nabbut-Saif or Khalas is not automatically treated as Barhee-specific guidance.

### 3. Geographic Awareness

Agricultural findings may depend on regional conditions. Relevant geographic context is therefore preserved when interpreting evidence.

### 4. Research Scope

Empirical research findings are treated as evidence within their stated research scope rather than universal agricultural rules.

### 5. Evidence Boundaries

The Knowledge Base records evidence boundaries and supports explicit restrictions on what can be inferred from a source.

### 6. Transparent Uncertainty

Kharaf distinguishes between different evidence states instead of presenting every generated response with the same level of confidence.

The intended decision states include:

- **Supported by evidence**
- **Contextual evidence only**
- **Insufficient evidence**
- **Requires human review**

---

## 🏗️ System Architecture

Kharaf uses two complementary architecture views:

1. **Operational Architecture** — describes how operational and supporting data can flow into the Kharaf platform.
2. **ITU-T Y.3172 ML Pipeline** — maps the AI workflow to the standardized logical pipeline.

### Operational Data Flow

The proposed operational architecture connects sources such as:

- Palm observations
- Soil and irrigation information
- Environmental conditions
- Weather information
- Farm records
- Imagery and other supporting data

These sources flow through data collection and processing into the Kharaf platform, where validation, metadata, storage, evidence, policy, and user-facing outputs are considered.

**Figure 1 — Kharaf AI Operational & Field Data Architecture**

[View Operational Architecture](https://drive.google.com/file/d/1uefQinIPgz4kBND9xjaEfXWlZ5Tq7QJ1/view?usp=drive_link)

> The current MVP uses structured/demo operational information. Live field and sensor integrations represent the proposed production architecture.

---

## 🔗 ITU-T Y.3172 ML Pipeline Mapping

Kharaf maps its AI workflow to the logical ML pipeline defined by **ITU-T Recommendation Y.3172**.

The mapping follows:

**SRC → C → PP → M → P → D → SINK**

| Node | Kharaf Mapping |
|---|---|
| **SRC – Source** | Field, farm, environmental, and Knowledge Base sources |
| **C – Collector** | Data ingestion and collection |
| **PP – Pre-processor** | Validation, cleaning, normalization, and enrichment |
| **M – Model** | AI/ML components, evidence retrieval, and LLM-supported explanation |
| **P – Policy** | Agricultural rules, evidence applicability, constraints, and governance checks |
| **D – Distributor** | Controlled delivery of validated outputs |
| **SINK – Output** | Farm interface, notifications, reports, and audit-oriented outputs |

The **Policy (P)** stage is particularly important because evidence retrieval alone does not guarantee that a result is appropriate for the requested cultivar or context.

This architecture therefore places **policy and applicability considerations inside the AI workflow**, rather than treating governance as a separate afterthought.

**Figure 2 — Kharaf AI ML Pipeline Mapping**

[View ML Pipeline Architecture](https://drive.google.com/file/d/18sSfBFpK925PcODuIySsvUeQcLjilm0A/view?usp=drive_link)

---

## 🔄 Current MVP vs. Proposed Architecture

Kharaf distinguishes the demonstrated MVP from the broader production architecture.

| Capability | Current MVP | Proposed / Future |
|---|---|---|
| Palm-level digital representation | ✅ | — |
| Curated Knowledge Base | ✅ | Expanded coverage |
| Evidence retrieval | ✅ | More advanced retrieval |
| Evidence applicability | ✅ | Expanded policy rules |
| Cultivar-aware handling | ✅ | Additional cultivars |
| Insufficient-evidence handling | ✅ | — |
| RAG evaluation | ✅ | Larger benchmark |
| Live soil sensors | — | 🔄 |
| Live weather integration | — | 🔄 |
| Field IoT integration | — | 🔄 |
| Computer vision integration | — | 🔄 |
| External farm-management systems | — | 🔄 |
| Large-scale production deployment | — | 🔄 |

This distinction ensures that the prototype remains transparent about what is implemented today while demonstrating a clear path toward a production-ready agricultural platform.

---

## 📊 RAG Evaluation & Audit Matrix

Kharaf includes an evaluation matrix designed to test evidence retrieval, grounding, applicability, and abstention behavior.

The evaluation suite contains **12 test cases (EVAL-001 through EVAL-012)** covering multiple evidence and governance scenarios.

Representative test areas include:

- Barhee pollination evidence
- Metaxenia and bunch-weight evidence
- Fresh Khalal harvest and Brix-related evidence
- Crop water estimation
- Saudi agricultural standards
- Data protection and governance
- ITU-T Y.3172 pipeline mapping
- Negative cultivar-scope testing using Nabbut-Saif evidence
- Out-of-scope agricultural questions
- Insufficient-evidence behavior

The evaluation matrix is designed to test not only whether the system retrieves relevant information, but also whether it **respects evidence boundaries and avoids inappropriate inference**.

---

## 🧪 Evidence Decision Logic

Kharaf treats evidence evaluation as more than a similarity search.

A retrieved source can be relevant to a question while still being inappropriate for direct use.

The conceptual decision process is:

```text
Retrieve Candidate Evidence
          ↓
Check Evidence Scope
          ↓
Check Cultivar / Context
          ↓
Check Applicability
          ↓
 ┌────────┼───────────────┐
 ↓        ↓               ↓
Supported Contextual   Insufficient
Evidence  Evidence      Evidence
 ↓        ↓               ↓
Grounded  Warning /     Abstention
Response  Qualification
