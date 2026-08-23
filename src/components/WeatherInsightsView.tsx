import React, { useState } from 'react';
import {
  Sun,
  Droplets,
  Wind,
  Thermometer,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Calendar,
  CloudSun,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Info,
  Check
} from 'lucide-react';

interface WeatherInsightsViewProps {
  onAskAboutWeather?: (query: string) => void;
}

export const WeatherInsightsView: React.FC<WeatherInsightsViewProps> = ({ onAskAboutWeather }) => {
  const [appliedRecommendations, setAppliedRecommendations] = useState<Record<string, boolean>>({});

  const weeklyForecast = [
    { day: 'Mon', temp: 37, waterLiters: 280 },
    { day: 'Tue', temp: 39, waterLiters: 310 },
    { day: 'Wed', temp: 41, waterLiters: 340 },
    { day: 'Thu', temp: 43, waterLiters: 385, peak: true },
    { day: 'Fri', temp: 44, waterLiters: 390, peak: true },
    { day: 'Sat', temp: 41, waterLiters: 345 },
    { day: 'Sun', temp: 38, waterLiters: 295 }
  ];

  const handleApplyRec = (id: string) => {
    setAppliedRecommendations((prev) => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <div id="view-weather-insights" className="max-w-4xl mx-auto space-y-5 pb-12">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6ECE8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold text-[#2F6B55] bg-[#EAF3EE] px-2.5 py-0.5 rounded-full">
              Climate & Irrigation Analytics
            </span>
            <span className="text-xs text-[#68736D]">Central Region & Al-Ahsa Oasis</span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-[#17211D] mt-1">
            Weather & Water Demand Forecast
          </h1>
          <p className="text-xs text-[#68736D]">
            Automated correlation between ambient temperature and daily palm evapotranspiration (ETc)
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs bg-[#F8FAF8] px-3.5 py-2 rounded-xl border border-[#E6ECE8]">
          <Thermometer className="w-4 h-4 text-[#D6A84F]" />
          <span className="text-[#17211D] font-bold">Current: 38°C</span>
          <span className="text-[#68736D]">•</span>
          <span className="text-[#68736D]">RH: 45%</span>
          <span className="text-[#68736D]">•</span>
          <span className="text-[#68736D]">Wind: 12 km/h</span>
        </div>
      </div>

      {/* 2. Climate Forecast vs Water Demand Chart Card */}
      <div className="bg-white rounded-2xl border border-[#E6ECE8] p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-[#17211D]">Climate Forecast vs Water Demand (ETc)</h2>
            <p className="text-xs text-[#68736D]">Correlating peak ambient heat with optimal irrigation targets</p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-semibold">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D6A84F]" />
              <span className="text-[#68736D]">Temp (°C)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2F6B55]" />
              <span className="text-[#68736D]">Water (L/day)</span>
            </div>
          </div>
        </div>

        {/* Visual Forecast Graph Bars */}
        <div className="grid grid-cols-7 gap-2 pt-2">
          {weeklyForecast.map((item) => (
            <div
              key={item.day}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-between space-y-2.5 transition-all ${
                item.peak
                  ? 'bg-[#FBF5E8] border-[#D6A84F] shadow-2xs'
                  : 'bg-[#F8FAF8] border-[#E6ECE8]'
              }`}
            >
              <span className="text-xs font-bold text-[#17211D]">{item.day}</span>
              <Sun className={`w-4 h-4 ${item.peak ? 'text-[#D6A84F]' : 'text-amber-500'}`} />
              <div className="text-center">
                <span className="text-sm font-black text-[#17211D] block">{item.temp}°</span>
                <span className="text-[10px] text-[#2F6B55] font-bold block">{item.waterLiters}L</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Extreme Heatwave Advisory Card */}
      <div className="rounded-2xl bg-[#FBF5E8] border-2 border-[#D6A84F] p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D6A84F] text-[#163A32] flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5 text-[#163A32]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#17211D]">Heatwave Warning (Thu–Fri)</h3>
              <p className="text-xs text-[#925C29]">Peak temperatures reaching 44°C in Al-Ahsa</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#925C29] bg-white px-2 py-1 rounded-full border border-[#D6A84F]/40">
            Action Recommended
          </span>
        </div>

        <p className="text-xs text-[#17211D] leading-relaxed">
          High evapotranspiration will increase daily palm water consumption to <strong>390 L/tree</strong>. Schedule irrigation cycles exclusively between <strong>04:00 AM – 07:00 AM</strong> to prevent scalding and water waste.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#D6A84F]/30">
          <button
            onClick={() => handleApplyRec('heatwave-schedule')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              appliedRecommendations['heatwave-schedule']
                ? 'bg-[#3F8F68] text-white'
                : 'bg-[#163A32] text-white hover:bg-[#2F6B55]'
            }`}
          >
            {appliedRecommendations['heatwave-schedule'] ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Irrigation Override Scheduled</span>
              </>
            ) : (
              <span>Apply Heatwave Irrigation Override</span>
            )}
          </button>

          <button
            onClick={() => onAskAboutWeather?.('What are the best irrigation practices during a 44°C heatwave in Al-Ahsa?')}
            className="text-xs font-bold text-[#2F6B55] hover:text-[#163A32] flex items-center space-x-1"
          >
            <span>Ask AI About Heatwave Protocols</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
