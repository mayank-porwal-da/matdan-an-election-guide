import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import PledgeCounter from "./PledgeCounter";

interface LandingPageProps {
  onStart: () => void;
  onStartParliament: () => void;
  hasProgress?: boolean;
}

export default function LandingPage({ onStart, onStartParliament, hasProgress }: LandingPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div id="landing-page" className="min-h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Flag color strip */}
      <div className="absolute top-0 left-0 w-full h-1.5 flex">
        <div className="flex-1 bg-[#FF9933]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl z-10 space-y-10"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-india-red/30 bg-india-red/5 text-india-red text-xs font-bold tracking-widest uppercase shadow-sm">
          🇮🇳 India's Election System — Explained
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-clamp-title font-serif font-black text-white tracking-tighter leading-[0.9]">
            मतदान
          </h1>
          <p className="text-2xl md:text-3xl font-serif italic text-muted opacity-80">
            Matdan — How India Votes
          </p>
        </motion.div>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto font-light">
          A definitive guide to the democratic journey of the world's largest electorate. 
          Understand the mechanics, engage with AI, and prepare for your vote.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-4">
          <div className="flex flex-col gap-1 items-center md:items-start md:border-r md:border-white/10 md:pr-8 last:border-0 last:pr-0">
            <span className="text-2xl font-serif font-bold text-white">968M</span>
            <span className="text-[10px] font-mono text-india-gold tracking-[0.2em] uppercase">Voters</span>
          </div>
          <div className="flex flex-col gap-1 items-center md:items-start md:border-r md:border-white/10 md:pr-8 last:border-0 last:pr-0">
            <span className="text-2xl font-serif font-bold text-white">543</span>
            <span className="text-[10px] font-mono text-india-gold tracking-[0.2em] uppercase">Seats</span>
          </div>
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="text-2xl font-serif font-bold text-white">7</span>
            <span className="text-[10px] font-mono text-india-gold tracking-[0.2em] uppercase">Stages</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            aria-label="Begin Journey"
            className="group relative bg-[#e63946] px-12 py-5 rounded-full font-serif font-black text-2xl flex items-center gap-3 shadow-accent-glow hover:shadow-[0_0_30px_rgba(230,57,70,0.6)] transition-all"
          >
            {hasProgress ? 'Resume Journey' : 'Begin the journey'} <ArrowRight className="w-7 h-7 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartParliament}
            className="px-8 py-3 rounded-full border border-white/20 text-muted font-bold tracking-widest uppercase hover:bg-white/5 transition-all text-sm flex items-center gap-3"
          >
            🏛️ Understand Parliament <ArrowRight className="w-4 h-4 opacity-50" />
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-12">
          <PledgeCounter />
        </motion.div>
      </motion.div>
    </div>
  );
}
