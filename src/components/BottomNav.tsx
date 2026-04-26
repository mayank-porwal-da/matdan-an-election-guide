import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface BottomNavProps {
  currentStage: number;
  totalStages: number;
  onPrev: () => void;
  onNext: () => void;
  isCompleted: boolean;
  onFinish: () => void;
}

export default function BottomNav({ currentStage, totalStages, onPrev, onNext, isCompleted, onFinish }: BottomNavProps) {
  const isFirst = currentStage === 0;
  const isLast = currentStage === totalStages - 1;

  return (
    <div className="h-20 bg-bg/80 backdrop-blur-md border-t border-white/10 px-6 flex items-center justify-between z-20">
      <button 
        onClick={onPrev}
        disabled={isFirst}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-full font-serif font-bold transition-all
          ${isFirst ? 'opacity-0 pointer-events-none' : 'hover:bg-white/5 text-white active:scale-95'}
        `}
      >
        <ChevronLeft className="w-5 h-5" /> PREVIOUS
      </button>

      <div className="flex flex-col items-center">
        <span className="text-[10px] text-muted font-mono tracking-[0.2em] uppercase">Navigation</span>
        <span className="text-sm font-serif font-bold text-india-gold">Stage {currentStage + 1} of {totalStages}</span>
      </div>

      {isLast ? (
        <button 
          onClick={onFinish}
          className="flex items-center gap-2 px-8 py-3 bg-india-green text-bg rounded-full font-serif font-black text-lg hover:shadow-[0_0_20px_rgba(6,214,160,0.4)] active:scale-95 transition-all"
        >
          FINISH <Check className="w-5 h-5" />
        </button>
      ) : (
        <button 
          onClick={onNext}
          className="flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-full font-serif font-black text-lg shadow-accent-glow active:scale-95 transition-all"
        >
          NEXT <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
