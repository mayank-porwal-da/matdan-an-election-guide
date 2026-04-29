import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, increment, serverTimestamp, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firebaseUtils';
import { Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function PledgeCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [hasPledged, setHasPledged] = useState(() => localStorage.getItem('matdan_pledged') === 'true');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const docRef = doc(db, 'counters', 'pledges');

    // Live counter
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setCount(data.count);
      } else {
        // Initialize if not exists (first time)
        setCount(0);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'counters/pledges');
    });

    return () => unsubscribe();
  }, []);

  const handlePledge = async () => {
    if (hasPledged || isLoading) return;
    setIsLoading(true);

    const docRef = doc(db, 'counters', 'pledges');
    try {
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) {
        await setDoc(docRef, { count: 1, updatedAt: serverTimestamp() });
      } else {
        await updateDoc(docRef, { 
          count: increment(1),
          updatedAt: serverTimestamp()
        });
      }
      setHasPledged(true);
      localStorage.setItem('matdan_pledged', 'true');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'counters/pledges');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="pledge-counter" className="bg-surface/50 backdrop-blur-xl rounded-[32px] p-8 border border-white/10 shadow-2xl space-y-6 max-w-sm mx-auto text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 group">
        <Heart className={`w-8 h-8 transition-all ${hasPledged ? 'text-accent fill-accent scale-110' : 'text-accent group-hover:scale-125'}`} />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-serif font-black text-white">Voter Pledge</h3>
        <p className="text-sm text-muted font-light leading-relaxed">
          Join {count !== null ? count : '...'} others who have pledged to vote ethically and informed in the upcoming elections.
        </p>
      </div>

      <button
        onClick={handlePledge}
        disabled={hasPledged || isLoading}
        className={`
          w-full py-4 rounded-2xl font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3
          ${hasPledged 
            ? 'bg-india-green/20 text-india-green border border-india-green/30 cursor-default' 
            : 'bg-accent text-white shadow-accent-glow hover:scale-105 active:scale-95'}
        `}
      >
        {hasPledged ? (
          <>Pledged <Sparkles className="w-4 h-4" /></>
        ) : (
          isLoading ? 'Processing...' : 'I Pledge to Vote'
        )}
      </button>

      {hasPledged && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] font-mono text-india-green uppercase tracking-[0.2em]"
        >
          Thank you for strengthening democracy!
        </motion.p>
      )}
    </div>
  );
}
