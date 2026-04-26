import { Sparkles, Send } from "lucide-react";
import QuizPanel from "./QuizPanel";

export default function ChatPanel() {
  return (
    <div id="chat-panel" className="h-full flex flex-col overflow-hidden">
      {/* AI Module Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-india-blue flex items-center justify-center p-[2px]">
            <div className="w-full h-full rounded-full bg-surface flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white">MITRA AI</h4>
            <p className="text-[10px] text-india-green font-mono tracking-widest uppercase">Online | Gemini 3 Flash</p>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 space-y-4 mb-4">
        <div className="bg-surface2 p-4 rounded-2xl rounded-tl-none border border-white/5">
          <p className="text-sm leading-relaxed text-text">
            Namaste! I'm Mitra, your guide. To get started with your voter registration, I can help you with Form 6 or check your eligibility. What would you like to know?
          </p>
        </div>
        
        <div className="bg-accent/20 p-4 rounded-2xl rounded-tr-none self-end ml-8 border border-accent/30">
          <p className="text-sm text-white">What documents do I need for age proof?</p>
        </div>

        <div className="bg-surface2 p-4 rounded-2xl rounded-tl-none border border-white/5">
          <p className="text-sm leading-relaxed text-text">
            For age proof, you can use your Birth Certificate, Aadhaar Card, PAN Card, or even your Class 10/12 certificate.
          </p>
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-6 pt-0">
        <div className="relative group mb-6">
          <input 
            type="text" 
            placeholder="Ask Mitra anything..."
            className="w-full bg-bg border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-sm focus:outline-none focus:border-india-blue transition-all"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-india-blue transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Nudge Area */}
        <div className="-mx-6">
          <QuizPanel />
        </div>
      </div>
    </div>
  );
}
