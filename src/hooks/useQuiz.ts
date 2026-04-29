import { useState, useEffect } from 'react';
import { Stage, QuizState } from '../types';

export function useQuiz(stages: Stage[], storageKey: string = 'matdan_quiz') {
  const [answers, setAnswers] = useState<QuizState>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(answers));
  }, [answers, storageKey]);

  const answerQuestion = (stageId: number, qIndex: number, selectedOption: number) => {
    const stage = stages.find(s => s.id === stageId);
    if (!stage) return { correct: false, explanation: 'Stage not found' };

    const question = stage.quiz[qIndex];
    const isCorrect = selectedOption === question.answer;

    setAnswers(prev => ({
      ...prev,
      [stageId]: {
        ...(prev[stageId] || {}),
        [qIndex]: {
          selectedBase0: selectedOption,
          correct: isCorrect
        }
      }
    }));

    return {
      correct: isCorrect,
      explanation: question.explanation
    };
  };

  const getStageScore = (stageId: number) => {
    const stageAnswers = answers[stageId] || {};
    const stage = stages.find(s => s.id === stageId);
    if (!stage) return { correct: 0, total: 0 };

    const correctCount = Object.values(stageAnswers).filter((a: any) => a.correct).length;
    return {
      correct: correctCount,
      total: stage.quiz.length
    };
  };

  const getTotalScore = () => {
    let totalCorrect = 0;
    let totalQuestions = 0;

    stages.forEach(stage => {
      const score = getStageScore(stage.id);
      totalCorrect += score.correct;
      totalQuestions += score.total;
    });

    return {
      correct: totalCorrect,
      total: totalQuestions
    };
  };

  return { answers, answerQuestion, getStageScore, getTotalScore };
}
