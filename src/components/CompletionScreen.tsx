import { motion } from "motion/react";
import { RotateCcw, ExternalLink } from "lucide-react";

interface CompletionScreenProps {
  quizScore: { correct: number; total: number };
  onRestart: () => void;
}

export default function CompletionScreen({ quizScore, onRestart }: CompletionScreenProps) {
  return (
    <div id="completion-screen" className="flex flex-col items-center justify-center p-6 md:p-12 text-center h-full max-w-4xl mx-auto space-y-12">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="text-8xl md:text-9xl mb-4"
      >
        🎉
      </motion.div>

      <div className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif font-black text-india-gold tracking-tight"
        >
          You know how India votes.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-muted max-w-2xl mx-auto"
        >
          Jai Hind! You've successfully navigated the 7 stages of the world's largest democratic process.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg"
      >
        <div className="bg-surface p-6 rounded-2xl border border-white/10">
          <div className="text-3xl font-serif font-bold text-white mb-1">{quizScore.correct}/{quizScore.total}</div>
          <div className="text-xs text-muted font-mono tracking-widest uppercase">Quiz Answers Correct</div>
        </div>
        <div className="bg-surface p-6 rounded-2xl border border-white/10">
          <div className="text-3xl font-serif font-bold text-white mb-1">7</div>
          <div className="text-xs text-muted font-mono tracking-widest uppercase">Stages Completed</div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button 
          onClick={onRestart}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-surface2 text-white border border-white/10 rounded-full font-bold hover:bg-white/5 transition-all active:scale-95"
        >
          <RotateCcw className="w-5 h-5" /> RESTART JOURNEY
        </button>
        <a 
          href="https://voters.eci.gov.in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-8 py-4 bg-india-green text-bg rounded-full font-bold hover:shadow-[0_0_20px_rgba(6,214,160,0.4)] transition-all active:scale-95"
        >
          <ExternalLink className="w-5 h-5" /> REGISTER TO VOTE
        </a>
      </motion.div>
    </div>
  );
}
