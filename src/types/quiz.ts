export type Choice = {
  label: string;
  text: string;
  points: number;
};

export type Question = {
  id: number;
  category: string;
  text: string;
  choices: Choice[];
};

export type ResultType = {
  id: number;
  name: string;
  minScore: number;
  maxScore: number;
  currentSituation: string;
  actions: string[];
  message: string;
};

export type QuizData = {
  title: string;
  subtitle: string;
  description: string[];
  questions: Question[];
  resultTypes: ResultType[];
};
