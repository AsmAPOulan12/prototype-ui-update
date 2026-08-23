import React from 'react';
import {
  Home,
  MapPin,
  MessageSquareText,
  CloudSun,
  Settings,
  Sparkles
} from 'lucide-react';

export type TabType = 'home' | 'mypalm' | 'ask' | 'weather' | 'more';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: 'Home',
      icon: Home
    },
    {
      id: 'mypalm' as TabType,
      label: 'Map View',
      icon: MapPin
    },
    {
      id: 'ask' as TabType,
      label: 'AI Chatbot',
      icon: MessageSquareText,
      highlight: true
    },
    {
      id: 'weather' as TabType,
      label: 'Weather',
      icon: CloudSun
    },
    {
      id: 'more' as TabType,
      label: 'Settings',
      icon: Settings
    }
  ];

  return (
    <>
      {/* Desktop & Tablet Top Navigation Bar */}
      <nav className="hidden md:flex items-center space-x-2 bg-[#163A32] p-1.5 rounded-2xl border border-[#ffffff15] shadow-lg max-w-2xl mx-auto mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                isActive
                  ? 'bg-[#D6A84F] text-[#163A32] shadow-sm'
                  : 'text-[#E2EBE6] hover:bg-[#ffffff15] hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#163A32]' : 'text-[#A3B8AE]'}`} />
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Bottom Navigation Bar (App Experience matching prototype) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E6ECE8] px-2 py-2 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`mobile-nav-tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#163A32] font-bold'
                  : 'text-[#68736D] hover:text-[#163A32]'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-colors ${
                  isActive ? 'bg-[#EAF3EE] text-[#163A32]' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#163A32]' : 'text-[#68736D]'}`} />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

