import React from 'react';
import {
  Sprout,
  ShieldCheck,
  Layers,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  Eye,
  FileText,
  Activity,
  Sliders,
  Scale,
  Sparkles
} from 'lucide-react';
import { TabType } from './Navigation';

interface DashboardViewProps {
  onNavigate: (tab: TabType) => void;
  onOpenArchitecture: () => void;
  systemStatus: {
    geminiConfigured: boolean;
    totalSources: number;
  };
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenArchitecture,
  systemStatus
}) => {
  const pipelineNodes = [
    {
      code: 'SRC',
      name: 'Data Sources',
      desc: 'Soil sensors, weather station, RGB cluster cameras, farm history',
      icon: Database,
      badge: 'Edge / Farm'
    },
    {
      code: 'C',
      name: 'Collector',
      desc: 'IoT Gateway buffering, protocol translation, timestamp sync',
      icon: Activity,
      badge: 'Ingestion'
    },
    {
      code: 'PP',
      name: 'Pre-processor',
      desc: 'Cleaning, anomaly rejection, VPD & ETc feature extraction',
      icon: Sliders,
      badge: 'Pipeline'
    },
    {
      code: 'M',
      name: 'ML Model',
      desc: 'Computer vision, harvest recommendation, RAG retrieval & LLM',
      icon: Cpu,
      badge: 'Intelligence'
    },
    {
      code: 'P',
      name: 'Policy Node',
      desc: 'MEWA Article 12, Saudi G.A.P CP5.1.1, PDPL & Dates Mark validation',
      icon: Scale,
      badge: 'Governance'
    },
    {
      code: 'D',
      name: 'Distributor',
      desc: 'API routing, alert notification dispatch, sink delivery',
      icon: Layers,
      badge: 'Routing'
    },
    {
      code: 'SINK',
      name: 'ML Output',
      desc: 'Farmer Dashboard, Auditor Compliance View, Analytical Reports',
      icon: Eye,
      badge: 'Decision'
    }
  ];

  return (
    <div id="view-dashboard" className="max-w-7xl mx-auto space-y-6">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-xl bg-[#0B2C24] p-6 sm:p-8 text-white border border-[#ffffff15] shadow-sm">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#ffffff10] text-[#C5E063] text-xs font-semibold border border-[#C5E063]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#C5E063]" />
            <span className="uppercase tracking-wider text-[11px] font-mono">Saudi Precision Agriculture Decision Support</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
            KHARAF AI <span className="text-[#C5E063] font-serif">خَرَاف</span>
          </h1>

          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed max-w-3xl">
            A source-grounded Decision-Support System and Digital Twin for{' '}
            <strong className="text-white">Barhee (Barhi) date palms</strong> in the Kingdom of Saudi
            Arabia. Built in strict accordance with{' '}
            <strong className="text-[#C5E063]">ITU-T Recommendation Y.3172</strong> and Saudi
            agricultural statutory frameworks (MEWA, Saudi G.A.P, Hasr, NCPD Saudi Dates Mark, PDPL).
          </p>

          {/* Key CTA Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigate('ask')}
              className="px-5 py-2.5 rounded-lg bg-[#C5E063] hover:opacity-90 text-[#0B2C24] font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Consult Knowledge Base</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('digital-twin')}
              className="px-5 py-2.5 rounded-lg bg-[#ffffff15] hover:bg-[#ffffff25] text-white font-semibold text-xs uppercase tracking-wider border border-[#ffffff20] transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Inspect Digital Twin</span>
              <Activity className="w-3.5 h-3.5 text-[#C5E063]" />
            </button>

            <button
              onClick={onOpenArchitecture}
              className="px-4 py-2.5 rounded-lg bg-[#ffffff0c] hover:bg-[#ffffff18] text-[#CBD5E1] hover:text-white text-xs uppercase tracking-wider border border-[#ffffff15] transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[#A8C3B3]" />
              <span>View Architectural Specs</span>
            </button>
          </div>
        </div>

        {/* Decorative background logo */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none flex items-center justify-center">
          <Sprout className="w-96 h-96 text-white" />
        </div>
      </div>

      {/* Simulated Data Disclaimer Notice */}
      <div className="p-4 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm shadow-sm">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-4 h-4 text-[#B45309] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#78350F] uppercase tracking-wide text-[11px]">Operational Integrity Notice:</span>{' '}
            <span className="text-[#92400E] text-xs">
              Telemetry values (soil moisture, temperature, camera feeds) are demo/simulated values mapped to the ITU-T Y.3172 Digital Twin schema. Knowledge Base records and Grounding Guardrails are 100% real, verified, and audited.
            </span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded bg-[#FDE68A] text-[#78350F] font-mono font-bold text-[10px] uppercase whitespace-nowrap border border-[#FCD34D]">
          SIMULATED TELEMETRY MODE
        </span>
      </div>

      {/* Interactive ITU-T Y.3172 ML Pipeline Component Flow */}
      <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#E2E8F0] shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#059669]">
              Architectural Standard
            </div>
            <h2 className="text-lg font-bold text-[#1E293B]">
              ITU-T Recommendation Y.3172 ML Pipeline & Decision Architecture
            </h2>
          </div>
          <button
            onClick={onOpenArchitecture}
            className="text-xs text-[#0B2C24] hover:text-[#059669] font-bold inline-flex items-center space-x-1 cursor-pointer transition-colors"
          >
            <span>Inspect Full System Blueprint</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pipeline Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2.5 pt-1">
          {pipelineNodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div
                key={node.code}
                className={`p-3.5 rounded-lg border flex flex-col justify-between transition-all ${
                  node.code === 'M' || node.code === 'P'
                    ? 'bg-[#F0FDF4] border-[#86EFAC] ring-1 ring-[#22C55E]/20'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#0B2C24] text-[#C5E063]">
                      {node.code}
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8] font-bold">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#1E293B] text-xs mt-2">{node.name}</h3>
                  <p className="text-[11px] text-[#64748B] mt-1 leading-snug">{node.desc}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] font-mono text-[#059669] font-semibold">
                  <span>{node.badge}</span>
                  <Icon className="w-3.5 h-3.5 text-[#0B2C24]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* MLFO & Policy Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-4 rounded-lg bg-[#0B2C24] text-white text-xs space-y-1.5 border border-[#ffffff15]">
            <div className="flex items-center space-x-2 font-bold text-[#C5E063]">
              <Cpu className="w-4 h-4" />
              <span>ML Function Orchestrator (MLFO)</span>
            </div>
            <p className="text-[#CBD5E1] leading-relaxed text-[11px]">
              Manages inference lifecycle, model versioning, computer vision cluster detection, and
              orchestrates RAG knowledge retrieval inside Node M.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#1E293B] text-white text-xs space-y-1.5 border border-[#334155]">
            <div className="flex items-center space-x-2 font-bold text-[#C5E063]">
              <Scale className="w-4 h-4" />
              <span>Policy & Regulatory Governance (Node P)</span>
            </div>
            <p className="text-[#CBD5E1] leading-relaxed text-[11px]">
              Positioned between Model M and Distributor D to enforce MEWA Article 12, Saudi G.A.P CP5.1.1
              record audits, and PDPL personal data restrictions.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics & System Inventory Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[#64748B] text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider">Knowledge Base</span>
            <Database className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="text-2xl font-bold text-[#1E293B]">24 Sources</div>
          <p className="text-xs text-[#64748B]">
            100% verified against original index & research papers
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[#64748B] text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider">Barhee Phenology</span>
            <Sprout className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="text-2xl font-bold text-[#1E293B]">KB-016 & KB-022</div>
          <p className="text-xs text-[#64748B]">
            Scientia Horticulturae & FAO Barhee Khalal evidence
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[#64748B] text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Guardrails</span>
            <ShieldCheck className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="text-2xl font-bold text-[#1E293B]">7 Core Rules</div>
          <p className="text-xs text-[#64748B]">
            Cultivar isolation, Hard constraints & Abstention
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[#64748B] text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider">Benchmark Matrix</span>
            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="text-2xl font-bold text-[#1E293B]">12 Tests</div>
          <p className="text-xs text-[#64748B]">
            Auditing citations, constraints, and abstention
          </p>
        </div>
      </div>

      {/* Guardrail Rules Overview */}
      <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#E2E8F0] shadow-sm space-y-4">
        <h2 className="text-base font-bold text-[#1E293B] flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#059669]" />
          <span>Kharaf AI Grounding Guardrails & Integrity Rules</span>
        </h2>
        <p className="text-xs text-[#64748B] leading-relaxed">
          The decision engine strictly adheres to these 7 verification rules before delivering any
          recommendation:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-1">
            <span className="font-bold text-[#1E293B] block">Rule 1: No Unsupported Claims</span>
            <p className="text-[#64748B]">
              Every factual assertion must trace to indexed KB chunks. If evidence is lacking, the system explicitly abstains.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-1">
            <span className="font-bold text-[#1E293B] block">Rule 2: Cultivar Scope Isolation</span>
            <p className="text-[#64748B]">
              Evidence from Nabbut-Saif (KB-014) or Khalas (KB-015) is NEVER presented as Barhee recommendations.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-1">
            <span className="font-bold text-[#1E293B] block">Rule 3: Geographic Scope</span>
            <p className="text-[#64748B]">
              Penman-Monteith ETc regional distinctions (8 Saudi provinces) are preserved; no uniform nationwide guessing.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-1">
            <span className="font-bold text-[#1E293B] block">Rule 4: Research Scope</span>
            <p className="text-[#64748B]">
              Empirical station results are reported as scientific evidence, not universal mandatory rules.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-1">
            <span className="font-bold text-[#1E293B] block">Rule 5: Statutory & Standards Hard Constraints</span>
            <p className="text-[#64748B]">
              Saudi PDPL, MEWA Article 12, Saudi G.A.P CP5.1.1, and Saudi Dates Mark are enforced as non-negotiable hard constraints.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-1">
            <span className="font-bold text-[#1E293B] block">Rule 6 & 7: "Do Not Infer" & Uncertainty</span>
            <p className="text-[#64748B]">
              All source-specific inference bans are respected, and decisions are clearly labeled with their evidential certainty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
