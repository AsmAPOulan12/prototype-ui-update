import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  Calendar,
  Droplets,
  Sun,
  Award,
  ArrowRight,
  Info,
  Clock
} from 'lucide-react';
import { GroundedRAGResponse } from '../types';

export const DecisionSupportView: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);

  const scenarios = [
    {
      id: 'scen-pollination',
      title: 'Pollination Timing & Male Selection (Barhee)',
      domain: 'Barhee Agronomy',
      icon: Calendar,
      triggerCondition: 'Female spathe opened 3 days ago; pollen selection pending.',
      decisionSummary: 'Pollinate immediately within active 2–4 day female flower receptivity window.',
      decisionStatus: 'Supported by verified evidence',
      primarySources: ['KB-016 (Scientia Horticulturae / Barhee TC)'],
      verifiedRecommendations: [
        'Perform manual or mechanical pollination within 2 to 4 days of spathe crack to achieve 78.4%–84.6% fruit set (KB-016).',
        'Avoid delaying beyond 6–8 days, as fruit set rapidly drops below 35–40% and unfertilized triplet fruitlets will form (KB-016).',
        'Select certified male pollen source (e.g. Al-Fahl Al-Ghannami) to maximize bunch weight (14.8–22.4 kg) via documented metaxenia effects (KB-016).'
      ],
      constraintsChecked: [
        'Cultivar Isolation: Verified specifically on tissue-cultured Barhee date palms (Rule 2).',
        'Scope Restriction: Male pollen viability alone cannot compensate for late pollination (Rule 6).'
      ]
    },
    {
      id: 'scen-harvest',
      title: 'Commercial Harvest at Yellow Khalal Stage',
      domain: 'Barhee Harvesting',
      icon: Sun,
      triggerCondition: 'Bunch color reached 92% golden yellow; sugar at 29.4° Brix.',
      decisionSummary: 'Initiate fresh commercial harvest before extensive Rutab softening occurs.',
      decisionStatus: 'Supported by verified evidence',
      primarySources: ['KB-022 (FAO Barhee Guidelines)', 'KB-017 (EAAI Vision)', 'KB-018 (SJBS Cold Chain)'],
      verifiedRecommendations: [
        'Harvest Barhee exclusively at the crisp, crunchy yellow Khalal stage when Total Soluble Solids (TSS) exceed 28–32° Brix (KB-022, KB-017).',
        'Use gentle lowering ropes or padded field crates to prevent mechanical bruising of delicate fruit skins (KB-022).',
        'Transfer bunches immediately to 0–4°C cold storage to arrest invertase activity and prevent premature Rutab softening (KB-018).'
      ],
      constraintsChecked: [
        'Cultivar Rule: Unlike Khalas or Sukkari, Barhee is eaten fresh at Khalal; do not allow complete Rutab ripening in field.'
      ]
    },
    {
      id: 'scen-irrigation',
      title: 'Summer Peak Irrigation & Saudi G.A.P Audit',
      domain: 'Water Management',
      icon: Droplets,
      triggerCondition: 'Air temperature 43.8°C; atmospheric VPD 4.4 kPa; daily demand surging.',
      decisionSummary: 'Increase daily block irrigation to 345 L/palm/day and log in Saudi G.A.P water register.',
      decisionStatus: 'Supported by verified evidence & Hard Constraint',
      primarySources: ['KB-013 (AGRIS Penman-Monteith)', 'KB-006 (Saudi G.A.P CP5.1.1)'],
      verifiedRecommendations: [
        'Calculate daily palm water needs using Penman-Monteith ETc formula adjusted for central Saudi summer peak (250–400 L/palm/day) (KB-013).',
        'Maintain documented irrigation logs recording applied water volumes, duration, and block IDs for a minimum of 24 months (KB-006 CP5.1.1 - Hard Constraint).',
        'Verify compliance with MEWA Article 12 rationalization standards to avoid regulatory non-compliance (KB-005).'
      ],
      constraintsChecked: [
        'Hard Constraint: Saudi G.A.P CP5.1.1 record-keeping is legally mandatory for certified holdings (Rule 5).'
      ]
    },
    {
      id: 'scen-certification',
      title: 'Saudi Dates Mark & MRL Food Safety Audit',
      domain: 'Policy & Certification',
      icon: Award,
      triggerCondition: 'Farm audit scheduled for official NCPD Saudi Dates Mark issuance.',
      decisionSummary: 'Audit pre-harvest interval logs, laboratory MRL certificates, and potable washing stations.',
      decisionStatus: 'Supported by verified evidence & Hard Constraint',
      primarySources: ['KB-010 (NCPD Saudi Dates Mark)', 'KB-019 (SFDA Date Safety)'],
      verifiedRecommendations: [
        'Verify certified GAP implementation, hygienic harvest handling, and complete batch traceability from palm to packhouse (KB-010).',
        'Confirm lab tests demonstrate compliance with SFDA Maximum Residue Limits (MRL) for all applied crop protection compounds (KB-010, KB-019).',
        'Ensure washing is conducted with running potable water to remove surface particulates prior to cold chain distribution (KB-019).'
      ],
      constraintsChecked: [
        'Hard Constraint: NCPD and SFDA food safety standards are non-negotiable statutory requirements (Rule 5).'
      ]
    }
  ];

  const currentScenario = scenarios[selectedScenarioIndex];

  return (
    <div id="view-decision-support" className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#F0FDF4] text-[#059669] border border-[#BBF7D0]">
              PRESCRIPTIVE INTELLIGENCE
            </span>
            <span className="text-xs text-[#64748B]">
              Evidence-Grounded Agronomic Decision Scenarios
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1E293B] mt-1">
            Operational Decision Support Engine
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Human-in-the-loop decision recommendations cross-referencing live farm conditions with
            verified research and statutory mandates.
          </p>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {scenarios.map((scen, idx) => {
          const Icon = scen.icon;
          const isSelected = selectedScenarioIndex === idx;
          return (
            <button
              key={scen.id}
              id={`scenario-tab-${idx}`}
              onClick={() => setSelectedScenarioIndex(idx)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#0B2C24] text-white border-[#0B2C24] shadow-sm ring-1 ring-[#C5E063]/40'
                  : 'bg-white text-[#1E293B] border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon
                  className={`w-5 h-5 ${isSelected ? 'text-[#C5E063]' : 'text-[#059669]'}`}
                />
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isSelected ? 'bg-[#ffffff15] text-[#C5E063]' : 'bg-[#F1F5F9] text-[#475569]'
                }`}>
                  Scenario 0{idx + 1}
                </span>
              </div>
              <h3 className={`font-bold text-sm mt-2.5 leading-snug ${isSelected ? 'text-white' : 'text-[#1E293B]'}`}>
                {scen.title}
              </h3>
              <p
                className={`text-xs mt-1 truncate ${
                  isSelected ? 'text-[#CBD5E1]' : 'text-[#64748B]'
                }`}
              >
                {scen.domain}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detailed Scenario Decision Card */}
      <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#E2E8F0] shadow-sm space-y-6">
        {/* Header & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F1F5F9]">
          <div>
            <span className="text-[11px] font-mono font-bold text-[#059669] uppercase tracking-wider">
              ACTIVE DECISION SCENARIO
            </span>
            <h2 className="text-xl font-bold text-[#1E293B] mt-0.5">{currentScenario.title}</h2>
          </div>

          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#059669] border border-[#BBF7D0]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
              <span>{currentScenario.decisionStatus}</span>
            </span>
          </div>
        </div>

        {/* Trigger Condition Banner */}
        <div className="p-4 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] space-y-1 text-xs sm:text-sm">
          <div className="flex items-center space-x-2 font-bold text-[#78350F]">
            <AlertTriangle className="w-4 h-4 text-[#B45309]" />
            <span className="text-xs uppercase tracking-wide">Farm Trigger Condition</span>
          </div>
          <p className="leading-relaxed text-xs">{currentScenario.triggerCondition}</p>
        </div>

        {/* Core Decision Prescription */}
        <div className="p-5 rounded-xl bg-[#0B2C24] text-white space-y-2 border border-[#ffffff15] shadow-sm">
          <span className="text-[11px] font-mono text-[#C5E063] font-bold uppercase tracking-wider">
            Synthesized Decision Action (Human-In-The-Loop)
          </span>
          <p className="text-base sm:text-lg font-semibold leading-snug text-white">
            "{currentScenario.decisionSummary}"
          </p>
        </div>

        {/* Verified Action Steps */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider flex items-center space-x-2">
            <FileCheck className="w-4 h-4 text-[#059669]" />
            <span>Grounded Action Recommendations</span>
          </h3>

          <div className="space-y-2.5">
            {currentScenario.verifiedRecommendations.map((rec, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#334155] flex items-start space-x-3"
              >
                <div className="w-5 h-5 rounded-full bg-[#0B2C24] text-[#C5E063] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Sources & Constraints */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#F1F5F9]">
          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-2">
            <span className="font-bold text-[#1E293B] block uppercase tracking-wider text-[11px]">
              Authoritative Citations:
            </span>
            <ul className="list-disc list-inside space-y-1 text-[#475569]">
              {currentScenario.primarySources.map((src, idx) => (
                <li key={idx} className="font-mono">
                  {src}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-2">
            <span className="font-bold text-[#1E293B] block uppercase tracking-wider text-[11px]">
              Active Grounding Guardrails:
            </span>
            <ul className="list-disc list-inside space-y-1 text-[#475569]">
              {currentScenario.constraintsChecked.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
