import React from 'react';
import { X, GitBranch, Terminal, ShieldCheck, CheckCircle2, FileText, ExternalLink, Cpu } from 'lucide-react';

interface ExportInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportInfoModal: React.FC<ExportInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Kharaf AI Documentation & Export Guide</h2>
              <p className="text-xs text-emerald-300">
                Production-grade Full-Stack TypeScript / Express / Vite / React Project
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-800 text-xs sm:text-sm">
          {/* Overview */}
          <div className="space-y-2">
            <h3 className="font-bold text-stone-950 text-base flex items-center space-x-2">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Project Summary</span>
            </h3>
            <p className="text-stone-600 leading-relaxed">
              Kharaf AI is a complete, self-contained, full-stack decision-support system and Digital
              Twin for <strong>Barhee date palms in Saudi Arabia</strong>. It implements an
              authoritative 24-source Knowledge Base, a strict 7-rule grounding guardrail engine, an
              ITU-T Y.3172 pipeline, and a 12-test automated audit suite.
            </p>
          </div>

          {/* Environment Configuration */}
          <div className="space-y-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-stone-900 block text-xs uppercase tracking-wide">
              Environment Variables (.env)
            </span>
            <pre className="p-3 rounded-xl bg-stone-900 text-amber-300 font-mono text-xs overflow-x-auto">
{`# .env
GEMINI_API_KEY="your-gemini-api-key-here"
NODE_ENV="development"
PORT=3000`}
            </pre>
            <p className="text-stone-600 text-xs">
              *Note: If no Gemini API key is configured, the system operates seamlessly in high-precision
              Deterministic Grounded Synthesis fallback mode with zero hallucinations.
            </p>
          </div>

          {/* Quick Start Commands */}
          <div className="space-y-3">
            <span className="font-bold text-stone-900 block text-xs uppercase tracking-wide flex items-center space-x-1.5">
              <Terminal className="w-4 h-4 text-emerald-700" />
              <span>Running Locally / CLI Commands</span>
            </span>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-stone-900 text-stone-200 font-mono text-xs space-y-1">
                <span className="text-stone-400"># Install dependencies</span>
                <p className="text-emerald-400">npm install</p>
              </div>

              <div className="p-3 rounded-xl bg-stone-900 text-stone-200 font-mono text-xs space-y-1">
                <span className="text-stone-400"># Start full-stack dev server (Express + Vite on Port 3000)</span>
                <p className="text-emerald-400">npm run dev</p>
              </div>

              <div className="p-3 rounded-xl bg-stone-900 text-stone-200 font-mono text-xs space-y-1">
                <span className="text-stone-400"># Build production bundle</span>
                <p className="text-emerald-400">npm run build</p>
              </div>
            </div>
          </div>

          {/* GitHub Export Ready */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs space-y-2">
            <div className="flex items-center space-x-2 font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Export to GitHub Ready</span>
            </div>
            <p className="text-emerald-900 leading-relaxed">
              This repository is 100% compliant with standard Git and Node.js toolchains. You can
              safely export this workspace to a private or public GitHub repository via the AI Studio
              Settings menu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
