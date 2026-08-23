import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { MyPalmView } from './components/MyPalmView';
import { AskKharafView } from './components/AskKharafView';
import { WeatherInsightsView } from './components/WeatherInsightsView';
import { MoreHubView } from './components/MoreHubView';
import { ArchitectureModal } from './components/ArchitectureModal';
import { ExportInfoModal } from './components/ExportInfoModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedPalmId, setSelectedPalmId] = useState<string>('BH-0472');
  const [askKharafInitialPrompt, setAskKharafInitialPrompt] = useState<string>('');
  const [moreInitialKbId, setMoreInitialKbId] = useState<string | null>(null);

  const [isArchModalOpen, setIsArchModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleNavigate = (tab: TabType, palmId?: string) => {
    if (palmId) {
      setSelectedPalmId(palmId);
    }
    setActiveTab(tab);
  };

  const handleAskAboutPalm = (question: string) => {
    setAskKharafInitialPrompt(question);
    setActiveTab('ask');
  };

  const handleNavigateToExplorer = (kbId?: string) => {
    if (kbId) {
      setMoreInitialKbId(kbId);
    }
    setActiveTab('more');
  };

  return (
    <div id="kharaf-app" className="min-h-screen bg-[#F4F7F5] text-[#1A1C1E] flex flex-col font-sans antialiased">
      {/* 1. Welcoming Header */}
      <Header
        activeTab={activeTab}
        onNavigate={setActiveTab}
        onOpenArchitecture={() => setIsArchModalOpen(true)}
        onOpenExport={() => setIsExportModalOpen(true)}
      />

      {/* 2. Main Page Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs (Top for Desktop, Bottom for Mobile) */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 3. Dynamic Views */}
        <main className="mt-2">
          {activeTab === 'home' && (
            <HomeView
              onNavigate={handleNavigate}
              onOpenArchitecture={() => setIsArchModalOpen(true)}
            />
          )}

          {activeTab === 'mypalm' && (
            <MyPalmView
              initialPalmId={selectedPalmId}
              onAskAboutPalm={handleAskAboutPalm}
            />
          )}

          {activeTab === 'ask' && (
            <AskKharafView
              key={askKharafInitialPrompt || 'default-chat'}
              initialQuery={askKharafInitialPrompt}
              onNavigateToExplorer={handleNavigateToExplorer}
            />
          )}

          {activeTab === 'weather' && (
            <WeatherInsightsView onAskAboutWeather={handleAskAboutPalm} />
          )}

          {activeTab === 'more' && (
            <MoreHubView
              initialKbId={moreInitialKbId}
              onOpenArchitectureModal={() => setIsArchModalOpen(true)}
              onOpenExportModal={() => setIsExportModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* 4. Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] py-6 text-xs text-[#64748B] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[#0B2C24]">KHARAF AI (خَرَاف)</span>
            <span>•</span>
            <span>Agricultural Decision Support for Barhee Date Palms</span>
            <span>•</span>
            <span className="text-[#059669] font-medium">Saudi Arabia</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsArchModalOpen(true)}
              className="hover:text-[#0B2C24] font-medium cursor-pointer transition-colors"
            >
              ITU-T Y.3172 Architecture
            </button>
            <span>•</span>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="hover:text-[#0B2C24] font-medium cursor-pointer transition-colors"
            >
              Export & System Details
            </button>
          </div>
        </div>
      </footer>

      {/* 5. System Blueprints & Export Modals */}
      <ArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />

      <ExportInfoModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};

export default App;
