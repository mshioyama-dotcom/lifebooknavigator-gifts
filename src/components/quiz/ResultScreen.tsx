"use client";

import { ResultType } from "@/types/quiz";

type Props = {
  result: ResultType;
  onRestart: () => void;
};

export default function ResultScreen({ result, onRestart }: Props) {
  return (
    <div className="w-full max-w-[600px] mx-auto px-6 py-8 sm:py-12">
      <p className="text-center text-sm text-[#666666] mb-2">あなたの現在地</p>
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-[#1E5BA8] leading-snug mb-10">
        あなたは今、
        <br className="sm:hidden" />
        「{result.name}」です
      </h1>

      <section className="bg-[#E8F0F9] rounded-2xl px-6 py-7 mb-6">
        <h2 className="text-base sm:text-lg font-bold text-[#1E5BA8] mb-4">
          あなたの現在地
        </h2>
        <p className="text-sm sm:text-base text-[#333333] leading-loose whitespace-pre-line">
          {result.currentSituation}
        </p>
      </section>

      <section className="bg-white border-2 border-[#E8F0F9] rounded-2xl px-6 py-7 mb-6">
        <h2 className="text-base sm:text-lg font-bold text-[#1E5BA8] mb-4">
          次の30日でやってみてほしいこと
        </h2>
        <ol className="space-y-4">
          {result.actions.map((action, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1E5BA8] text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-sm sm:text-base text-[#333333] leading-relaxed pt-0.5">
                {action}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#E8F0F9] rounded-2xl px-6 py-7 mb-10">
        <h2 className="text-base sm:text-lg font-bold text-[#1E5BA8] mb-4">
          本書から受け取ってほしいメッセージ
        </h2>
        <p className="text-sm sm:text-base text-[#333333] leading-loose">
          {result.message}
        </p>
      </section>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto sm:min-w-[280px] bg-white border-2 border-[#1E5BA8] hover:bg-[#E8F0F9] active:bg-[#D6E4F4] text-[#1E5BA8] font-bold text-base py-3 px-8 rounded-full transition-colors"
        >
          もう一度診断する
        </button>
        <p className="mt-6 text-xs text-[#666666]">
          読者特典 / 松山さん『50代から始めるライフデザイン』
        </p>
      </div>
    </div>
  );
}
