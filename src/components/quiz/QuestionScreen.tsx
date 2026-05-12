"use client";

import { Question } from "@/types/quiz";
import ProgressBar from "./ProgressBar";

type Props = {
  question: Question;
  currentIndex: number;
  total: number;
  onAnswer: (points: number) => void;
  onBack: () => void;
};

export default function QuestionScreen({
  question,
  currentIndex,
  total,
  onAnswer,
  onBack,
}: Props) {
  return (
    <div className="w-full max-w-[600px] mx-auto px-6 py-8 sm:py-12">
      <ProgressBar current={currentIndex + 1} total={total} />

      <div className="mt-8 mb-2">
        <span className="inline-block text-xs sm:text-sm font-medium text-[#E89C3A] bg-[#FDF1E1] px-3 py-1 rounded-full">
          {question.category}
        </span>
      </div>
      <h2 className="text-lg sm:text-xl font-bold text-[#333333] leading-relaxed mb-8">
        {question.text}
      </h2>

      <div className="space-y-3">
        {question.choices.map((choice) => (
          <button
            key={choice.label}
            onClick={() => onAnswer(choice.points)}
            className="w-full text-left bg-white border-2 border-[#E8F0F9] hover:border-[#1E5BA8] hover:bg-[#E8F0F9] active:bg-[#D6E4F4] text-[#333333] py-4 px-5 rounded-xl transition-colors"
          >
            <span className="text-sm sm:text-base leading-relaxed">
              {choice.text}
            </span>
          </button>
        ))}
      </div>

      {currentIndex > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={onBack}
            className="text-sm text-[#666666] hover:text-[#1E5BA8] underline underline-offset-4 transition-colors"
          >
            ← 前の質問に戻る
          </button>
        </div>
      )}
    </div>
  );
}
