import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { X, Key, ExternalLink } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentKey: string;
  onSave: (key: string) => void;
}

export default function ApiKeyModal({ isOpen, onClose, currentKey, onSave }: ApiKeyModalProps) {
  const [key, setKey] = useState(currentKey);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/90 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-surface border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-india-blue to-india-green"></div>

            <button 
              onClick={onClose}
              aria-label="Close settings"
              className="absolute top-6 right-6 p-2 text-muted hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shadow-inner">
                <Key className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-black text-white leading-tight">Gemini API Key</h3>
                <p className="text-sm text-muted">Power your AI assistant, Mitra</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="api-key" className="text-[10px] font-mono tracking-[0.2em] text-muted uppercase font-bold">API Access Token</label>
                <input 
                  id="api-key"
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Paste your key here..."
                  className="w-full bg-bg border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-india-blue transition-all font-mono"
                />
              </div>

              <div className="bg-surface2/50 p-5 rounded-2xl border border-white/5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-india-blue mt-1 shrink-0"></div>
                  <p className="text-xs leading-relaxed text-muted font-light">
                    Your key is stored in <strong>localStorage</strong> (browser-only). It is never sent to our backend.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-india-blue mt-1 shrink-0"></div>
                  <p className="text-xs leading-relaxed text-muted font-light">
                    Requests go directly to <code>api.generativeai.google.com</code> using your token.
                  </p>
                </div>
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-india-blue hover:text-white transition-colors font-bold uppercase tracking-widest pl-[18px]"
                >
                  Get a free key <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <button 
                onClick={() => {
                  onSave(key);
                  onClose();
                }}
                aria-label="Save API Key"
                className="w-full bg-accent text-white py-5 rounded-2xl font-black text-xs tracking-[0.2em] shadow-accent-glow active:scale-[0.98] transition-all uppercase"
              >
                SAVE & ACTIVATE AI
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
