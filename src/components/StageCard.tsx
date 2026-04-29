import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Info, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  Send,
  Loader2,
  Settings,
  CheckCircle2,
  XCircle,
  Calendar
} from "lucide-react";
import { Stage, ChatHistories, QuizState } from "../types";
import ElectionDates from "./ElectionDates";

interface StageCardProps {
  stage: Stage;
  totalStages: number;
  quizState: {
    answers: QuizState;
    correct: number;
    total: number;
  };
  chatState: { histories: ChatHistories; isLoading: boolean; error: string | null };
  onAnswerQuiz: (stageId: number, qIndex: number, optionIdx: number) => any;
  onSendChat: (chatKey: string, text: string, systemPrompt: string) => void;
  onOpenSettings: () => void;
  hasApiKey: boolean;
}

export default function StageCard({ 
  stage, 
  totalStages,
  quizState, 
  chatState, 
  onAnswerQuiz, 
  onSendChat,
  onOpenSettings,
  hasApiKey
}: StageCardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'quiz' | 'chat' | 'dates'>('overview');
  const [chatInput, setChatInput] = useState("");

  const currentChatHistory = chatState.histories[stage.code] || [];
  const quizFinished = quizState.answers[stage.id] && Object.keys(quizState.answers[stage.id]).length === stage.quiz.length;

  const handleSendChat = () => {
    if (!chatInput.trim() || chatState.isLoading) return;
    onSendChat(stage.code, chatInput, stage.systemPrompt);
    setChatInput("");
  };

  const tabs = [
    { id: 'overview', icon: Info, label: 'Overview' },
    { id: 'quiz', icon: HelpCircle, label: 'Quiz', indicator: quizFinished },
    { id: 'chat', icon: Sparkles, label: 'Mitra' }
  ];

  if (stage.id === 7 && totalStages === 7) {
    tabs.push({ id: 'dates', icon: Calendar, label: 'Dates' });
  }

  return (
    <motion.div 
      key={stage.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      id={`stage-${stage.id}`} 
      className="max-w-4xl mx-auto px-6 py-12 pb-32 w-full"
    >
      {/* Header Section */}
      <div className="space-y-6 mb-12">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted">
            Stage {stage.id} of {totalStages}
          </span>
          <div className="h-[1px] flex-1 bg-white/5"></div>
        </div>

        <div className="flex items-start gap-5 sm:gap-8">
          <div className="text-5xl sm:text-7xl">{stage.emoji}</div>
          <div className="space-y-2">
            <h2 className="text-clamp-stage font-serif font-black text-white leading-[1.1] tracking-tight">
              {stage.title}
            </h2>
            <p className="text-lg sm:text-2xl text-muted font-serif italic">
              {stage.subtitle}
            </p>
          </div>
        </div>

        <motion.div 
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 border-l-4 rounded-r-2xl bg-surface2/30 backdrop-blur-sm border-accent"
          style={{ borderColor: stage.accent }}
        >
          <p className="text-lg sm:text-xl font-medium leading-relaxed italic" style={{ color: stage.accent }}>
            "{stage.hook}"
          </p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-8 sticky top-0 bg-bg/95 backdrop-blur-md z-30 -mx-6 px-6 pt-2 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            aria-label={`View ${tab.label}`}
            className={`
              flex items-center gap-2 px-4 sm:px-6 py-4 text-[10px] sm:text-xs font-black tracking-widest uppercase transition-all relative shrink-0
              ${activeTab === tab.id ? 'text-white' : 'text-muted hover:text-white/60'}
            `}
          >
            <tab.icon className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${activeTab === tab.id ? 'text-india-blue' : ''}`} />
            <span className="hidden xs:inline">{tab.label}</span>
            {tab.id === 'dates' && (
              <motion.span 
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="ml-1.5 px-1.5 py-0.5 bg-accent text-[8px] font-black rounded-md text-white shadow-[0_0_10px_rgba(230,57,70,0.5)]"
              >
                LIVE
              </motion.span>
            )}
            {('indicator' in tab && tab.indicator) && (
              <span className="ml-1 text-[10px] text-india-green">✓</span>
            )}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTabBorder"
                className="absolute bottom-0 left-0 w-full h-[2.5px] bg-india-blue"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.02, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="pb-10"
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-10">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold font-serif text-white/90">Process Context</h3>
                  <p className="text-lg text-muted leading-relaxed font-light">
                    {stage.overview}
                  </p>
                </div>

                <div className="space-y-5">
                  <h3 className="text-xl font-bold font-serif text-white/90">Core Objectives</h3>
                  <ul className="space-y-4">
                    {stage.keyFacts.map((fact, idx) => (
                      <motion.li 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="flex items-start gap-4 group"
                      >
                        <div className="mt-1 w-5 h-5 rounded-full bg-india-green/10 flex items-center justify-center group-hover:bg-india-green transition-colors">
                          <ArrowRight className="w-3 h-3 text-india-green group-hover:text-bg transition-colors" />
                        </div>
                        <span className="text-muted group-hover:text-text transition-colors leading-relaxed">{fact}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-surface p-7 rounded-3xl border border-white/10 space-y-5 sticky top-24 shadow-xl">
                  <div className="flex items-center gap-2 text-india-blue">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-xs font-black tracking-widest uppercase">Electoral Value</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted font-light italic">
                    {stage.whyItMatters}
                  </p>
                </div>

                {stage.id === 7 && (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => setActiveTab('dates')}
                    className="cursor-pointer bg-gradient-to-br from-india-blue/20 to-accent/20 p-6 rounded-3xl border border-white/10 space-y-3 shadow-xl hover:border-india-blue/50 transition-all group"
                  >
                    <div className="flex items-center gap-2 text-white">
                      <Calendar className="w-4 h-4 text-india-blue group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-black tracking-widest uppercase">Live Schedule</span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed font-light">
                      Check out the **Election Dates** tab for real-time ECI schedules for 2026-2029!
                    </p>
                    <div className="flex items-center gap-1 text-[10px] font-black text-india-blue uppercase tracking-widest">
                      View Dates <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold font-serif">Assessment</h3>
                <div className="px-5 py-2.5 bg-india-gold/10 border border-india-gold/20 rounded-2xl">
                  <span className="text-xs font-mono font-black text-india-gold uppercase tracking-widest">
                    Score: {quizState.correct}/{quizState.total}
                  </span>
                </div>
              </div>

              <div className="space-y-12">
                {stage.quiz.map((q, qIdx) => {
                  const userAnswer = quizState.answers[stage.id]?.[qIdx];
                  const hasAnswered = !!userAnswer;

                  return (
                    <div key={qIdx} className="space-y-6">
                      <div className="flex gap-5">
                        <span className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-xs font-mono text-muted shrink-0 border border-white/5 uppercase">
                          Q{qIdx + 1}
                        </span>
                        <h4 className="text-xl font-medium leading-snug text-white/90">{q.q}</h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {q.options.map((option, optIdx) => {
                          const isSelected = userAnswer?.selectedBase0 === optIdx;
                          const isCorrect = q.answer === optIdx;
                          
                          let borderClass = "border-white/10";
                          let bgClass = "bg-surface hover:bg-white/5";
                          let textClass = "text-muted";
                          
                          if (hasAnswered) {
                            if (isCorrect) {
                              borderClass = "border-india-green bg-india-green/5 shadow-[0_0_15px_rgba(6,214,160,0.1)]";
                              textClass = "text-india-green font-bold";
                            } else if (isSelected) {
                              borderClass = "border-accent bg-accent/5";
                              textClass = "text-accent font-bold";
                            }
                          }

                          return (
                            <motion.button
                              key={optIdx}
                              disabled={hasAnswered}
                              whileHover={!hasAnswered ? { scale: 1.02, x: 5 } : {}}
                              whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                              onClick={() => onAnswerQuiz(stage.id, qIdx, optIdx)}
                              aria-label={`Option ${['A', 'B', 'C', 'D'][optIdx]}: ${option}`}
                              className={`
                                w-full text-left p-5 rounded-2xl border transition-all flex justify-between items-center
                                ${borderClass} ${bgClass} ${hasAnswered ? 'cursor-default opacity-80' : ''}
                              `}
                            >
                              <span className={`text-sm ${textClass}`}>
                                <span className="font-mono mr-4 opacity-30 select-none">{['A', 'B', 'C', 'D'][optIdx]}</span>
                                {option}
                              </span>
                              {hasAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-india-green" />}
                              {hasAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-accent" />}
                            </motion.button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-surface2/40 rounded-3xl p-6 border border-white/5 space-y-3"
                        >
                          <div className={`flex items-center gap-2 text-xs font-black tracking-widest uppercase ${userAnswer.correct ? 'text-india-green' : 'text-accent'}`}>
                            {userAnswer.correct ? 'Brilliant' : 'Not quite'}
                          </div>
                          <p className="text-sm text-muted leading-relaxed font-light">
                            {q.explanation}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="flex flex-col h-[650px] bg-bg/40 backdrop-blur-xl rounded-[40px] border border-white/10 overflow-hidden shadow-2xl relative">
              {/* Context bar */}
              <div className="px-8 py-5 bg-surface/80 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-india-green animate-pulse' : 'bg-india-gold'}`} />
                  <span className="text-[10px] font-mono font-black tracking-[0.2em] uppercase text-muted">
                    {hasApiKey ? `AI ACTIVE: ${stage.code}` : 'AI STANDBY: KEY REQ'}
                  </span>
                </div>
                <button 
                  onClick={onOpenSettings}
                  className="p-2 text-muted hover:text-india-blue transition-colors rounded-lg bg-white/5"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                {currentChatHistory.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 px-12">
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-tr from-accent/20 to-india-blue/20 flex items-center justify-center border border-white/10"
                    >
                      <Sparkles className="w-10 h-10 text-white" />
                    </motion.div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-serif font-black text-white">Namaste! I'm Mitra</h4>
                      <p className="text-sm text-muted leading-relaxed font-light">
                        How can I help you navigate {stage.title}? I'm expert in {stage.subtitle.toLowerCase()}.
                      </p>
                    </div>
                  </div>
                ) : (
                  currentChatHistory.map((msg: any, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`
                        max-w-[85%] px-5 py-4 rounded-3xl text-sm leading-relaxed shadow-lg
                        ${msg.role === 'user' 
                          ? 'bg-accent/15 border border-accent/20 text-white rounded-tr-none' 
                          : 'bg-surface border border-white/10 text-text rounded-tl-none'}
                      `}>
                        {msg.parts[0].text}
                      </div>
                    </motion.div>
                  ))
                )}
                {chatState.isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-surface border border-white/10 px-5 py-4 rounded-3xl rounded-tl-none flex items-center gap-1.5 shadow-lg">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-muted rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-muted rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-muted rounded-full" />
                    </div>
                  </motion.div>
                )}
                {chatState.error && (
                  <div className="flex justify-center">
                    <div className="bg-accent/10 border border-accent/30 px-6 py-3 rounded-2xl flex items-center gap-3 text-xs text-accent font-bold tracking-wider">
                      <AlertCircle className="w-5 h-5" /> 
                      {chatState.error.includes('401') ? 'Invalid API Key. Please update in settings.' : chatState.error}
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Interaction */}
              <div className="p-8 pt-0">
                {/* Prompt Chips */}
                {currentChatHistory.length === 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {stage.quickPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => !chatState.isLoading && onSendChat(stage.code, prompt, stage.systemPrompt)}
                        className="px-5 py-2.5 rounded-full border border-white/10 bg-surface/50 text-[10px] font-black text-muted hover:text-white hover:border-india-blue hover:bg-india-blue/5 transition-all active:scale-95 uppercase tracking-widest"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                <div className="relative group">
                  {!hasApiKey ? (
                    <motion.div 
                      onClick={onOpenSettings}
                      whileHover={{ scale: 1.01 }}
                      className="w-full bg-surface/50 border border-india-gold/20 rounded-[24px] p-5 text-center cursor-pointer hover:border-india-gold/50 transition-all shadow-inner"
                    >
                      <p className="text-xs text-muted mb-3 font-light">Mitra is ready to help, but needs a brain.</p>
                      <span className="text-[10px] font-black text-india-gold uppercase tracking-[0.2em] border-b border-india-gold/30">
                        CONFIGURE GEMINI ACCESS
                      </span>
                    </motion.div>
                  ) : (
                    <>
                      <textarea 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendChat();
                          }
                        }}
                        placeholder="Ask Mitra something..."
                        rows={1}
                        disabled={chatState.isLoading}
                        className="w-full bg-surface border border-white/10 rounded-[28px] py-5 pl-7 pr-16 text-sm focus:outline-none focus:border-india-blue transition-all resize-none shadow-xl disabled:opacity-50"
                      />
                      <button 
                        onClick={handleSendChat}
                        disabled={chatState.isLoading || !chatInput.trim()}
                        className={`
                          absolute right-3.5 top-1/2 -translate-y-1/2 p-3 rounded-2xl transition-all
                          ${chatInput.trim() && !chatState.isLoading ? 'bg-accent text-white shadow-accent-glow' : 'text-muted bg-white/5'}
                        `}
                      >
                        {chatState.isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dates' && (
            <ElectionDates />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
