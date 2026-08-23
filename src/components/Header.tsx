import React from 'react';
import {
  Sprout,
  Bell,
  Sparkles,
  User,
  ShieldCheck,
  Layers,
  Info
} from 'lucide-react';
import { TabType } from './Navigation';

interface HeaderProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  onOpenArchitecture: () => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onOpenArchitecture,
  onOpenExport
}) => {
  return (
    <header className="w-full bg-[#163A32] border-b border-[#ffffff15] text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#D6A84F] text-[#163A32] flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6 text-[#163A32]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-black tracking-tight text-white font-sans">
                KHARAF AI
              </span>
              <span className="text-sm font-medium text-[#D6A84F]">
                خَرَاف
              </span>
            </div>
            <div className="text-[11px] text-[#A3B8AE] font-medium hidden sm:block">
              Barhee Palm Decision Support • Al-Ahsa Oasis
            </div>
          </div>
        </div>

        {/* Right Side: Farm Manager Profile & Quick Badges */}
        <div className="flex items-center space-x-3">
          {/* Notification Alert Bell with badge '3' like prototype */}
          <button
            onClick={() => onNavigate('weather')}
            title="Active Field Alerts"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors relative cursor-pointer shadow-sm"
          >
            <Bell className="w-4 h-4" />
            <span className="w-4 h-4 rounded-full bg-[#C65B4B] text-[10px] font-bold text-white flex items-center justify-center absolute -top-1 -right-1 ring-2 ring-[#163A32]">
              3
            </span>
          </button>

          {/* Farm Manager Profile Pill */}
          <div
            onClick={() => onNavigate('more')}
            className="flex items-center space-x-2.5 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full border border-white/15 cursor-pointer transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#D6A84F] text-[#163A32] font-black text-xs flex items-center justify-center shadow-sm">
              SA
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-white leading-none">
                Salem Al-Rashed
              </div>
              <div className="text-[10px] text-[#A3B8AE] leading-tight mt-0.5">
                Al-Nakheel Farm
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

