import React, { useState } from 'react';
import { X, Layers, Cpu, Database, Scale, Activity, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'itu' | 'field'>('itu');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold">Kharaf AI System Architecture Specification</h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-400 text-emerald-950 font-bold">
                  ITU-T Y.3172
                </span>
              </div>
              <p className="text-xs text-emerald-300">
                Official Architectural Blueprint conforming to ITU-T Recommendation Y.3172 (06/2019)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-6 pt-4 bg-stone-50 border-b border-stone-200 flex space-x-2">
          <button
            onClick={() => setActiveTab('itu')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'itu'
                ? 'bg-white text-emerald-950 border-t-2 border-emerald-600 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Cpu className="w-4 h-4 text-emerald-700" />
            <span>Diagram 1: ITU-T Y.3172 ML Pipeline & MLFO Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('field')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'field'
                ? 'bg-white text-emerald-950 border-t-2 border-emerald-600 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-700" />
            <span>Diagram 2: Field Data & Sensor Architecture</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'itu' ? (
            <div className="space-y-6">
              {/* Architecture Blueprint Card */}
              <div className="p-6 rounded-2xl bg-stone-900 text-white space-y-6 border border-stone-800">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                      Standard Representation
                    </span>
                    <h3 className="text-base font-bold text-white">
                      ML Pipeline Logical Nodes & Orchestration Subsystem
                    </h3>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-stone-800 text-emerald-300">
                    ITU-T Y.3172 Section 6-8
                  </span>
                </div>

                {/* 7 Standard Nodes Visual Hierarchy */}
                <div className="grid grid-cols-1 md:grid-cols-7 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-stone-800 border border-stone-700 space-y-1">
                    <span className="font-mono font-bold text-amber-400 text-sm block">SRC</span>
                    <span className="font-bold text-white block text-xs">Sources</span>
                    <p className="text-[10px] text-stone-400">IoT soil sensors, camera clusters, weather station, Hasr logs</p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-800 border border-stone-700 space-y-1">
                    <span className="font-mono font-bold text-amber-400 text-sm block">C</span>
                    <span className="font-bold text-white block text-xs">Collector</span>
                    <p className="text-[10px] text-stone-400">IoT Edge Gateway, store-and-forward buffer, MQTT/TLS</p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-800 border border-stone-700 space-y-1">
                    <span className="font-mono font-bold text-amber-400 text-sm block">PP</span>
                    <span className="font-bold text-white block text-xs">Pre-proc</span>
                    <p className="text-[10px] text-stone-400">Cleaning, missing-value interpolation, VPD & ETc extraction</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-900 border border-emerald-600 space-y-1 ring-2 ring-emerald-500/40">
                    <span className="font-mono font-bold text-amber-400 text-sm block">M</span>
                    <span className="font-bold text-white block text-xs">Model</span>
                    <p className="text-[10px] text-emerald-200">Vision maturity classifier, Recommender, RAG retrieval engine</p>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-950 border border-rose-700 space-y-1 ring-2 ring-rose-500/40">
                    <span className="font-mono font-bold text-amber-400 text-sm block">P</span>
                    <span className="font-bold text-white block text-xs">Policy Node</span>
                    <p className="text-[10px] text-rose-200">Enforces MEWA Art. 12, Saudi G.A.P CP5.1.1, PDPL rules</p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-800 border border-stone-700 space-y-1">
                    <span className="font-mono font-bold text-amber-400 text-sm block">D</span>
                    <span className="font-bold text-white block text-xs">Distributor</span>
                    <p className="text-[10px] text-stone-400">Routes outputs, API gateway dispatcher, alert notifications</p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-800 border border-stone-700 space-y-1">
                    <span className="font-mono font-bold text-amber-400 text-sm block">SINK</span>
                    <span className="font-bold text-white block text-xs">ML Sink</span>
                    <p className="text-[10px] text-stone-400">Farmer Dashboard, Auditor Interface, Advisory reports</p>
                  </div>
                </div>

                {/* MLFO Subsystem Block */}
                <div className="p-4 rounded-xl bg-stone-800 border border-stone-700 text-xs space-y-2">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold">
                    <Cpu className="w-4 h-4" />
                    <span>ML Function Orchestrator (MLFO) Subsystem</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-stone-300 text-[11px]">
                    <div className="p-2 rounded bg-stone-900 border border-stone-700">
                      <strong>Model Repository:</strong> Versioned YOLOv8 maturity models and RAG index vectors.
                    </div>
                    <div className="p-2 rounded bg-stone-900 border border-stone-700">
                      <strong>Inference Scheduler:</strong> Schedules continuous telemetry evaluation and query calls.
                    </div>
                    <div className="p-2 rounded bg-stone-900 border border-stone-700">
                      <strong>Training & Evaluation:</strong> Evaluates accuracy against benchmark matrix (EVAL-001–012).
                    </div>
                    <div className="p-2 rounded bg-stone-900 border border-stone-700">
                      <strong>Monitoring & Telemetry:</strong> Tracks drift, latency, citation accuracy, and abstention rate.
                    </div>
                  </div>
                </div>
              </div>

              {/* Policy Node P Callout */}
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 text-xs space-y-2">
                <div className="flex items-center space-x-2 font-bold text-rose-900">
                  <Scale className="w-4 h-4 text-rose-700" />
                  <span>Crucial Architectural Rule: Policy Node P Placement</span>
                </div>
                <p className="text-rose-900 leading-relaxed">
                  In strict alignment with ITU-T Y.3172 Section 7.4, <strong>Policy Node P</strong> is
                  positioned directly between <strong>Model Node M</strong> and{' '}
                  <strong>Distributor Node D</strong>. Model predictions cannot reach farmers without
                  passing Policy Node validation against MEWA water conservation rules, Saudi G.A.P
                  CP5.1.1 24-month record keeping, and PDPL personal data safeguards.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Field Architecture Details */}
              <div className="p-6 rounded-2xl bg-stone-900 text-white space-y-5 border border-stone-800">
                <div className="border-b border-stone-800 pb-3">
                  <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                    Edge to Cloud Integration
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Field Data, Edge Gateway & Sensor Architecture
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Layer 1: Farm Edge */}
                  <div className="p-4 rounded-xl bg-stone-800 border border-stone-700 space-y-2">
                    <span className="font-mono font-bold text-amber-400 block uppercase">
                      Layer 1: On-Field Edge
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-stone-300 text-[11px]">
                      <li>Soil Moisture TDR Probes (multi-depth)</li>
                      <li>RGB Inflorescence & Bunch Cameras</li>
                      <li>On-farm Weather Station (Temp, RH, Solar)</li>
                      <li>Historical Agronomic / Cadastral Logs</li>
                    </ul>
                  </div>

                  {/* Layer 2: Ingestion Gateway */}
                  <div className="p-4 rounded-xl bg-stone-800 border border-stone-700 space-y-2">
                    <span className="font-mono font-bold text-amber-400 block uppercase">
                      Layer 2: IoT Gateway (Node C)
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-stone-300 text-[11px]">
                      <li>Store-and-Forward Local Buffer (Y.Sup83)</li>
                      <li>Cellular / LoRaWAN to MQTT/TLS Bridge</li>
                      <li>Timestamp & Geographic Sync (UTC+3)</li>
                      <li>Packet Validation & Data Integrity</li>
                    </ul>
                  </div>

                  {/* Layer 3: Cloud & Decision Support */}
                  <div className="p-4 rounded-xl bg-stone-800 border border-stone-700 space-y-2">
                    <span className="font-mono font-bold text-amber-400 block uppercase">
                      Layer 3: Cloud Decision Engine
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-stone-300 text-[11px]">
                      <li>API Gateway & Pre-processing (PP)</li>
                      <li>Computer Vision & RAG Engine (Node M)</li>
                      <li>Saudi Regulatory Policy Guardrails (Node P)</li>
                      <li>Farmer Web App & Auditor Sink (SINK)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
