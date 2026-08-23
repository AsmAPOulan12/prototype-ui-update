import React, { useState } from 'react';
import {
  BookOpenCheck,
  Layers,
  CheckCircle2,
  Settings,
  ShieldCheck,
  Database,
  ExternalLink,
  Info,
  User,
  MapPin,
  Phone,
  Mail,
  Building,
  Save,
  Check,
  HelpCircle,
  FileText
} from 'lucide-react';
import { EvidenceExplorerView } from './EvidenceExplorerView';
import { EvaluationAuditView } from './EvaluationAuditView';
import { ArchitectureModal } from './ArchitectureModal';

type MoreSubTab = 'sources' | 'evaluation' | 'architecture' | 'profile';

interface MoreHubViewProps {
  initialSubTab?: MoreSubTab;
  initialKbId?: string | null;
  onOpenArchitectureModal: () => void;
  onOpenExportModal: () => void;
}

export const MoreHubView: React.FC<MoreHubViewProps> = ({
  initialSubTab = 'sources',
  initialKbId,
  onOpenArchitectureModal,
  onOpenExportModal
}) => {
  const [activeSubTab, setActiveSubTab] = useState<MoreSubTab>(initialSubTab);
  const [profileSaved, setProfileSaved] = useState(false);

  // Farm manager profile state
  const [profile, setProfile] = useState({
    name: 'Salem Al-Rashed',
    role: 'Farm Manager',
    email: 'salem.alrashed@farm.com',
    phone: '+966 50 123 4567',
    farmName: 'Al-Nakheel Heritage Farm',
    region: 'Al-Ahsa Oasis, Eastern Province'
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  return (
    <div id="view-more-hub" className="max-w-4xl mx-auto space-y-5 pb-12">
      {/* 1. Sub-navigation Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6ECE8] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F5F3]">
          <div>
            <h1 className="text-lg font-black text-[#17211D]">Settings & System Transparency</h1>
            <p className="text-xs text-[#68736D]">
              Audited Knowledge Base sources, benchmark evaluation suite, architecture blueprints, and farm settings
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenExportModal}
              className="text-xs text-[#68736D] hover:text-[#163A32] bg-[#F8FAF8] hover:bg-[#EAF3EE] border border-[#E6ECE8] px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <Info className="w-3.5 h-3.5 text-[#2F6B55]" />
              <span>Project & Export</span>
            </button>
          </div>
        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="flex space-x-2 overflow-x-auto pt-3 scrollbar-none">
          <button
            onClick={() => setActiveSubTab('sources')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-2 ${
              activeSubTab === 'sources'
                ? 'bg-[#163A32] text-[#D6A84F] shadow-sm'
                : 'text-[#68736D] hover:bg-[#F8FAF8] hover:text-[#17211D]'
            }`}
          >
            <BookOpenCheck className="w-4 h-4" />
            <span>Sources & Evidence</span>
          </button>

          <button
            onClick={() => setActiveSubTab('evaluation')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-2 ${
              activeSubTab === 'evaluation'
                ? 'bg-[#163A32] text-[#D6A84F] shadow-sm'
                : 'text-[#68736D] hover:bg-[#F8FAF8] hover:text-[#17211D]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Benchmark Evaluation</span>
          </button>

          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-2 ${
              activeSubTab === 'architecture'
                ? 'bg-[#163A32] text-[#D6A84F] shadow-sm'
                : 'text-[#68736D] hover:bg-[#F8FAF8] hover:text-[#17211D]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>ITU-T Y.3172 Architecture</span>
          </button>

          <button
            onClick={() => setActiveSubTab('profile')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-2 ${
              activeSubTab === 'profile'
                ? 'bg-[#163A32] text-[#D6A84F] shadow-sm'
                : 'text-[#68736D] hover:bg-[#F8FAF8] hover:text-[#17211D]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Farm Profile & Settings</span>
          </button>
        </div>
      </div>

      {/* 2. Sub-Tab Content Views */}

      {/* A. Sources & Evidence Explorer */}
      {activeSubTab === 'sources' && (
        <div>
          <EvidenceExplorerView initialKbId={initialKbId} />
        </div>
      )}

      {/* B. Benchmark Evaluation Suite */}
      {activeSubTab === 'evaluation' && (
        <div>
          <EvaluationAuditView />
        </div>
      )}

      {/* C. System Architecture & Blueprint */}
      {activeSubTab === 'architecture' && (
        <div className="bg-white rounded-2xl border border-[#E6ECE8] p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F5F3]">
            <div>
              <span className="text-[10px] font-bold font-mono text-[#2F6B55] bg-[#EAF3EE] px-2.5 py-0.5 rounded-full border border-[#2F6B55]/30">
                ITU-T STANDARDIZATION
              </span>
              <h2 className="text-base font-black text-[#17211D] mt-1">
                ITU-T Recommendation Y.3172 & Policy Integration
              </h2>
              <p className="text-xs text-[#68736D] mt-0.5">
                Standardized architectural framework for machine learning in future networks and agricultural cyber-physical digital twins.
              </p>
            </div>

            <button
              onClick={onOpenArchitectureModal}
              className="px-4 py-2 rounded-xl bg-[#163A32] hover:bg-[#2F6B55] text-[#D6A84F] font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center space-x-2 flex-shrink-0"
            >
              <Layers className="w-4 h-4 text-[#D6A84F]" />
              <span>Open Blueprint Modal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-[#F8FAF8] border border-[#E6ECE8] space-y-1.5">
              <h3 className="font-bold text-xs text-[#17211D]">7 Logical Pipeline Nodes</h3>
              <p className="text-xs text-[#68736D] leading-relaxed">
                Kharaf AI strictly separates ingestion (SRC, C), preprocessing (PP), intelligence (M), regulatory compliance (P), distribution (D), and user delivery (SINK).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAF8] border border-[#E6ECE8] space-y-1.5">
              <h3 className="font-bold text-xs text-[#17211D]">Policy Node P Compliance</h3>
              <p className="text-xs text-[#68736D] leading-relaxed">
                Node P acts as a strict guardrail before outputs reach the farmer, verifying MEWA Article 12, Saudi G.A.P CP5.1.1 24-month irrigation records, and PDPL data rights.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* D. Farm Profile & Account Settings */}
      {activeSubTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-[#E6ECE8] p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex items-center space-x-3.5 pb-4 border-b border-[#F1F5F3]">
            <div className="w-14 h-14 rounded-full bg-[#163A32] text-[#D6A84F] flex items-center justify-center font-black text-lg shadow-sm">
              SA
            </div>
            <div>
              <h2 className="text-base font-black text-[#17211D]">{profile.name}</h2>
              <p className="text-xs text-[#68736D]">{profile.role} • {profile.farmName}</p>
              <p className="text-xs text-[#2F6B55] font-semibold mt-0.5">{profile.region}</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#17211D] block mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E6ECE8] focus:outline-none focus:ring-2 focus:ring-[#163A32]"
                />
              </div>

              <div>
                <label className="font-bold text-[#17211D] block mb-1">Farm / Property Name</label>
                <input
                  type="text"
                  value={profile.farmName}
                  onChange={(e) => setProfile({ ...profile, farmName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E6ECE8] focus:outline-none focus:ring-2 focus:ring-[#163A32]"
                />
              </div>

              <div>
                <label className="font-bold text-[#17211D] block mb-1">Contact Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E6ECE8] focus:outline-none focus:ring-2 focus:ring-[#163A32]"
                />
              </div>

              <div>
                <label className="font-bold text-[#17211D] block mb-1">Phone Number (SMS Alerts)</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E6ECE8] focus:outline-none focus:ring-2 focus:ring-[#163A32]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#163A32] hover:bg-[#2F6B55] text-white font-bold text-xs transition-colors cursor-pointer flex items-center space-x-2"
              >
                <Save className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>Save Profile Changes</span>
              </button>

              {profileSaved && (
                <span className="text-xs font-bold text-[#3F8F68] flex items-center space-x-1 animate-in fade-in">
                  <Check className="w-4 h-4" />
                  <span>Profile updated successfully</span>
                </span>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
