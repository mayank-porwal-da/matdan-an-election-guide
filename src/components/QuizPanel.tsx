export default function QuizPanel() {
  return (
    <div id="quiz-panel" className="p-6 bg-surface2 border-t border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xs font-bold uppercase tracking-[0.1em] text-india-gold">Stage Quiz</h5>
        <span className="text-[10px] bg-bg px-2 py-0.5 rounded text-muted font-mono tracking-widest">200 POINTS</span>
      </div>
      
      <p className="text-sm font-medium mb-5 leading-snug">
        What is the qualifying date to be 18 to vote in the current cycle?
      </p>
      
      <div className="space-y-2">
        <button className="w-full text-left p-4 text-xs rounded-xl border border-white/5 bg-surface hover:bg-bg transition-all active:scale-[0.98] group flex justify-between items-center">
          <span>January 1st of the year</span>
          <div className="w-2 h-2 rounded-full border border-white/20 group-hover:bg-india-gold transition-colors"></div>
        </button>
        <button className="w-full text-left p-4 text-xs rounded-xl border border-white/5 bg-surface hover:bg-bg transition-all active:scale-[0.98] group flex justify-between items-center">
          <span>Your actual birthday</span>
          <div className="w-2 h-2 rounded-full border border-white/20 group-hover:bg-india-gold transition-colors"></div>
        </button>
      </div>
    </div>
  );
}
