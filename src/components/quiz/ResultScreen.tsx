"use client";

import { ResultType } from "@/types/quiz";

type Props = {
  result: ResultType;
  onRestart: () => void;
};

export default function ResultScreen({ result, onRestart }: Props) {
  const handlePrint = () => {
    // ブラウザの印刷ダイアログを開く（PDFとして保存可能）
    window.print();
  };

  return (
    <div className="w-full max-w-[600px] mx-auto px-6 py-8 sm:py-12 print-area">
      <p className="text-center text-sm text-[#666666] mb-2 no-print">
        あなたの現在地
      </p>
      <h1
        className="text-center text-2xl sm:text-3xl font-bold text-[#1E5BA8] leading-snug mb-10 break-keep"
        style={{ textWrap: "balance" }}
      >
        あなたは今、「{result.name}」です
      </h1>

      <section className="bg-[#E8F0F9] rounded-2xl px-6 py-7 mb-6 print-section">
        <h2 className="text-base sm:text-lg font-bold text-[#1E5BA8] mb-4">
          あなたの現在地
        </h2>
        <p className="text-sm sm:text-base text-[#333333] leading-loose whitespace-pre-line">
          {result.currentSituation}
        </p>
      </section>

      <section className="bg-white border-2 border-[#E8F0F9] rounded-2xl px-6 py-7 mb-6 print-section">
        <h2 className="text-base sm:text-lg font-bold text-[#1E5BA8] mb-4">
          次の30日でやってみてほしいこと
        </h2>
        <ol className="space-y-5">
          {result.actions.map((action, i) => (
            <li key={i} className="flex gap-3 print-section">
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

      <section className="bg-[#E8F0F9] rounded-2xl px-6 py-7 mb-6 print-section">
        <h2 className="text-base sm:text-lg font-bold text-[#1E5BA8] mb-4">
          本書から受け取ってほしいメッセージ
        </h2>
        <p className="text-sm sm:text-base text-[#333333] leading-loose">
          {result.message}
        </p>
      </section>

      <p className="text-center text-xs text-[#999999] mb-4">
        読者特典『50代から始めるライフデザイン』
      </p>

      <div className="flex flex-col gap-3 mt-6 no-print">
        <button
          onClick={handlePrint}
          className="w-full bg-[#1E5BA8] hover:bg-[#174785] active:bg-[#143d72] text-white font-bold text-base py-4 px-6 rounded-full shadow-md transition-colors"
        >
          📄 結果をPDFで保存・印刷する
        </button>
        <p className="text-xs text-[#666666] text-center px-4 leading-relaxed">
          表示される画面で「送信先」→「PDFに保存」を選んでください。
          紙に印刷もできます。
        </p>
        <button
          onClick={onRestart}
          className="w-full bg-white border-2 border-[#1E5BA8] hover:bg-[#E8F0F9] active:bg-[#D6E4F4] text-[#1E5BA8] font-bold text-base py-3 px-6 rounded-full transition-colors mt-2"
        >
          もう一度診断する
        </button>
      </div>

      <p className="mt-6 text-center text-xs text-[#666666] no-print">
        この結果はあなたの読者特典です。手元に残してご活用ください。
      </p>
    </div>
  );
}
