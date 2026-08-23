import React, { useState } from 'react';
import {
  Sprout,
  Droplets,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Calendar,
  Layers,
  MessageSquareText,
  Activity,
  ChevronRight,
  Sun,
  ShieldCheck,
  Plus,
  Bell,
  Clock,
  Check
} from 'lucide-react';
import { TabType } from './Navigation';

interface HomeViewProps {
  onNavigate: (tab: TabType, palmId?: string) => void;
  onOpenArchitecture?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  return (
    <div id="view-home" className="max-w-4xl mx-auto space-y-5 pb-12">
      {/* 1. Farmer Greeting Header (matching prototype screen 2) */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-full bg-[#163A32] text-[#D6A84F] flex items-center justify-center font-bold text-base shadow-sm ring-2 ring-[#D6A84F]/40">
            SA
          </div>
          <div>
            <p className="text-xs text-[#68736D] font-medium leading-none">
              Assalamu Alaikum
            </p>
            <h1 className="text-xl font-black text-[#17211D] tracking-tight mt-1">
              Salem Al-Rashed
            </h1>
          </div>
        </div>

        <button
          onClick={() => onNavigate('weather')}
          className="w-10 h-10 rounded-full bg-white border border-[#E6ECE8] text-[#17211D] flex items-center justify-center relative shadow-sm hover:bg-[#F8FAF8] transition-colors cursor-pointer"
        >
          <Bell className="w-4 h-4 text-[#17211D]" />
          <span className="w-4 h-4 rounded-full bg-[#C65B4B] text-[10px] font-bold text-white flex items-center justify-center absolute -top-1 -right-1">
            3
          </span>
        </button>
      </div>

      {/* 2. Farm Map Overview Card (matching prototype) */}
      <div className="bg-white rounded-2xl border border-[#E6ECE8] p-4 sm:p-5 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#17211D] flex items-center space-x-2">
            <span>Farm Map Overview</span>
          </h2>
          <button
            onClick={() => onNavigate('mypalm')}
            className="text-xs font-bold text-[#2F6B55] hover:text-[#163A32] inline-flex items-center space-x-1 cursor-pointer transition-colors tracking-wide"
          >
            <span>FULL MAP</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visual Map Canvas / Satellite Image representation */}
        <div className="relative h-44 sm:h-52 rounded-xl overflow-hidden bg-[#163A32] border border-[#2F6B55]/30 shadow-inner flex items-center justify-center group">
          {/* Subtle Grid / Orchard Rows */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'radial-gradient(#D6A84F 1.5px, transparent 1.5px)',
              backgroundSize: '22px 22px'
            }}
          />

          {/* Orchard Row Lines */}
          <div className="absolute inset-0 flex flex-col justify-around opacity-15 pointer-events-none px-4">
            <div className="h-0.5 bg-emerald-400 w-full" />
            <div className="h-0.5 bg-emerald-400 w-full" />
            <div className="h-0.5 bg-emerald-400 w-full" />
            <div className="h-0.5 bg-emerald-400 w-full" />
          </div>

          {/* Active Palm Pins */}
          {/* Palm #0472 (Primary Selected) */}
          <div
            onClick={() => onNavigate('mypalm', 'BH-0472')}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D6A84F] text-[#163A32] px-3.5 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform"
          >
            <span className="w-2 h-2 rounded-full bg-[#163A32] animate-ping" />
            <span className="font-bold text-xs">Al-Barhi #0472</span>
            <span className="text-[10px] bg-[#163A32] text-[#D6A84F] px-1.5 py-0.5 rounded-full font-bold">
              87%
            </span>
          </div>

          {/* Palm #0115 (Dry Alert) */}
          <div
            onClick={() => onNavigate('mypalm', 'BH-0115')}
            className="absolute top-1/4 left-1/4 bg-white text-[#17211D] px-2.5 py-1 rounded-full shadow-md text-xs font-semibold flex items-center space-x-1.5 cursor-pointer hover:bg-[#F8FAF8] transition-colors border border-amber-300"
          >
            <span className="w-2 h-2 rounded-full bg-[#D6A84F]" />
            <span>Palm #0115</span>
          </div>

          {/* Palm #0028 (Optimal) */}
          <div
            onClick={() => onNavigate('mypalm', 'BH-0028')}
            className="absolute bottom-1/4 right-1/4 bg-white text-[#17211D] px-2.5 py-1 rounded-full shadow-md text-xs font-semibold flex items-center space-x-1.5 cursor-pointer hover:bg-[#F8FAF8] transition-colors border border-emerald-300"
          >
            <span className="w-2 h-2 rounded-full bg-[#3F8F68]" />
            <span>Palm #0028</span>
          </div>

          {/* Live Telemetry Pill */}
          <div className="absolute bottom-2.5 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-lg border border-white/10 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3F8F68] animate-pulse" />
            <span>Al-Nakheel Farm • Block C (1,247 Palms Monitored)</span>
          </div>
        </div>
      </div>

      {/* 3. 2x2 Metric Grid Cards (matching prototype screen 2) */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
        {/* Card 1: Total Palms */}
        <div
          onClick={() => onNavigate('mypalm')}
          className="p-4 rounded-2xl bg-white border border-[#E6ECE8] hover:border-[#D6A84F] shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-[#EAF3EE] flex items-center justify-center text-[#2F6B55] mb-2">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#17211D] tracking-tight">
              1,247
            </div>
            <div className="text-xs font-bold text-[#68736D] group-hover:text-[#163A32] flex items-center justify-between mt-0.5">
              <span>TOTAL PALMS</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#68736D] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Card 2: Dry Soil Alert */}
        <div
          onClick={() => onNavigate('weather')}
          className="p-4 rounded-2xl bg-white border-2 border-[#D6A84F] shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FBF5E8] flex items-center justify-center text-[#D6A84F] mb-2">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#D6A84F] tracking-tight">
              89 <span className="text-sm font-bold text-[#D6A84F]">PALMS</span>
            </div>
            <div className="text-xs font-bold text-[#D6A84F] flex items-center justify-between mt-0.5">
              <span>DRY SOIL ALERT</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D6A84F] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Card 3: Harvest Ready */}
        <div
          onClick={() => onNavigate('mypalm', 'BH-0472')}
          className="p-4 rounded-2xl bg-white border border-[#E6ECE8] hover:border-[#D6A84F] shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F5EBE1] flex items-center justify-center text-[#925C29] mb-2">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#17211D] tracking-tight">
              156 <span className="text-sm font-bold text-[#68736D]">PALMS</span>
            </div>
            <div className="text-xs font-bold text-[#68736D] group-hover:text-[#163A32] flex items-center justify-between mt-0.5">
              <span>HARVEST READY</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#68736D] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Card 4: Salinity Alerts */}
        <div
          onClick={() => onNavigate('mypalm')}
          className="p-4 rounded-2xl bg-white border-2 border-[#C65B4B] shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FBECEB] flex items-center justify-center text-[#C65B4B] mb-2">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#C65B4B] tracking-tight">
              12
            </div>
            <div className="text-xs font-bold text-[#C65B4B] flex items-center justify-between mt-0.5">
              <span>SALINITY ALERTS</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#C65B4B] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Quick Access Section (matching prototype) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#17211D]">Quick Access</h2>
          <button
            onClick={() => onNavigate('mypalm')}
            className="text-xs font-bold text-[#2F6B55] hover:text-[#163A32] inline-flex items-center space-x-1 cursor-pointer transition-colors"
          >
            <span>MANAGE</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {/* + Add Palm Button */}
          <button
            id="btn-quick-add-palm"
            onClick={() => onNavigate('mypalm')}
            className="px-4 py-2 rounded-full bg-[#163A32] hover:bg-[#2F6B55] text-white text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#D6A84F]" />
            <span>Add Palm</span>
          </button>

          {/* Palm Chips */}
          <button
            onClick={() => onNavigate('mypalm', 'BH-0472')}
            className="px-4 py-2 rounded-full bg-white hover:bg-[#EAF3EE] text-[#17211D] border border-[#E6ECE8] text-xs font-semibold shadow-2xs transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <span>🌴 Palm #0472</span>
          </button>

          <button
            onClick={() => onNavigate('mypalm', 'BH-0115')}
            className="px-4 py-2 rounded-full bg-white hover:bg-[#EAF3EE] text-[#17211D] border border-[#E6ECE8] text-xs font-semibold shadow-2xs transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <span>🌴 Palm #0115</span>
          </button>

          <button
            onClick={() => onNavigate('mypalm', 'BH-0028')}
            className="px-4 py-2 rounded-full bg-white hover:bg-[#EAF3EE] text-[#17211D] border border-[#E6ECE8] text-xs font-semibold shadow-2xs transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <span>🌴 Palm #0028</span>
          </button>
        </div>
      </div>

      {/* 5. Urgent Tasks Section (matching prototype) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#17211D]">Urgent Tasks</h2>
          <button
            onClick={() => onNavigate('weather')}
            className="text-xs font-bold text-[#2F6B55] hover:text-[#163A32] inline-flex items-center space-x-1 cursor-pointer transition-colors"
          >
            <span>SEE ALL</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-[#E6ECE8] divide-y divide-[#F1F5F3] shadow-sm overflow-hidden">
          {/* Task 1 */}
          <div
            onClick={() => toggleTask('task-1')}
            className="p-4 flex items-center justify-between hover:bg-[#F8FAF8] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  completedTasks['task-1']
                    ? 'bg-[#3F8F68] border-[#3F8F68] text-white'
                    : 'border-[#3F8F68] text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm font-bold ${
                      completedTasks['task-1']
                        ? 'line-through text-[#68736D]'
                        : 'text-[#17211D]'
                    }`}
                  >
                    Manual Irrigation Override
                  </span>
                  <span className="text-[10px] font-bold text-[#2F6B55] bg-[#EAF3EE] px-2 py-0.5 rounded-full">
                    BLOCK C
                  </span>
                </div>
                <p className="text-xs text-[#68736D] mt-0.5">Due: 1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#C65B4B]" />
              <ChevronRight className="w-4 h-4 text-[#68736D]" />
            </div>
          </div>

          {/* Task 2 */}
          <div
            onClick={() => toggleTask('task-2')}
            className="p-4 flex items-center justify-between hover:bg-[#F8FAF8] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  completedTasks['task-2']
                    ? 'bg-[#3F8F68] border-[#3F8F68] text-white'
                    : 'border-[#3F8F68] text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm font-bold ${
                      completedTasks['task-2']
                        ? 'line-through text-[#68736D]'
                        : 'text-[#17211D]'
                    }`}
                  >
                    Salinity Sample Check
                  </span>
                  <span className="text-[10px] font-bold text-[#925C29] bg-[#F5EBE1] px-2 py-0.5 rounded-full">
                    BLOCK A
                  </span>
                </div>
                <p className="text-xs text-[#68736D] mt-0.5">Due: 14:00 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#D6A84F]" />
              <ChevronRight className="w-4 h-4 text-[#68736D]" />
            </div>
          </div>

          {/* Task 3 */}
          <div
            onClick={() => toggleTask('task-3')}
            className="p-4 flex items-center justify-between hover:bg-[#F8FAF8] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  completedTasks['task-3']
                    ? 'bg-[#3F8F68] border-[#3F8F68] text-white'
                    : 'border-[#3F8F68] text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm font-bold ${
                      completedTasks['task-3']
                        ? 'line-through text-[#68736D]'
                        : 'text-[#17211D]'
                    }`}
                  >
                    Mulching Application
                  </span>
                  <span className="text-[10px] font-bold text-[#4C7894] bg-[#E8F0F5] px-2 py-0.5 rounded-full">
                    BLOCK B
                  </span>
                </div>
                <p className="text-xs text-[#68736D] mt-0.5">Due: Tomorrow</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#3F8F68]" />
              <ChevronRight className="w-4 h-4 text-[#68736D]" />
            </div>
          </div>
        </div>
      </div>

      {/* 6. Direct Ask Assistant Banner */}
      <div
        onClick={() => onNavigate('ask')}
        className="rounded-2xl bg-gradient-to-r from-[#163A32] to-[#2F6B55] p-4 sm:p-5 text-white flex items-center justify-between shadow-md cursor-pointer hover:shadow-lg transition-shadow group"
      >
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#D6A84F] text-[#163A32] flex items-center justify-center shadow-sm">
            <MessageSquareText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>Ask Kharaf AI Assistant</span>
              <span className="text-[10px] bg-[#D6A84F] text-[#163A32] px-2 py-0.5 rounded-full font-black">
                RAG ONLINE
              </span>
            </h3>
            <p className="text-xs text-[#E2EBE6] mt-0.5">
              Verified advice on pollination, salinity, and Saudi G.A.P standards.
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
          <ArrowRight className="w-4 h-4 text-[#D6A84F]" />
        </div>
      </div>
    </div>
  );
};
