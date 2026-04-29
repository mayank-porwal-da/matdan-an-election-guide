import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Stage } from "../types";

interface ProgressBarProps {
  stages: Stage[];
  currentStage: number;
  completedStages: Set<number>;
  onJumpTo: (index: number) => void;
}

export default function ProgressBar({ stages, currentStage, completedStages, onJumpTo }: ProgressBarProps) {
  return (
    <div id="progress-bar" className="flex items-center gap-1.5 sm:gap-4 px-4 h-full">
      {stages.map((stage, idx) => {
        const isCompleted = completedStages.has(idx);
        const isActive = idx === currentStage;
        const isFuture = idx > currentStage;
        const canJump = idx <= currentStage;

        return (
          <div key={stage.id} className="flex items-center">
            {/* Dot & Label Container */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => canJump && onJumpTo(idx)}
                disabled={!canJump}
                className={`
                  relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                  ${isActive ? 'bg-india-gold text-bg shadow-gold-glow scale-110' : ''}
                  ${isCompleted ? 'bg-india-green text-bg' : ''}
                  ${isFuture ? 'bg-surface2 text-muted border border-white/10' : ''}
                  ${canJump ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-50'}
                `}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3px]" /> : idx + 1}
                
                {/* Active ripple */}
                {isActive && (
                  <motion.div 
                    layoutId="active-glow"
                    className="absolute inset-0 rounded-full border-2 border-india-gold"
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1.4 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
              </button>
              
              {/* Stage Code (hidden on mobile) */}
              <span className={`
                mt-2 text-[10px] font-mono tracking-wider hidden sm:block
                ${isActive ? 'text-white' : 'text-muted'}
              `}>
                {stage.code}
              </span>
            </div>

            {/* Connecting line (if not last) */}
            {idx < stages.length - 1 && (
              <div className={`
                w-4 sm:w-12 h-[1px] mx-1 sm:mx-2 -mt-4
                ${idx < currentStage ? 'bg-india-green' : 'bg-white/10'}
              `} />
            )}
          </div>
        );
      })}
    </div>
  );
}
