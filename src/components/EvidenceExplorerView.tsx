import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Tag,
  CheckCircle2,
  X
} from 'lucide-react';
import { KB_RECORDS, KB_CHUNKS } from '../data/knowledgeBase';
import { KBRecord, KBChunk } from '../types';

interface EvidenceExplorerProps {
  initialKbId?: string | null;
}

export const EvidenceExplorerView: React.FC<EvidenceExplorerProps> = ({ initialKbId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthority, setSelectedAuthority] = useState<string>('ALL');
  const [selectedCultivar, setSelectedCultivar] = useState<string>('ALL');
  const [onlyHardConstraints, setOnlyHardConstraints] = useState(false);
  const [activeKb, setActiveKb] = useState<KBRecord | null>(() => {
    if (initialKbId) {
      return KB_RECORDS.find((k) => k.kbId === initialKbId) || KB_RECORDS[0];
    }
    return KB_RECORDS[0];
  });

  const authorities = useMemo(() => {
    const set = new Set<string>();
    KB_RECORDS.forEach((k) => set.add(k.authority.split('/')[0].trim()));
    return ['ALL', ...Array.from(set)];
  }, []);

  const cultivars = ['ALL', 'Barhee', 'Khalas', 'Nabbut-Saif', 'General / Multi-Cultivar', 'None / Non-Botanical'];

  const filteredKbs = useMemo(() => {
    return KB_RECORDS.filter((kb) => {
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTerm =
          kb.kbId.toLowerCase().includes(term) ||
          kb.title.toLowerCase().includes(term) ||
          kb.authority.toLowerCase().includes(term) ||
          kb.topic.toLowerCase().includes(term) ||
          kb.contribution.toLowerCase().includes(term) ||
          kb.supportedQuestion.toLowerCase().includes(term);
        if (!matchesTerm) return false;
      }

      // Authority filter
      if (selectedAuthority !== 'ALL') {
        if (!kb.authority.toLowerCase().includes(selectedAuthority.toLowerCase())) return false;
      }

      // Cultivar filter
      if (selectedCultivar !== 'ALL') {
        if (kb.cultivarScope !== selectedCultivar) return false;
      }

      // Hard constraint filter
      if (onlyHardConstraints) {
        if (!kb.hardConstraint) return false;
      }

      return true;
    });
  }, [searchTerm, selectedAuthority, selectedCultivar, onlyHardConstraints]);

  const activeChunks = useMemo(() => {
    if (!activeKb) return [];
    return KB_CHUNKS.filter((c) => c.kbId === activeKb.kbId);
  }, [activeKb]);

  return (
    <div id="view-evidence-explorer" className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#F0FDF4] text-[#059669] border border-[#BBF7D0]">
              AUDITED REGISTRY
            </span>
            <span className="text-xs text-[#64748B]">24 Authoritative KB Sources | Chunk Register</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1E293B] mt-1">Knowledge Base & Evidence Explorer</h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Browse verified agricultural research, statutory regulations, standards, and technical reports.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="px-3 py-2 rounded-lg bg-[#F0FDF4] text-[#059669] border border-[#BBF7D0]">
            <span className="font-bold">{KB_RECORDS.length}</span> Ingested Sources
          </div>
          <div className="px-3 py-2 rounded-lg bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
            <span className="font-bold">{KB_CHUNKS.length}</span> Verified Chunks
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by KB ID, title, keyword (e.g. KB-016, Penman, pollination, PDPL, harvest)..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#CBD5E1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2C24]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedAuthority}
              onChange={(e) => setSelectedAuthority(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-[#F8FAFC] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0B2C24]"
            >
              <option value="ALL">All Authorities</option>
              {authorities.filter((a) => a !== 'ALL').map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>

            <select
              value={selectedCultivar}
              onChange={(e) => setSelectedCultivar(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-[#F8FAFC] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0B2C24]"
            >
              <option value="ALL">All Cultivars / Scopes</option>
              {cultivars.filter((c) => c !== 'ALL').map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="flex items-center space-x-1.5 px-3 py-2 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs text-[#334155] cursor-pointer hover:bg-[#F1F5F9]">
              <input
                type="checkbox"
                checked={onlyHardConstraints}
                onChange={(e) => setOnlyHardConstraints(e.target.checked)}
                className="rounded text-[#059669] focus:ring-[#059669]"
              />
              <span>Hard Constraints Only</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#64748B] pt-1">
          <span>
            Showing <strong>{filteredKbs.length}</strong> of {KB_RECORDS.length} sources
          </span>
          {(searchTerm || selectedAuthority !== 'ALL' || selectedCultivar !== 'ALL' || onlyHardConstraints) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedAuthority('ALL');
                setSelectedCultivar('ALL');
                setOnlyHardConstraints(false);
              }}
              className="text-[#059669] hover:text-[#047857] font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Source List (Left) + Detailed Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Source List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
          {filteredKbs.map((kb) => {
            const isSelected = activeKb?.kbId === kb.kbId;
            return (
              <div
                key={kb.kbId}
                id={`kb-item-${kb.kbId}`}
                onClick={() => setActiveKb(kb)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#F0FDF4] border-[#059669] ring-1 ring-[#059669]/20 shadow-sm'
                    : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-[#0B2C24] text-[#C5E063]">
                      {kb.kbId}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                      {kb.type}
                    </span>
                  </div>
                  {kb.hardConstraint && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FFE4E6] text-[#9F1239] border border-[#FECDD3]">
                      Hard Constraint
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-[#1E293B] text-xs sm:text-sm mt-2 line-clamp-2 leading-snug">
                  {kb.title}
                </h3>

                <div className="flex items-center space-x-2 text-xs text-[#64748B] mt-2">
                  <span className="truncate">{kb.authority}</span>
                  <span>•</span>
                  <span className="text-[#059669] font-medium whitespace-nowrap">{kb.cultivarScope}</span>
                </div>

                <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2 leading-relaxed">
                  {kb.contribution}
                </p>
              </div>
            );
          })}

          {filteredKbs.length === 0 && (
            <div className="p-8 text-center bg-white rounded-xl border border-[#E2E8F0] text-[#64748B] text-xs">
              No Knowledge Base sources match your filter criteria.
            </div>
          )}
        </div>

        {/* Right Column: Detailed Inspector */}
        <div className="lg:col-span-7">
          {activeKb ? (
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#E2E8F0] shadow-sm space-y-5 sticky top-32">
              {/* Header */}
              <div className="space-y-2 pb-4 border-b border-[#F1F5F9]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#0B2C24] text-[#C5E063] font-mono font-bold text-xs">
                      {activeKb.kbId}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#F0FDF4] text-[#059669] text-xs font-semibold border border-[#BBF7D0]">
                      {activeKb.category}
                    </span>
                  </div>

                  <span className="text-xs px-2.5 py-1 rounded bg-[#F8FAFC] text-[#475569] font-medium border border-[#E2E8F0]">
                    Priority: {activeKb.priority}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[#1E293B] leading-tight">{activeKb.title}</h2>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#64748B]">
                  <span>
                    Authority: <strong className="text-[#1E293B]">{activeKb.authority}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Scope: <strong className="text-[#059669]">{activeKb.cultivarScope}</strong>
                  </span>
                  <span>•</span>
                  <span>Geographic: {activeKb.geographicScope}</span>
                </div>
              </div>

              {/* Core Contribution & Supported Question */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                    Contribution to Kharaf AI
                  </span>
                  <p className="text-xs text-[#334155] leading-relaxed">
                    {activeKb.contribution}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] space-y-1">
                  <span className="text-[11px] font-bold text-[#166534] uppercase tracking-wider">
                    Supported Question in Architecture
                  </span>
                  <p className="text-xs text-[#166534] font-medium leading-relaxed">
                    "{activeKb.supportedQuestion}"
                  </p>
                </div>
              </div>

              {/* Scope Caveats & Hard Constraints */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] text-xs space-y-1 text-[#92400E]">
                  <div className="flex items-center space-x-1.5 font-bold text-[#78350F]">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>Scope & Caveats</span>
                  </div>
                  <p className="leading-relaxed text-[11px]">{activeKb.caveats}</p>
                </div>

                {activeKb.doNotInferRestrictions.length > 0 && (
                  <div className="p-3.5 rounded-lg bg-[#FFE4E6] border border-[#FECDD3] text-xs space-y-1.5 text-[#9F1239]">
                    <div className="flex items-center space-x-1.5 font-bold text-[#881337]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#BE123C]" />
                      <span>Explicit "Do Not Infer" Restrictions</span>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-[#9F1239] text-[11px]">
                      {activeKb.doNotInferRestrictions.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Granular Semantic Chunks in Chunk_Register */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#475569] flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#059669]" />
                    <span>Audited Semantic Chunks ({activeChunks.length})</span>
                  </h4>
                  <span className="text-[11px] text-[#94A3B8] font-mono">Chunk_Register</span>
                </div>

                {activeChunks.map((chunk) => (
                  <div
                    key={chunk.chkId}
                    id={`chunk-item-${chunk.chkId}`}
                    className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-[#0B2C24] text-[#C5E063] font-mono font-bold text-[10px]">
                        {chunk.chkId}
                      </span>
                      <span className="text-[#64748B] italic text-[11px]">{chunk.section}</span>
                    </div>

                    <p className="text-[#334155] text-xs leading-relaxed font-sans">{chunk.content}</p>

                    <div className="space-y-1 pt-1">
                      <span className="font-semibold text-[#475569] block text-[11px]">Verified Claims:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-[#64748B] text-[11px]">
                        {chunk.claims.map((claim, cIdx) => (
                          <li key={cIdx}>{claim}</li>
                        ))}
                      </ul>
                    </div>

                    {chunk.mlFeatureRelevance && (
                      <div className="p-2 rounded bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-[10px]">
                        <strong className="text-[#78350F]">ML Feature Relevance:</strong> {chunk.mlFeatureRelevance}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Source Link */}
              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
                <span>Kharaf Component: {activeKb.kharafComponent}</span>
                <a
                  href={activeKb.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#059669] hover:text-[#047857] font-semibold inline-flex items-center space-x-1"
                >
                  <span>Authoritative Reference</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-xl border border-[#E2E8F0] text-[#94A3B8]">
              Select a Knowledge Base source from the left panel to inspect its evidence and constraints.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
