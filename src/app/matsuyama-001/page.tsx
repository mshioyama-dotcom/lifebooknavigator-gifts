"use client";

import { useMemo, useState } from "react";
import { matsuyamaQuizData } from "@/data/matsuyama-001";
import { calculateResult } from "@/lib/calculateResult";
import TopScreen from "@/components/quiz/TopScreen";
import QuestionScreen from "@/components/quiz/QuestionScreen";
import ResultScreen from "@/components/quiz/ResultScreen";

type Step = "top" | "questions" | "result";

export default function MatsuyamaQuiz() {
  const data = matsuyamaQuizData;
  const [step, setStep] = useState<Step>("top");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const totalScore = useMemo(
    () => answers.reduce((sum, p) => sum + p, 0),
    [answers],
  );

  const handleStart = () => {
    setStep("questions");
    setCurrentIndex(0);
    setAnswers([]);
  };

  const handleAnswer = (points: number) => {
    const next = [...answers, points];
    setAnswers(next);

    if (currentIndex + 1 < data.questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStep("result");
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) return;
    setAnswers(answers.slice(0, -1));
    setCurrentIndex(currentIndex - 1);
  };

  const handleRestart = () => {
    setStep("top");
    setCurrentIndex(0);
    setAnswers([]);
  };

  return (
    <main className="min-h-screen bg-white text-[#333333]">
      {step === "top" && (
        <TopScreen
          title={data.title}
          subtitle={data.subtitle}
          description={data.description}
          onStart={handleStart}
        />
      )}

      {step === "questions" && (
        <QuestionScreen
          question={data.questions[currentIndex]}
          currentIndex={currentIndex}
          total={data.questions.length}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      )}

      {step === "result" && (
        <ResultScreen
          result={calculateResult(totalScore, data.resultTypes)}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
}
