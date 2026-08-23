import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Sparkles,
  Send,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ArrowRight,
  User,
  Bot,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  Info,
  HelpCircle,
  Paperclip,
  RotateCcw,
  Sprout,
  Check
} from 'lucide-react';
import { GroundedRAGResponse, DecisionStatus } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  queryText?: string;
  ragResult?: GroundedRAGResponse;
  text?: string;
  isError?: boolean;
}

interface AskKharafViewProps {
  initialQuery?: string;
  onNavigateToExplorer?: (kbId?: string) => void;
}

export const AskKharafView: React.FC<AskKharafViewProps> = ({
  initialQuery = '',
  onNavigateToExplorer
}) => {
  const [queryInput, setQueryInput] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [expandedEvidenceIds, setExpandedEvidenceIds] = useState<Record<string, boolean>>({});
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Chat message history initialized with conversation matching prototype
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      timestamp: '12:00 PM',
      text: 'Hello Salem! How can I help with your farm today?'
    },
    {
      id: 'msg-demo-user-1',
      sender: 'user',
      timestamp: '12:01 PM',
      text: 'What should I do about the dry soil in Block C?'
    },
    {
      id: 'msg-demo-asst-1',
      sender: 'assistant',
      timestamp: '12:01 PM',
      text: 'Based on current conditions and Saudi G.A.P irrigation guidelines, I recommend increasing irrigation for Block C by 15%. The soil moisture has dropped below optimal levels (34%) due to the heatwave.',
      ragResult: {
        query: 'What should I do about the dry soil in Block C?',
        classification: {
          intent: 'Irrigation Guidance',
          targetDomain: 'Irrigation & Water',
          cultivarDetected: 'Barhee',
          isBarheeSpecific: true,
          requiresHardConstraintCheck: true
        },
        decisionStatus: 'Supported by evidence',
        plainSummary: 'Soil moisture in Block C is currently 34%, triggering a dry soil alert. Increase localized irrigation by 15% during early morning or nighttime hours.',
        whatThisMeans: 'High summer temperatures accelerate evapotranspiration in Al-Ahsa. Deep rooting date palms require sustained soil water without creating stagnant pooling that spikes salinity.',
        thingsToConsider: [
          'Irrigate between 04:00 AM and 07:00 AM to minimize evaporative loss.',
          'Verify that drip emitters in Row 7 are free from mineral salt blockages.'
        ],
        recommendedNextStep: 'Execute manual irrigation cycle override for Block C (duration: 45 minutes).',
        userFriendlyStatus: 'Decision Ready • Grounded in Agricultural Standards',
        answer: 'Increase localized drip irrigation volume by 15% for Block C palms. Soil telemetry indicates root-zone moisture has declined to 34%. Maintain regular moisture logs in compliance with Saudi G.A.P standard SGAP-IRR-04.',
        evidenceUsed: [
          {
            sourceTitle: 'Saudi G.A.P Irrigation & Water Management Protocols',
            kbId: 'KB-SGAP-01',
            chkId: 'CHK-IRR-02',
            authority: 'MEWA / Saudi G.A.P',
            evidenceType: 'Standard',
            scopeCaveat: 'General Saudi G.A.P commercial farm requirement',
            hardConstraint: true,
            relevance: 'direct'
          },
          {
            sourceTitle: 'Al-Ahsa Oasis Date Palm Irrigation Guidelines',
            kbId: 'KB-AHS-01',
            chkId: 'CHK-AHS-07',
            authority: 'Agricultural Research Center',
            evidenceType: 'Guideline',
            scopeCaveat: 'Al-Ahsa Oasis conditions',
            hardConstraint: false,
            relevance: 'direct'
          }
        ],
        constraintsApplied: [
          {
            rule: 'Saudi G.A.P Water Log Keeping',
            description: 'Record all water volumes applied per tree block.',
            status: 'COMPLIANT'
          }
        ],
        isAbstention: false,
        executionTimeMs: 420,
        engineUsed: 'Deterministic Grounded Engine (Kharaf Fallback)'
      }
    }
  ]);

  const samplePrompts = [
    'IRRIGATION SCHEDULE',
    'HARVEST FORECAST',
    'SOIL REPORT',
    'POLLINATION WINDOW',
    'BARHEE MATURITY',
    'SAUDI G.A.P LOGS'
  ];

  const promptQueries: Record<string, string> = {
    'IRRIGATION SCHEDULE': 'How much water do mature date palms need in summer under Saudi weather conditions?',
    'HARVEST FORECAST': 'At which maturity stage should Barhee dates be harvested, and how do I verify readiness?',
    'SOIL REPORT': 'What are the recommended salinity thresholds and soil management practices for Barhee palms?',
    'POLLINATION WINDOW': 'When should I check this Barhee palm for pollination and what is the optimal timing?',
    'BARHEE MATURITY': 'What is the exact Brix level and visual color standard for the Barhee Khalal harvest stage?',
    'SAUDI G.A.P LOGS': 'What does Saudi G.A.P require regarding calculating water requirements and keeping logs?'
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsgId = `user-${Date.now()}`;
    const assistantMsgId = `asst-${Date.now()}`;

    // Add user message
    const newMessages: Message[] = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: textToSend
      }
    ];

    setMessages(newMessages);
    setQueryInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/rag/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSend })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data: GroundedRAGResponse = await response.json();

      setMessages([
        ...newMessages,
        {
          id: assistantMsgId,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          queryText: textToSend,
          ragResult: data
        }
      ]);
    } catch (err: any) {
      console.error('RAG query error:', err);
      setMessages([
        ...newMessages,
        {
          id: assistantMsgId,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'I encountered an issue reaching the decision engine. Please try asking again.',
          isError: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleEvidence = (msgId: string) => {
    setExpandedEvidenceIds((prev) => ({
      ...prev,
      [msgId]: !prev[msgId]
    }));
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'assistant',
        timestamp: '12:00 PM',
        text: 'Hello Salem! How can I help with your farm today?'
      }
    ]);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div id="view-ask-kharaf" className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)] min-h-[580px] pb-12">
      {/* 1. Header Bar (matching prototype screen 3) */}
      <div className="bg-white rounded-2xl border border-[#E6ECE8] px-4 py-3 shadow-xs flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#163A32] text-[#D6A84F] flex items-center justify-center shadow-sm">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-black text-[#17211D] flex items-center space-x-2">
              <span>Farm Assistant</span>
            </h1>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#3F8F68]" />
              <span className="text-[11px] font-bold text-[#3F8F68]">Online</span>
            </div>
          </div>
        </div>

        <button
          onClick={resetChat}
          title="Reset Conversation"
          className="w-9 h-9 rounded-xl bg-[#F8FAF8] hover:bg-[#EAF3EE] text-[#68736D] hover:text-[#163A32] border border-[#E6ECE8] flex items-center justify-center transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Chat Message Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isExpanded = !!expandedEvidenceIds[msg.id];

          if (isUser) {
            return (
              <div key={msg.id} className="flex justify-end items-end space-x-2">
                <div className="max-w-[82%] bg-[#163A32] text-white rounded-2xl rounded-br-xs px-4 py-3 shadow-sm">
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <span className="text-[10px] text-[#A3B8AE] mt-1 block text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          }

          // Assistant Message
          return (
            <div key={msg.id} className="flex items-start space-x-2.5">
              {/* Palm avatar */}
              <div className="w-8 h-8 rounded-full bg-[#163A32] text-[#D6A84F] flex-shrink-0 flex items-center justify-center shadow-xs mt-1">
                <Sprout className="w-4 h-4" />
              </div>

              {/* Assistant Message Bubble */}
              <div className="max-w-[88%] space-y-2">
                <div className="bg-white text-[#17211D] rounded-2xl rounded-tl-xs px-4 py-3.5 border border-[#E6ECE8] shadow-sm space-y-2.5">
                  {/* Text answer or plain summary */}
                  <p className="text-sm leading-relaxed text-[#17211D]">
                    {msg.ragResult?.plainSummary || msg.text || msg.ragResult?.answer}
                  </p>

                  {/* If RAG result exists with structured insights */}
                  {msg.ragResult && (
                    <div className="space-y-2.5 pt-2 border-t border-[#F1F5F3]">
                      {/* Status Tag */}
                      <div className="flex items-center space-x-2">
                        {msg.ragResult.decisionStatus === 'Supported by evidence' && (
                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EAF3EE] text-[#2F6B55] border border-[#3F8F68]/30">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified Recommendation</span>
                          </span>
                        )}
                        {msg.ragResult.decisionStatus === 'Contextual evidence only' && (
                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FBF5E8] text-[#D6A84F] border border-[#D6A84F]/40">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Contextual Guidance • Check Local Factors</span>
                          </span>
                        )}
                        {(msg.ragResult.decisionStatus === 'Insufficient evidence' || msg.ragResult.decisionStatus === 'Requires human review') && (
                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FBECEB] text-[#C65B4B] border border-[#C65B4B]/30">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Requires Human Review / Out of Scope</span>
                          </span>
                        )}

                        <span className="text-[10px] text-[#68736D] font-mono">
                          {msg.ragResult.engineUsed}
                        </span>
                      </div>

                      {/* What This Means for Your Farm */}
                      {msg.ragResult.whatThisMeans && (
                        <div className="bg-[#F8FAF8] rounded-xl p-3 border border-[#E6ECE8] text-xs space-y-1">
                          <span className="font-bold text-[#17211D] block">
                            What this means for your farm:
                          </span>
                          <p className="text-[#68736D] leading-relaxed">
                            {msg.ragResult.whatThisMeans}
                          </p>
                        </div>
                      )}

                      {/* Recommended Next Step */}
                      {msg.ragResult.recommendedNextStep && (
                        <div className="bg-[#EAF3EE] rounded-xl p-3 border border-[#3F8F68]/30 text-xs flex items-center justify-between">
                          <div>
                            <span className="font-bold text-[#163A32] block">Recommended Action:</span>
                            <span className="text-[#2F6B55]">{msg.ragResult.recommendedNextStep}</span>
                          </div>
                        </div>
                      )}

                      {/* Evidence & Citations Collapsible Button */}
                      {msg.ragResult.evidenceUsed && msg.ragResult.evidenceUsed.length > 0 && (
                        <div className="pt-1">
                          <button
                            onClick={() => toggleEvidence(msg.id)}
                            className="text-xs font-bold text-[#2F6B55] hover:text-[#163A32] flex items-center space-x-1 cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>
                              {isExpanded ? 'Hide Evidence & Citations' : `View ${msg.ragResult.evidenceUsed.length} Grounded Evidence Records`}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* Expanded Evidence Details */}
                          {isExpanded && (
                            <div className="mt-2 space-y-2 bg-[#F8FAF8] rounded-xl p-3 border border-[#E6ECE8] text-xs">
                              {msg.ragResult.evidenceUsed.map((ev, idx) => (
                                <div key={idx} className="space-y-1 border-b border-[#E6ECE8] pb-2 last:border-b-0 last:pb-0">
                                  <div className="flex items-center justify-between font-bold text-[#17211D]">
                                    <span className="text-[#2F6B55]">{ev.sourceTitle}</span>
                                    <span className="font-mono text-[10px] bg-[#EAF3EE] text-[#163A32] px-1.5 py-0.5 rounded">
                                      {ev.chkId}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-[#68736D]">
                                    Authority: {ev.authority} • Type: {ev.evidenceType}
                                  </p>
                                  {ev.scopeCaveat && (
                                    <p className="text-[10px] text-[#68736D] italic">
                                      Scope Caveat: {ev.scopeCaveat}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <span className="text-[10px] text-[#68736D] mt-1 block">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-start space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[#163A32] text-[#D6A84F] flex items-center justify-center shadow-xs">
              <Sprout className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-xs px-4 py-3 border border-[#E6ECE8] shadow-sm flex items-center space-x-2 text-xs text-[#68736D]">
              <span className="w-2 h-2 rounded-full bg-[#D6A84F] animate-ping" />
              <span>Consulting verified knowledge base & agricultural standards...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* 3. Prompt Chips Carousel (matching prototype) */}
      <div className="py-2 overflow-x-auto flex space-x-2 scrollbar-none">
        {samplePrompts.map((promptLabel, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(promptQueries[promptLabel] || promptLabel)}
            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white hover:bg-[#EAF3EE] text-[#163A32] border border-[#2F6B55]/30 hover:border-[#2F6B55] text-xs font-bold shadow-2xs transition-colors cursor-pointer"
          >
            {promptLabel}
          </button>
        ))}
      </div>

      {/* 4. Bottom Input Bar (matching prototype) */}
      <div className="pt-1">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(queryInput);
          }}
          className="flex items-center space-x-2"
        >
          {/* Attachment button */}
          <button
            type="button"
            title="Attach Sensor Reading or Image"
            className="w-11 h-11 rounded-2xl bg-[#EAF3EE] hover:bg-[#D4E8DC] text-[#163A32] flex items-center justify-center transition-colors cursor-pointer border border-[#2F6B55]/20 flex-shrink-0"
          >
            <Paperclip className="w-5 h-5 text-[#2F6B55]" />
          </button>

          {/* Search Input Box with Deep Palm Green outline border */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Ask about your farm..."
              className="w-full h-11 bg-white rounded-2xl border-2 border-[#163A32] px-4 text-sm text-[#17211D] placeholder-[#68736D] focus:outline-none focus:ring-2 focus:ring-[#D6A84F]/50 shadow-sm"
            />
          </div>

          {/* Golden/Orange Circular Send Button */}
          <button
            type="submit"
            disabled={!queryInput.trim() || loading}
            className="w-11 h-11 rounded-full bg-[#D6A84F] hover:bg-[#C9993E] text-[#163A32] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-transform transform active:scale-95 shadow-md flex-shrink-0 cursor-pointer"
          >
            <ArrowRight className="w-5 h-5 text-[#163A32] stroke-[3]" />
          </button>
        </form>
      </div>
    </div>
  );
};
