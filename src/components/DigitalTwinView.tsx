import React, { useState } from 'react';
import {
  Network,
  Activity,
  Droplets,
  Thermometer,
  Sun,
  Camera,
  ShieldCheck,
  Play,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Layers,
  MapPin,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { DIGITAL_TWIN_PALMS } from '../data/digitalTwinData';
import { PalmDigitalTwin, ITU_PipelineExecution } from '../types';

export const DigitalTwinView: React.FC = () => {
  const [selectedPalmId, setSelectedPalmId] = useState<string>(DIGITAL_TWIN_PALMS[0].palmId);
  const [pipelineLoading, setPipelineLoading] = useState(false);
  const [pipelineSteps, setPipelineSteps] = useState<ITU_PipelineExecution[] | null>(null);

  const selectedPalm =
    DIGITAL_TWIN_PALMS.find((p) => p.palmId === selectedPalmId) || DIGITAL_TWIN_PALMS[0];

  const handleRunPipeline = async (palmId: string) => {
    setPipelineLoading(true);
    setPipelineSteps(null);

    try {
      const res = await fetch('/api/digital-twin/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ palmId })
      });

      if (!res.ok) throw new Error('Pipeline execution failed');
      const data = await res.json();
      setPipelineSteps(data.pipelineExecution);
    } catch (err) {
      console.error('Error running pipeline:', err);
    } finally {
      setPipelineLoading(false);
    }
  };

  return (
    <div id="view-digital-twin" className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#F0FDF4] text-[#059669] border border-[#BBF7D0]">
              ITU-T Y.3172 CYBER-PHYSICAL SYSTEM
            </span>
            <span className="text-xs text-[#64748B]">Per-Palm Digital Twin & Sensor Mesh</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1E293B] mt-1">
            Barhee Palm Digital Twin Engine
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Real-time cyber-physical synchronization integrating on-field IoT telemetry, computer
            vision maturity inspection, and grounded decision support.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs max-w-xs shadow-sm">
          <strong className="text-[#78350F]">Notice:</strong> Sensor telemetry and camera captures are simulated demo inputs
          structured under ITU-T Y.3172 schema.
        </div>
      </div>

      {/* Palm Selector Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DIGITAL_TWIN_PALMS.map((palm) => {
          const isSelected = palm.palmId === selectedPalm.palmId;
          return (
            <button
              key={palm.palmId}
              id={`palm-card-${palm.palmId}`}
              onClick={() => {
                setSelectedPalmId(palm.palmId);
                setPipelineSteps(null);
              }}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#0B2C24] text-white border-[#0B2C24] shadow-sm ring-1 ring-[#C5E063]/40'
                  : 'bg-white text-[#1E293B] border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                    isSelected ? 'bg-[#C5E063] text-[#0B2C24]' : 'bg-[#F1F5F9] text-[#334155]'
                  }`}
                >
                  {palm.palmId}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    palm.currentMaturityStage === 'Khalal'
                      ? 'bg-[#FEF3C7] text-[#92400E]'
                      : palm.currentMaturityStage === 'Kimri'
                      ? 'bg-[#DCFCE7] text-[#166534]'
                      : 'bg-[#E0F2FE] text-[#0369A1]'
                  }`}
                >
                  {palm.currentMaturityStage} Stage
                </span>
              </div>

              <h3 className={`font-bold text-sm mt-2.5 ${isSelected ? 'text-white' : 'text-[#1E293B]'}`}>
                {palm.name}
              </h3>

              <div
                className={`flex items-center space-x-1 text-xs mt-1.5 ${
                  isSelected ? 'text-[#CBD5E1]' : 'text-[#64748B]'
                }`}
              >
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{palm.farmName}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Palm Detail Grid: Telemetry, Vision, and Pipeline Runner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Telemetry & Agronomic Status */}
        <div className="lg:col-span-6 space-y-6">
          {/* Identity & Phenology */}
          <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#059669] uppercase tracking-wider">TREE PROFILE</span>
                <h2 className="text-lg font-bold text-[#1E293B]">{selectedPalm.name}</h2>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-[#F8FAFC] text-[#475569] font-mono border border-[#E2E8F0]">
                Age: {selectedPalm.ageYears} yrs (Planted {selectedPalm.plantationDate})
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <span className="text-[#64748B] block text-[11px]">Cultivar & Location:</span>
                <strong className="text-[#1E293B] block font-semibold">{selectedPalm.cultivar}</strong>
                <span className="text-[#475569] block">
                  {selectedPalm.location.city}, {selectedPalm.location.region}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <span className="text-[#64748B] block text-[11px]">Pollination History:</span>
                <strong className="text-[#1E293B] block font-semibold">
                  {selectedPalm.pollinationStatus}
                </strong>
                <span className="text-[#475569] block truncate">
                  {selectedPalm.pollenSource || 'Pending Male Selection'}
                </span>
              </div>
            </div>

            {/* Phenology & Spathe Tracker */}
            <div className="p-3.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#059669] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#166534]">Days Since Spathe Crack:</span>
                <span className="ml-1.5 font-mono font-bold text-[#059669]">
                  {selectedPalm.daysSinceSpatheOpening} days
                </span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#DCFCE7] font-semibold text-[#166534] border border-[#BBF7D0]">
                {selectedPalm.daysSinceSpatheOpening <= 4
                  ? 'Active Receptive Window (KB-016)'
                  : 'Fruit Development Ongoing'}
              </span>
            </div>
          </div>

          {/* IoT Telemetry Gauges (ITU-T Node SRC) */}
          <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider flex items-center space-x-2">
                <Activity className="w-4 h-4 text-[#059669]" />
                <span>On-Field IoT Telemetry (Node SRC)</span>
              </h3>
              <span className="text-[11px] text-[#94A3B8] font-mono">
                Updated {new Date(selectedPalm.currentTelemetry.lastUpdated).toLocaleTimeString()}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Soil Moisture */}
              <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <div className="flex items-center justify-between text-[#64748B] text-xs">
                  <span>Soil Moisture</span>
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div className="text-xl font-bold text-[#1E293B]">
                  {selectedPalm.currentTelemetry.soilMoisturePercent}%
                </div>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                    selectedPalm.currentTelemetry.soilMoistureStatus === 'Optimal'
                      ? 'bg-[#DCFCE7] text-[#166534]'
                      : 'bg-[#FFE4E6] text-[#9F1239]'
                  }`}
                >
                  {selectedPalm.currentTelemetry.soilMoistureStatus}
                </span>
              </div>

              {/* Air Temperature */}
              <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <div className="flex items-center justify-between text-[#64748B] text-xs">
                  <span>Air Temp</span>
                  <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-xl font-bold text-[#1E293B]">
                  {selectedPalm.currentTelemetry.airTemperatureC}°C
                </div>
                <span className="text-[10px] text-[#64748B] font-mono">
                  RH: {selectedPalm.currentTelemetry.relativeHumidityPercent}%
                </span>
              </div>

              {/* Solar Radiation */}
              <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <div className="flex items-center justify-between text-[#64748B] text-xs">
                  <span>Solar Rad</span>
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <div className="text-xl font-bold text-[#1E293B]">
                  {selectedPalm.currentTelemetry.solarRadiationWm2}
                </div>
                <span className="text-[10px] text-[#64748B] font-mono">W/m² (Central KSA)</span>
              </div>

              {/* VPD */}
              <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <div className="flex items-center justify-between text-[#64748B] text-xs">
                  <span>VPD Deficit</span>
                  <Activity className="w-3.5 h-3.5 text-purple-500" />
                </div>
                <div className="text-xl font-bold text-[#1E293B]">
                  {selectedPalm.currentTelemetry.vpdKPa} kPa
                </div>
                <span className="text-[10px] text-[#64748B] font-mono">Atmospheric Demand</span>
              </div>

              {/* Water Applied vs ETc */}
              <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 col-span-2">
                <div className="flex items-center justify-between text-[#64748B] text-xs">
                  <span>Irrigation vs Penman-Monteith (KB-013)</span>
                  <Droplets className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-lg font-bold text-[#1E293B]">
                    {selectedPalm.currentTelemetry.dailyWaterAppliedLiters} L/day
                  </span>
                  <span className="text-xs text-[#64748B]">
                    / Target: {selectedPalm.currentTelemetry.penmanMonteithEtcLday} L/day
                  </span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#059669] h-full rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (selectedPalm.currentTelemetry.dailyWaterAppliedLiters /
                          selectedPalm.currentTelemetry.penmanMonteithEtcLday) *
                          100
                      )}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Computer Vision & Optical Maturity (YOLO Stage) */}
          <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider flex items-center space-x-2">
                <Camera className="w-4 h-4 text-[#059669]" />
                <span>Computer Vision & Maturity (Node M)</span>
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-[#F0FDF4] text-[#059669] font-mono font-bold border border-[#BBF7D0]">
                {(selectedPalm.maturityConfidence * 100).toFixed(0)}% Confidence
              </span>
            </div>

            {/* Visual Box Simulation */}
            <div className="relative rounded-xl overflow-hidden bg-[#1E293B] p-5 text-white border border-[#334155] space-y-3 shadow-sm">
              <div className="flex items-center justify-between text-xs text-[#CBD5E1]">
                <span className="font-mono">CAMERA_STREAM_CH04 // 4K_RGB</span>
                <span className="px-2 py-0.5 rounded bg-[#ffffff10] text-[#C5E063] border border-[#C5E063]/30 text-[10px] font-mono">
                  YOLOv8-PalmDetect
                </span>
              </div>

              <div className="p-4 rounded-lg bg-[#0F172A] border border-dashed border-[#C5E063]/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#C5E063] text-sm">
                    {selectedPalm.cameraFeed.bunchColor}
                  </span>
                  <span className="text-xs font-mono text-[#CBD5E1]">
                    Est. Brix: {selectedPalm.cameraFeed.sugarBrixEstimate}°
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8]">
                  {selectedPalm.cameraFeed.clusterDefects.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live ITU-T Y.3172 Pipeline Execution Engine */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#059669] uppercase tracking-wider">
                  ITU-T Y.3172 PIPELINE RUNNER
                </span>
                <h2 className="text-lg font-bold text-[#1E293B]">
                  Automated Decision Pipeline Execution
                </h2>
              </div>

              <button
                id="btn-run-pipeline"
                onClick={() => handleRunPipeline(selectedPalm.palmId)}
                disabled={pipelineLoading}
                className="px-4 py-2 rounded-lg bg-[#0B2C24] hover:opacity-90 text-[#C5E063] font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {pipelineLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#C5E063]" />
                    <span>Run ITU-T Pipeline</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              Executes end-to-end data transformation across all seven ITU-T Y.3172 logical nodes (SRC
              → C → PP → M → P → D → SINK) for <strong>{selectedPalm.name}</strong>.
            </p>

            {/* Pipeline Step Results */}
            {pipelineSteps ? (
              <div className="space-y-3 pt-1">
                {pipelineSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-[#0B2C24] text-[#C5E063] font-mono font-bold text-[11px]">
                          Node {step.step}
                        </span>
                        <span className="font-semibold text-[#1E293B]">{step.stepName}</span>
                      </div>
                      <span className="font-mono text-[10px] text-[#94A3B8]">{step.durationMs}ms</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0] space-y-1">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wide">
                        Output Payload:
                      </span>
                      <pre className="text-[11px] font-mono text-[#334155] whitespace-pre-wrap leading-tight">
                        {JSON.stringify(step.outputs, null, 2)}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-[#F8FAFC] rounded-xl border border-dashed border-[#CBD5E1] text-[#64748B] text-xs space-y-2">
                <Layers className="w-6 h-6 text-[#94A3B8] mx-auto" />
                <p>Click "Run ITU-T Pipeline" to execute live node evaluation on this palm.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
