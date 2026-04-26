import { useState, useEffect } from 'react';

export function useProgress() {
  const [currentStage, setCurrentStage] = useState(() => {
    const saved = localStorage.getItem('matdan_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.currentStage || 0;
      } catch (e) {
        return 0;
      }
    }
    return 0;
  });

  const [completedStages, setCompletedStages] = useState<Set<number>>(() => {
    const saved = localStorage.getItem('matdan_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return new Set(parsed.completedStages || []);
      } catch (e) {
        return new Set();
      }
    }
    return new Set();
  });

  useEffect(() => {
    localStorage.setItem('matdan_progress', JSON.stringify({
      currentStage,
      completedStages: Array.from(completedStages)
    }));
  }, [currentStage, completedStages]);

  const setStage = (n: number) => {
    if (n >= 0 && n < 7) {
      setCurrentStage(n);
    }
  };

  const next = () => {
    if (currentStage < 6) {
      setCurrentStage(prev => prev + 1);
    }
  };

  const prev = () => {
    if (currentStage > 0) {
      setCurrentStage(prev => prev - 1);
    }
  };

  const markCompleted = (stageIndex: number) => {
    setCompletedStages(prev => {
      const next = new Set(prev);
      next.add(stageIndex);
      return next;
    });
  };

  const isAllCompleted = completedStages.size === 7;

  return { 
    currentStage, 
    setStage, 
    next, 
    prev, 
    completedStages, 
    markCompleted, 
    isAllCompleted 
  };
}
