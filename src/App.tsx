/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X } from "lucide-react";
import LandingPage from "./components/LandingPage";
import StageCard from "./components/StageCard";
import ProgressBar from "./components/ProgressBar";
import BottomNav from "./components/BottomNav";
import ApiKeyModal from "./components/ApiKeyModal";
import CompletionScreen from "./components/CompletionScreen";
import { stages, TOTAL_STAGES } from "./data/stages";
import { parliamentStages, TOTAL_PARLIAMENT_STAGES } from "./data/parliamentStages";
import { useProgress } from "./hooks/useProgress";
import { useQuiz } from "./hooks/useQuiz";
import { useChat } from "./hooks/useChat";

type AppState = 'landing' | 'guide' | 'completion' | 'parliament-guide' | 'parliament-completion';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Election Progress
  const electionProgress = useProgress('matdan_progress', TOTAL_STAGES);
  const electionQuiz = useQuiz(stages, 'matdan_quiz');

  // Parliament Progress
  const parliamentProgress = useProgress('matdan_parliament_progress', TOTAL_PARLIAMENT_STAGES);
  const parliamentQuiz = useQuiz(parliamentStages, 'matdan_parliament_quiz');

  const { 
    histories, 
    sendMessage, 
    isLoading: isChatLoading, 
    error: chatError, 
    getApiKey, 
    setApiKey 
  } = useChat();

  const isParliament = appState === 'parliament-guide' || appState === 'parliament-completion';
  const currentStages = isParliament ? parliamentStages : stages;
  const currentProgress = isParliament ? parliamentProgress : electionProgress;
  const currentQuiz = isParliament ? parliamentQuiz : electionQuiz;
  const totalStagesCount = isParliament ? TOTAL_PARLIAMENT_STAGES : TOTAL_STAGES;

  const hasProgress = electionProgress.completedStages.size > 0 || parliamentProgress.completedStages.size > 0;

  React.useEffect(() => {
    if (appState === 'guide' || appState === 'parliament-guide') {
      const stage = currentStages[currentProgress.currentStage];
      document.title = `Stage ${stage.id}: ${stage.title} — Matdan`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (appState === 'landing') {
      document.title = "Matdan — India Election Guide";
    } else {
      document.title = "Complete — Matdan Journey";
    }
  }, [appState, currentProgress.currentStage, currentStages]);

  const handleStart = () => setAppState('guide');
  const handleStartParliament = () => setAppState('parliament-guide');
  
  const handleFinish = () => {
    if (appState === 'guide') setAppState('completion');
    if (appState === 'parliament-guide') setAppState('parliament-completion');
  };

  const handleRestart = () => {
    setAppState('landing');
    currentProgress.setStage(0);
  };

  const currentStageData = currentStages[currentProgress.currentStage];
  const apiKey = getApiKey() || "";

  return (
    <div id="matdan-root" className="min-h-screen bg-bg text-text font-sans flex flex-col overflow-hidden relative selection:bg-accent/30 selection:text-white">
      {/* Background Glows */}
      <div className="glow-red opacity-[0.08]" />
      <div className="glow-blue opacity-[0.08]" />

      {/* Persistent Header */}
      <header className="h-20 border-b border-white/10 flex items-center justify-between px-6 bg-bg/80 backdrop-blur-xl z-50">
        <div 
          onClick={() => setAppState('landing')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center font-bold text-white shadow-accent-glow transition-transform group-hover:scale-110">M</div>
          <h1 className="text-2xl font-serif font-black tracking-tight">MATDAN</h1>
        </div>

        {(appState === 'guide' || appState === 'parliament-guide') && (
          <div className="hidden lg:block h-full">
            <ProgressBar 
              stages={currentStages}
              currentStage={currentProgress.currentStage}
              completedStages={currentProgress.completedStages}
              onJumpTo={currentProgress.setStage}
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            aria-label="AI Settings"
            className={`
              p-2.5 rounded-full transition-all border border-white/10 hover:bg-white/5
              ${apiKey ? 'text-india-green' : 'text-india-gold'}
            `}
          >
            <div className="w-5 h-5 flex items-center justify-center font-bold text-[10px] uppercase tracking-tighter">AI</div>
          </button>
          
          <a 
            href="https://voters.eci.gov.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:block px-5 py-2 border border-white/20 rounded-full text-xs font-black tracking-widest hover:bg-white hover:text-black transition-all uppercase"
          >
            REGISTER ASSIST
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative z-10 flex flex-col">
        {appState === 'landing' && (
          <LandingPage 
            onStart={handleStart} 
            onStartParliament={handleStartParliament}
            hasProgress={hasProgress} 
          />
        )}

        {(appState === 'guide' || appState === 'parliament-guide') && (
          <div className="flex-1 overflow-y-auto">
            <StageCard 
              stage={currentStageData}
              totalStages={totalStagesCount}
              quizState={{
                answers: currentQuiz.answers,
                correct: currentQuiz.getStageScore(currentStageData.id).correct,
                total: currentQuiz.getStageScore(currentStageData.id).total
              }}
              chatState={{
                histories,
                isLoading: isChatLoading,
                error: chatError
              }}
              onAnswerQuiz={(sId, qIdx, oIdx) => {
                const result = currentQuiz.answerQuestion(sId, qIdx, oIdx);
                currentProgress.markCompleted(currentProgress.currentStage);
                return result;
              }}
              onSendChat={sendMessage}
              onOpenSettings={() => setIsSettingsOpen(true)}
              hasApiKey={!!apiKey}
            />
          </div>
        )}

        {(appState === 'completion' || appState === 'parliament-completion') && (
          <CompletionScreen 
            quizScore={currentQuiz.getTotalScore()}
            stagesCount={totalStagesCount}
            isParliament={isParliament}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Navigation Footer */}
      {(appState === 'guide' || appState === 'parliament-guide') && (
        <BottomNav 
          currentStage={currentProgress.currentStage}
          totalStages={totalStagesCount}
          onPrev={currentProgress.prev}
          onNext={currentProgress.next}
          isCompleted={currentProgress.isAllCompleted}
          onFinish={handleFinish}
        />
      )}

      {/* Minimalistic fixed status if on landing/completion */}
      <footer className="h-10 bg-bg border-t border-white/10 px-8 flex items-center justify-between text-[10px] text-muted font-mono tracking-widest uppercase z-50">
        <div className="flex gap-8">
          <span className="hidden sm:inline">ECI_VOTER_PORTAL: ACTIVE</span>
          <span>SESSION: MD_DEMO_2024</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${apiKey ? 'bg-india-green animate-pulse' : 'bg-india-gold'}`} />
          {apiKey ? 'GEMINI_CONNECTED' : 'GEMINI_OFFLINE'}
        </div>
      </footer>

      {/* Modals */}
      <ApiKeyModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentKey={apiKey}
        onSave={setApiKey}
      />
    </div>
  );
}

