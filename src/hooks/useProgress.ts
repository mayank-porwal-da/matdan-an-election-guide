import { useState, useEffect } from 'react';
import { ProgressState } from '../types';

export function useProgress(storageKey: string = 'matdan_progress', totalStages: number = 7) {
  const [state, setState] = useState<ProgressState>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          currentStage: parsed.currentStage ?? 0,
          completedStages: parsed.completedStages ?? []
        };
      } catch (e) {
        // Fallback
      }
    }
    return { currentStage: 0, completedStages: [] };
  });

  const [completedSet, setCompletedSet] = useState<Set<number>>(new Set(state.completedStages));

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({
      currentStage: state.currentStage,
      completedStages: Array.from(completedSet)
    }));
  }, [state.currentStage, completedSet, storageKey]);

  const setStage = (n: number) => {
    if (n >= 0 && n < totalStages) {
      setState(prev => ({ ...prev, currentStage: n }));
    }
  };

  const next = () => {
    if (state.currentStage < totalStages - 1) {
      setState(prev => ({ ...prev, currentStage: prev.currentStage + 1 }));
    }
  };

  const prev = () => {
    if (state.currentStage > 0) {
      setState(prev => ({ ...prev, currentStage: prev.currentStage - 1 }));
    }
  };

  const markCompleted = (stageIndex: number) => {
    setCompletedSet(prev => {
      const next = new Set(prev);
      next.add(stageIndex);
      return next;
    });
  };

  const isAllCompleted = completedSet.size === totalStages;

  return { 
    currentStage: state.currentStage, 
    setStage, 
    next, 
    prev, 
    completedStages: completedSet, 
    markCompleted, 
    isAllCompleted 
  };
}
