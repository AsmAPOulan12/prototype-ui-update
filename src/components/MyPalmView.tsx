import React, { useState } from 'react';
import {
  Sprout,
  Activity,
  Droplets,
  Thermometer,
  Sun,
  Camera,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Clock,
  Play,
  Check,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowLeft,
  MoreVertical,
  Plus,
  X
} from 'lucide-react';
import { DIGITAL_TWIN_PALMS } from '../data/digitalTwinData';
import { PalmDigitalTwin } from '../types';

interface MyPalmViewProps {
  initialPalmId?: string;
  onAskAboutPalm?: (question: string) => void;
}

export const MyPalmView: React.FC<MyPalmViewProps> = ({ initialPalmId, onAskAboutPalm }) => {
  const [selectedPalmId, setSelectedPalmId] = useState<string>(
    initialPalmId || DIGITAL_TWIN_PALMS[0].palmId
  );
  const [manualOverrideActive, setManualOverrideActive] = useState(false);
  const [showAddPalmModal, setShowAddPalmModal] = useState(false);

  // New palm form state
  const [newPalmNumber, setNewPalmNumber] = useState('');
  const [newPalmBlock, setNewPalmBlock] = useState('Block C');
  const [newPalmVariety, setNewPalmVariety] = useState('Barhi (برحي)');

  const selectedPalm =
    DIGITAL_TWIN_PALMS.find((p) => p.palmId === selectedPalmId) || DIGITAL_TWIN_PALMS[0];

  const maturityStages = [
    { name: 'Hababouk', desc: 'Post-pollination fruitlet', status: 'completed' },
    { name: 'Kimri', desc: 'Green, rapid cell division', status: 'completed' },
    {
      name: 'Khalal',
      desc: 'Crisp bright yellow (Optimal Harvest for Barhee)',
      status: selectedPalm.currentMaturityStage === 'Khalal' ? 'current' : 'upcoming'
    },
    {
      name: 'Rutab',
      desc: 'Apical tip softening',
      status: selectedPalm.currentMaturityStage === 'Rutab' ? 'current' : 'upcoming'
    },
    {
      name: 'Tamar',
      desc: 'Full dry curing',
      status: selectedPalm.currentMaturityStage === 'Tamar' ? 'current' : 'upcoming'
    }
  ];

  return (
    <div id="view-my-palm" className="max-w-4xl mx-auto space-y-5 pb-12">
      {/* 1. Palm Navigation & Action Bar (matching prototype screen 4) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6ECE8] shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#163A32] text-[#D6A84F] flex items-center justify-center shadow-xs">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-black text-[#17211D]">
                {selectedPalm.name}
              </h1>
              <span className="text-[10px] font-bold text-[#2F6B55] bg-[#EAF3EE] px-2 py-0.5 rounded-full">
                BLOCK C, ROW 7
              </span>
            </div>
            <p className="text-xs text-[#68736D] mt-0.5">
              Planted: Oct 12, 2021 • Cultivar: {selectedPalm.cultivar} (برحي)
            </p>
          </div>
        </div>

        {/* Switcher & Add Palm */}
        <div className="flex items-center space-x-2">
          <select
            value={selectedPalm.palmId}
            onChange={(e) => setSelectedPalmId(e.target.value)}
            className="bg-[#F8FAF8] border border-[#E6ECE8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#17211D] focus:outline-none focus:ring-2 focus:ring-[#163A32] cursor-pointer"
          >
            {DIGITAL_TWIN_PALMS.map((p) => (
              <option key={p.palmId} value={p.palmId}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowAddPalmModal(true)}
            className="p-2 rounded-xl bg-[#163A32] text-white hover:bg-[#2F6B55] transition-colors cursor-pointer"
            title="Add New Palm"
          >
            <Plus className="w-4 h-4 text-[#D6A84F]" />
          </button>
        </div>
      </div>

      {/* 2. Live Dual Optical Feeds (matching prototype screen 4) */}
      <div className="bg-white rounded-2xl border border-[#E6ECE8] p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="w-4 h-4 text-[#2F6B55]" />
            <h2 className="text-sm font-bold text-[#17211D]">Optical Sensor Feeds</h2>
          </div>
          <span className="inline-flex items-center space-x-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAF3EE] text-[#2F6B55]">
            <span className="w-2 h-2 rounded-full bg-[#C65B4B] animate-ping" />
            <span>LIVE 12:07 PM</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* North View */}
          <div className="relative rounded-xl overflow-hidden bg-[#163A32] h-44 flex items-center justify-center border border-[#2F6B55]/30 shadow-inner group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
            <div className="text-center z-20 space-y-1.5 p-3">
              <div className="w-10 h-10 mx-auto rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-[#D6A84F]">
                <Sprout className="w-5 h-5" />
              </div>
              <p className="text-xs font-mono text-[#D6A84F] font-bold uppercase tracking-wider">
                BLOCK C - NORTH VIEW
              </p>
              <p className="text-[11px] text-[#E2EBE6]">
                Canopy: 7.2m • Fronds: 114 Active
              </p>
            </div>
            <div className="absolute top-2.5 left-2.5 z-20 bg-black/60 backdrop-blur-md text-[10px] text-white font-mono px-2 py-0.5 rounded">
              CAM 01 // 4K
            </div>
          </div>

          {/* South View / Cluster Zoom */}
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#854D0E] via-[#A16207] to-[#713F12] h-44 flex items-center justify-center border border-[#D6A84F]/40 shadow-inner group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
            <div className="text-center z-20 space-y-1.5 p-3">
              <div className="w-10 h-10 mx-auto rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300">
                <Sun className="w-5 h-5" />
              </div>
              <p className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
                BLOCK C - SOUTH VIEW
              </p>
              <p className="text-[11px] text-amber-100">
                92% Golden Yellow • Optical Brix: 29.4°
              </p>
            </div>
            <div className="absolute top-2.5 left-2.5 z-20 bg-black/60 backdrop-blur-md text-[10px] text-amber-300 font-mono px-2 py-0.5 rounded">
              OPTICAL BRIX // 29.4°
            </div>
          </div>
        </div>
      </div>

      {/* 3. Overall Health Index (matching prototype screen 4) */}
      <div className="bg-white rounded-2xl border border-[#E6ECE8] p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-[#17211D]">Palm Overall Health Index</h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          {/* Gauge Ring */}
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
              {/* Circular SVG Ring */}
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#E6ECE8]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#D6A84F]"
                  strokeDasharray="87, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-[#17211D]">87%</span>
                <span className="text-[9px] font-bold text-[#3F8F68] uppercase tracking-wider">GOOD</span>
              </div>
            </div>

            {/* Health Indicators */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3F8F68]" />
                <span className="text-[#17211D] font-medium">Moisture Profile:</span>
                <span className="text-[#3F8F68] font-bold">Optimal</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D6A84F]" />
                <span className="text-[#17211D] font-medium">Salinity Index:</span>
                <span className="text-[#D6A84F] font-bold">Moderate (1.8 dS/m)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2F6B55]" />
                <span className="text-[#17211D] font-medium">Nutrient Balance:</span>
                <span className="text-[#2F6B55] font-bold">Stable</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onAskAboutPalm?.(`Analyze overall health indicators for Barhee palm ${selectedPalm.name}`)}
            className="px-4 py-2.5 rounded-xl bg-[#EAF3EE] hover:bg-[#D4E8DC] text-[#163A32] text-xs font-bold transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2F6B55]" />
            <span>Ask Assistant to Audit Palm</span>
          </button>
        </div>
      </div>

      {/* 4. Irrigation Status Card (matching prototype) */}
      <div className="bg-white rounded-2xl border border-[#E6ECE8] p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-[#2F6B55]" />
            <h2 className="text-sm font-bold text-[#17211D]">Irrigation Status</h2>
          </div>
          <button
            onClick={() => setManualOverrideActive(!manualOverrideActive)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              manualOverrideActive
                ? 'bg-[#3F8F68] text-white'
                : 'bg-[#EAF3EE] text-[#2F6B55] hover:bg-[#D4E8DC]'
            }`}
          >
            {manualOverrideActive ? 'OVERRIDE RUNNING' : 'MANUAL OVERRIDE'}
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[#68736D]">Soil Moisture: 62%</span>
            <span className="font-mono font-bold text-[#17211D]">62 / 100</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#E6ECE8] overflow-hidden">
            <div className="h-full bg-[#2F6B55] rounded-full" style={{ width: '62%' }} />
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#68736D] pt-1">
            <span>Next Scheduled: Today at 04:30 AM</span>
            <span>Target Volume: 185 L/day</span>
          </div>
        </div>
      </div>

      {/* 5. Soil Health & Nutrition (matching prototype) */}
      <div className="bg-white rounded-2xl border border-[#E6ECE8] p-5 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-[#2F6B55]" />
            <h2 className="text-sm font-bold text-[#17211D]">Soil Health & Nutrition</h2>
          </div>
          <button
            onClick={() => onAskAboutPalm?.('Provide soil salinity mitigation recommendations for Barhee palms in Al-Ahsa')}
            className="text-xs font-bold text-[#2F6B55] hover:text-[#163A32]"
          >
            VIEW REPORT
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-[#F8FAF8] rounded-xl p-3 border border-[#E6ECE8]">
            <span className="text-[#68736D] block">Salinity:</span>
            <span className="font-bold text-[#D6A84F]">Moderate (1.8 dS/m)</span>
          </div>
          <div className="bg-[#F8FAF8] rounded-xl p-3 border border-[#E6ECE8]">
            <span className="text-[#68736D] block">Fertilizer Level:</span>
            <span className="font-bold text-[#3F8F68]">Optimal (N-P-K Bal)</span>
          </div>
        </div>

        {/* Warning Callout */}
        <div className="rounded-xl bg-[#FBECEB] border border-[#C65B4B]/30 p-3 flex items-start space-x-2.5 text-xs text-[#C65B4B]">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Extreme dryness detected in top 15cm:</span>
            <p className="text-[11px] text-[#C65B4B]/90 mt-0.5">
              Shallow roots at risk during peak afternoon heat. Pulse drip recommended.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Harvest Timeline (matching prototype) */}
      <div className="bg-white rounded-2xl border border-[#E6ECE8] p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-[#2F6B55]" />
            <h2 className="text-sm font-bold text-[#17211D]">Harvest Timeline</h2>
          </div>
          <span className="text-xs font-bold text-[#D6A84F] bg-[#FBF5E8] px-2.5 py-0.5 rounded-full">
            Khalal Stage Active
          </span>
        </div>

        <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E6ECE8]">
          {maturityStages.map((stage, idx) => (
            <div key={idx} className="relative">
              <div
                className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  stage.status === 'completed'
                    ? 'bg-[#3F8F68] border-[#3F8F68] text-white'
                    : stage.status === 'current'
                    ? 'bg-[#D6A84F] border-white ring-2 ring-[#D6A84F] text-white'
                    : 'bg-white border-[#CBD5E1]'
                }`}
              >
                {stage.status === 'completed' && <Check className="w-2.5 h-2.5" />}
              </div>
              <div>
                <span
                  className={`text-xs font-bold block ${
                    stage.status === 'current'
                      ? 'text-[#D6A84F]'
                      : stage.status === 'completed'
                      ? 'text-[#17211D]'
                      : 'text-[#68736D]'
                  }`}
                >
                  {stage.name}
                </span>
                <p className="text-[11px] text-[#68736D]">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Palm Modal */}
      {showAddPalmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 border border-[#E6ECE8] shadow-2xl space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-[#17211D]">Add New Palm to Digital Twin</h3>
              <button
                onClick={() => setShowAddPalmModal(false)}
                className="p-1 rounded-lg text-[#68736D] hover:bg-[#F8FAF8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#17211D] block mb-1">Palm Identifier / Tag #</label>
                <input
                  type="text"
                  placeholder="e.g. Palm #0588"
                  value={newPalmNumber}
                  onChange={(e) => setNewPalmNumber(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E6ECE8] focus:outline-none focus:ring-2 focus:ring-[#163A32]"
                />
              </div>

              <div>
                <label className="font-bold text-[#17211D] block mb-1">Cultivar Variety</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Barhi (برحي)', 'Sagai (صقعي)', 'Sukkari (سكري)', 'Khalas (خلاص)'].map((varName) => (
                    <button
                      key={varName}
                      type="button"
                      onClick={() => setNewPalmVariety(varName)}
                      className={`p-2 rounded-xl text-left font-semibold border transition-all cursor-pointer ${
                        newPalmVariety === varName
                          ? 'bg-[#EAF3EE] border-[#2F6B55] text-[#163A32]'
                          : 'bg-white border-[#E6ECE8] text-[#68736D]'
                      }`}
                    >
                      {varName}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-[#17211D] block mb-1">Block Location</label>
                <input
                  type="text"
                  value={newPalmBlock}
                  onChange={(e) => setNewPalmBlock(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E6ECE8] focus:outline-none focus:ring-2 focus:ring-[#163A32]"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddPalmModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#F8FAF8] text-[#68736D] font-bold text-xs hover:bg-[#E6ECE8] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddPalmModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#163A32] text-white font-bold text-xs hover:bg-[#2F6B55] transition-colors cursor-pointer"
              >
                Save Palm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
