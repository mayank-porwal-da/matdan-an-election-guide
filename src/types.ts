export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Stage {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  emoji: string;
  accent: string;
  hook: string;
  overview: string;
  keyFacts: string[];
  whyItMatters: string;
  quickPrompts: string[];
  quiz: QuizQuestion[];
  systemPrompt: string;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  parts: { text: string }[];
}

export interface ChatHistories {
  [key: string]: ChatMessage[];
}

export interface QuizAnswer {
  selectedBase0: number;
  correct: boolean;
}

export interface StageQuizAnswers {
  [qIndex: number]: QuizAnswer;
}

export interface QuizState {
  [stageId: number]: StageQuizAnswers;
}

export interface ProgressState {
  currentStage: number;
  completedStages: number[];
}
