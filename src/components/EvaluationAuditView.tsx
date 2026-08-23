import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCw,
  FileCheck,
  ShieldCheck,
  Award,
  BookOpen,
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { EVALUATION_MATRIX } from '../data/evaluationMatrix';
import { EvaluationItem } from '../types';

export const EvaluationAuditView: React.FC = () => {
  const [evaluations, setEvaluations] = useState<EvaluationItem[]>(EVALUATION_MATRIX);
  const [isRunning, setIsRunning] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [filterDomain, setFilterDomain] = useState<string>('ALL');

  const runEvaluationSuite = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('/api/rag/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Evaluation API failed');
      const data = await response.json();
      if (data.matrix) {
        setEvaluations(data.matrix);
      }
    } catch (err) {
      console.error('Error running evaluation:', err);
    } finally {
      setIsRunning(false);
    }
  };

  const domains = ['ALL', ...Array.from(new Set(EVALUATION_MATRIX.map((e) => e.domain)))];

  const filteredEvals = evaluations.filter((e) => {
    if (filterDomain !== 'ALL' && e.domain !== filterDomain) return false;
    return true;
  });

  const passedTests = evaluations.filter((e) => e.lastRunResult?.answerStatus === 'PASS').length;
  const testedCount = evaluations.filter((e) => e.lastRunResult !== undefined).length;

  return (
    <div id="view-evaluation-audit" className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#F0FDF4] text-[#059669] border border-[#BBF7D0]">
              AUDIT & VERIFICATION MATRIX
            </span>
            <span className="text-xs text-[#64748B]">12 Rigorous Benchmark Test Cases</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1E293B] mt-1">
            RAG Evaluation & Guardrails Audit Suite
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Empirical validation testing retrieval accuracy, citation fidelity, hard constraint
            adherence, and zero-hallucination abstention.
          </p>
        </div>

        <button
          id="btn-run-all-eval"
          onClick={runEvaluationSuite}
          disabled={isRunning}
          className="px-5 py-2.5 rounded-lg bg-[#0B2C24] hover:opacity-90 text-[#C5E063] font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <RotateCw className="w-4 h-4 animate-spin text-[#C5E063]" />
              <span>Running 12 Benchmarks...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-[#C5E063] fill-current" />
              <span>Execute Full Evaluation Suite</span>
            </>
          )}
        </button>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">Total Benchmarks</span>
            <span className="text-2xl font-bold text-[#1E293B]">{evaluations.length} Tests</span>
          </div>
          <Award className="w-7 h-7 text-[#94A3B8]" />
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">Tests Executed</span>
            <span className="text-2xl font-bold text-[#059669]">
              {testedCount} / {evaluations.length}
            </span>
          </div>
          <FileCheck className="w-7 h-7 text-[#059669]" />
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">Pass Rate</span>
            <span className="text-2xl font-bold text-[#0B2C24]">
              {testedCount > 0 ? `${((passedTests / testedCount) * 100).toFixed(0)}%` : 'Ready to Run'}
            </span>
          </div>
          <CheckCircle2 className="w-7 h-7 text-[#059669]" />
        </div>
      </div>

      {/* Domain Filter Bar */}
      <div className="bg-white rounded-xl p-3 border border-[#E2E8F0] shadow-sm flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-[#64748B] mr-2 flex items-center space-x-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter Domain:</span>
        </span>
        {domains.map((dom) => (
          <button
            key={dom}
            onClick={() => setFilterDomain(dom)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filterDomain === dom
                ? 'bg-[#0B2C24] text-[#C5E063] font-bold'
                : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
            }`}
          >
            {dom}
          </button>
        ))}
      </div>

      {/* Evaluation Items List */}
      <div className="space-y-3">
        {filteredEvals.map((item) => {
          const isExpanded = expandedItem === item.questionId;
          const result = item.lastRunResult;

          return (
            <div
              key={item.questionId}
              id={`eval-item-${item.questionId}`}
              className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm transition-all overflow-hidden"
            >
              {/* Card Header Row */}
              <div
                onClick={() => setExpandedItem(isExpanded ? null : item.questionId)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-[#F8FAFC]"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#0B2C24] text-[#C5E063] font-mono font-bold text-xs">
                      {item.questionId}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] font-medium border border-[#E2E8F0]">
                      {item.domain}
                    </span>
                    {item.hardConstraintRelevant && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#FFE4E6] text-[#9F1239] font-semibold border border-[#FECDD3]">
                        Hard Constraint Audit
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-[#1E293B] text-xs sm:text-sm leading-snug">
                    {item.question}
                  </h3>
                </div>

                {/* Status Badges */}
                <div className="flex items-center space-x-3 self-end sm:self-center">
                  {result ? (
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          result.answerStatus === 'PASS'
                            ? 'bg-[#F0FDF4] text-[#059669] border border-[#BBF7D0]'
                            : result.answerStatus === 'NEEDS REVIEW'
                            ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                            : 'bg-[#FFE4E6] text-[#9F1239] border border-[#FECDD3]'
                        }`}
                      >
                        {result.answerStatus === 'PASS' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-[#B45309]" />
                        )}
                        <span>{result.answerStatus}</span>
                      </span>
                    </div>
                  ) : (
                    <span className="text-[11px] px-2.5 py-1 rounded bg-[#F8FAFC] text-[#94A3B8] font-mono border border-[#E2E8F0]">
                      Not Tested Yet
                    </span>
                  )}

                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#94A3B8]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                  )}
                </div>
              </div>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-[#F1F5F9] bg-[#F8FAFC] space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                    {/* Expected Benchmarks */}
                    <div className="p-3.5 rounded-lg bg-white border border-[#E2E8F0] space-y-1.5">
                      <span className="font-bold text-[#1E293B] uppercase tracking-wider text-[11px] block">
                        Expected Benchmark Standard:
                      </span>
                      <p className="text-[#475569]">{item.notes}</p>
                      <div className="pt-1 flex items-center space-x-2 font-mono text-[#64748B]">
                        <span>Expected Sources:</span>
                        <strong className="text-[#059669]">
                          {item.expectedSourceIds.join(', ') || 'None (Abstention expected)'}
                        </strong>
                      </div>
                    </div>

                    {/* Actual Run Result */}
                    <div className="p-3.5 rounded-lg bg-white border border-[#E2E8F0] space-y-1.5">
                      <span className="font-bold text-[#1E293B] uppercase tracking-wider text-[11px] block">
                        Live Retrieval Audit Result:
                      </span>
                      {result ? (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span>Citation Match:</span>
                            <span
                              className={`font-bold font-mono ${
                                result.citationStatus === 'PASS'
                                  ? 'text-[#059669]'
                                  : 'text-[#B45309]'
                              }`}
                            >
                              {result.citationStatus}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Decision Status:</span>
                            <span className="font-medium text-[#1E293B]">
                              {result.decisionStatus}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Constraint Guardrail:</span>
                            <span className="font-mono text-[#1E293B]">
                              {result.constraintCompliance}
                            </span>
                          </div>
                          <div className="pt-1 text-[#64748B]">
                            <strong>Retrieved:</strong>{' '}
                            {result.retrievedKbIds.join(', ') || 'Zero sources (Abstained)'}
                          </div>
                        </div>
                      ) : (
                        <p className="text-[#94A3B8] italic">
                          Click "Execute Full Evaluation Suite" to run this benchmark against the live
                          pipeline.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Summary of Generated Answer */}
                  {result && (
                    <div className="p-3.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] space-y-1">
                      <span className="font-bold text-[#166534] uppercase tracking-wider text-[11px] block">
                        Generated Grounded Answer Summary:
                      </span>
                      <p className="text-[#334155] text-xs leading-relaxed font-sans">{result.summary}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
