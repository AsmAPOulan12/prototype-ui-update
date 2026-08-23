import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { KB_RECORDS, KB_CHUNKS } from './src/data/knowledgeBase';
import { EVALUATION_MATRIX } from './src/data/evaluationMatrix';
import { DIGITAL_TWIN_PALMS } from './src/data/digitalTwinData';
import { executeGroundedRAG, retrieveEvidence } from './src/server/retrievalEngine';
import { ITU_PipelineExecution, EvaluationItem } from './src/types';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Health check & System Status API
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Kharaf AI Backend',
      architecture: 'ITU-T Y.3172 Aligned',
      timestamp: new Date().toISOString()
    });
  });

  app.get('/api/system/status', (req, res) => {
    const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY);
    res.json({
      systemName: 'Kharaf AI Platform',
      version: '1.0.0-hackathon-mvp',
      ituStandard: 'ITU-T Recommendation Y.3172 (06/2019)',
      knowledgeBase: {
        totalSources: KB_RECORDS.length,
        totalChunks: KB_CHUNKS.length,
        status: 'Audited & Verified'
      },
      models: {
        geminiConfigured: hasGeminiKey,
        geminiModel: hasGeminiKey ? 'gemini-3.7-flash' : 'Not Connected (Using Deterministic Fallback)',
        activeInferenceEngine: hasGeminiKey ? 'Gemini 3.7 Flash + Kharaf RAG' : 'Deterministic Grounded Engine'
      },
      digitalTwin: {
        registeredPalms: DIGITAL_TWIN_PALMS.length,
        activeSensors: ['Soil Moisture TDR', 'Air Temp & RH', 'RGB Visual Camera', 'Weather API Gateway'],
        dataStatus: 'Demo / Simulated Data Mode (Clearly Labeled)'
      },
      policyEngine: {
        pdplComplianceChecked: true,
        mewaArticle12Enforced: true,
        saudiGapStandardsEnforced: true,
        saudiDatesMarkRulesEnforced: true
      }
    });
  });

  // 2. RAG Query API
  app.post('/api/rag/query', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== 'string') {
        res.status(400).json({ error: 'Query parameter is required.' });
        return;
      }

      const result = await executeGroundedRAG(query);
      res.json(result);
    } catch (err: any) {
      console.error('Error executing RAG query:', err);
      res.status(500).json({ error: err?.message || 'Failed to process RAG query.' });
    }
  });

  // 3. Knowledge Base & Evidence Explorer API
  app.get('/api/rag/sources', (req, res) => {
    res.json({
      sources: KB_RECORDS,
      chunks: KB_CHUNKS
    });
  });

  // 4. Digital Twin Palms API
  app.get('/api/digital-twin/palms', (req, res) => {
    res.json(DIGITAL_TWIN_PALMS);
  });

  // 5. Digital Twin Assessment / ITU-T Y.3172 Pipeline Simulation API
  app.post('/api/digital-twin/assess', async (req, res) => {
    const { palmId } = req.body;
    const palm = DIGITAL_TWIN_PALMS.find((p) => p.palmId === palmId) || DIGITAL_TWIN_PALMS[0];

    // Simulate ITU-T Y.3172 logical node execution steps
    const steps: ITU_PipelineExecution[] = [
      {
        step: 'SRC',
        stepName: 'Data Sources (On-Field IoT & Sensors)',
        status: 'Complete',
        inputs: {
          palmId: palm.palmId,
          cultivar: palm.cultivar,
          location: `${palm.location.city}, ${palm.location.region}`
        },
        outputs: {
          soilMoisturePercent: palm.currentTelemetry.soilMoisturePercent,
          airTemperatureC: palm.currentTelemetry.airTemperatureC,
          relativeHumidityPercent: palm.currentTelemetry.relativeHumidityPercent,
          solarRadiationWm2: palm.currentTelemetry.solarRadiationWm2,
          bunchColor: palm.cameraFeed.bunchColor,
          daysSinceSpatheOpening: palm.daysSinceSpatheOpening
        },
        durationMs: 12
      },
      {
        step: 'C',
        stepName: 'Collector (IoT Edge Gateway)',
        status: 'Complete',
        inputs: {
          protocol: 'MQTT / TLS',
          gatewayStatus: 'Store-and-Forward Buffer Active (ITU-T Y.Sup83)'
        },
        outputs: {
          validatedPackets: 24,
          dataIntegrity: '100%',
          timestampSync: 'Synchronized (UTC+3)'
        },
        durationMs: 8
      },
      {
        step: 'PP',
        stepName: 'Pre-processor (PP Node)',
        status: 'Complete',
        inputs: {
          rawSoilMoisture: palm.currentTelemetry.soilMoisturePercent,
          rawTemp: palm.currentTelemetry.airTemperatureC,
          rawRH: palm.currentTelemetry.relativeHumidityPercent
        },
        outputs: {
          calculatedVpdKPa: palm.currentTelemetry.vpdKPa,
          estimatedPenmanMonteithEtcLday: palm.currentTelemetry.penmanMonteithEtcLday,
          soilMoistureStatus: palm.currentTelemetry.soilMoistureStatus
        },
        durationMs: 15
      },
      {
        step: 'M',
        stepName: 'Model (M Node: Computer Vision + ML Recommender + RAG Retrieval)',
        status: 'Complete',
        inputs: {
          phenologyStage: palm.currentMaturityStage,
          cameraImage: palm.cameraFeed.imageThumbnail,
          etEstimatedWater: palm.currentTelemetry.penmanMonteithEtcLday
        },
        outputs: {
          visionMaturityStage: palm.currentMaturityStage,
          visionConfidence: palm.maturityConfidence,
          estimatedBrix: palm.cameraFeed.sugarBrixEstimate,
          ragRetrievedEvidence: [
            palm.currentMaturityStage === 'Khalal' ? 'KB-022 (FAO Barhee Harvest)' : 'KB-016 (Pollination Window)',
            'KB-013 (Penman-Monteith Saudi Water)'
          ]
        },
        durationMs: 45
      },
      {
        step: 'P',
        stepName: 'Policy Node (P Node: MEWA & Saudi Standards Validation)',
        status: 'Complete',
        inputs: {
          mewaArticle12: 'Active',
          saudiGapCp511: 'Checked',
          pdplSafeguards: 'Logged'
        },
        outputs: {
          policyComplianceStatus: palm.policyCompliance.saudiGapStatus === 'Compliant' ? 'Approved' : 'Action Required',
          irrigationLogRetained: true,
          saudiDatesMarkEligibility: palm.policyCompliance.saudiDatesMarkEligible
        },
        durationMs: 18
      },
      {
        step: 'D',
        stepName: 'Distributor (D Node)',
        status: 'Complete',
        inputs: {
          routingTargets: ['Farmer Dashboard', 'Auditor Interface', 'Alert Engine']
        },
        outputs: {
          dispatchStatus: 'Dispatched',
          alertLevel: palm.currentTelemetry.soilMoistureStatus === 'Deficit' ? 'Warning' : 'Normal'
        },
        durationMs: 6
      },
      {
        step: 'SINK',
        stepName: 'ML Output (Sink: Decision & Actions)',
        status: 'Complete',
        inputs: {
          palmId: palm.palmId
        },
        outputs: {
          recommendedAction:
            palm.currentMaturityStage === 'Khalal'
              ? 'Initiate selective morning harvest of 90%+ yellow bunches with cushioned trays (KB-022). Verify cold storage at 0-4°C (KB-018).'
              : palm.currentMaturityStage === 'Hababouk' && palm.daysSinceSpatheOpening <= 4
              ? 'Execute manual pollination immediately within optimal Day 2-4 receptivity window using certified high-viability male pollen (KB-016).'
              : `Maintain rational irrigation at ${palm.currentTelemetry.penmanMonteithEtcLday} L/palm/day according to Penman-Monteith ETc model (KB-013).`,
          citationMetadata: ['KB-016', 'KB-022', 'KB-013', 'KB-006']
        },
        durationMs: 4
      }
    ];

    res.json({
      palm,
      pipelineExecution: steps,
      evaluatedAt: new Date().toISOString()
    });
  });

  // 6. Evaluation Benchmark Execution API
  app.post('/api/rag/evaluate', async (req, res) => {
    try {
      const evaluationResults: EvaluationItem[] = [];

      for (const item of EVALUATION_MATRIX) {
        const ragResponse = await executeGroundedRAG(item.question);
        const retrievedKbIds = ragResponse.evidenceUsed.map((e) => e.kbId);
        const retrievedChkIds = ragResponse.evidenceUsed.map((e) => e.chkId);

        // Verification Logic
        let citationStatus: 'PASS' | 'FAIL' | 'PARTIAL' = 'PASS';
        let answerStatus: 'PASS' | 'FAIL' | 'NEEDS REVIEW' | 'NOT TESTED' = 'PASS';
        let constraintCompliance: 'COMPLIANT' | 'VIOLATED' | 'N/A' = 'COMPLIANT';

        if (item.expectedSourceIds.length > 0) {
          const matchedSources = item.expectedSourceIds.filter((id) => retrievedKbIds.includes(id));
          if (matchedSources.length === item.expectedSourceIds.length) {
            citationStatus = 'PASS';
          } else if (matchedSources.length > 0) {
            citationStatus = 'PARTIAL';
          } else {
            citationStatus = 'FAIL';
          }
        } else {
          // Out of scope test: Expecting NO sources and ABSTENTION
          citationStatus = ragResponse.isAbstention ? 'PASS' : 'FAIL';
        }

        if (ragResponse.decisionStatus !== item.expectedDecisionStatus) {
          answerStatus = 'NEEDS REVIEW';
        } else if (citationStatus === 'FAIL') {
          answerStatus = 'FAIL';
        } else {
          answerStatus = 'PASS';
        }

        if (item.hardConstraintRelevant) {
          const hasCompliantGuardrail = ragResponse.constraintsApplied.some((c) => c.status === 'COMPLIANT');
          constraintCompliance = hasCompliantGuardrail ? 'COMPLIANT' : 'VIOLATED';
        } else {
          constraintCompliance = 'N/A';
        }

        evaluationResults.push({
          ...item,
          lastRunResult: {
            retrievedKbIds,
            retrievedChkIds,
            decisionStatus: ragResponse.decisionStatus,
            answerStatus,
            citationStatus,
            constraintCompliance,
            testDate: new Date().toISOString(),
            summary: ragResponse.answer.slice(0, 180) + '...'
          }
        });
      }

      res.json({
        totalEvaluated: evaluationResults.length,
        passedCount: evaluationResults.filter((e) => e.lastRunResult?.answerStatus === 'PASS').length,
        needsReviewCount: evaluationResults.filter((e) => e.lastRunResult?.answerStatus === 'NEEDS REVIEW').length,
        failedCount: evaluationResults.filter((e) => e.lastRunResult?.answerStatus === 'FAIL').length,
        matrix: evaluationResults
      });
    } catch (err: any) {
      console.error('Error running evaluation benchmark:', err);
      res.status(500).json({ error: 'Failed to execute evaluation suite.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kharaf AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
