"use client";

import { useRef, useState } from "react";
import { ResultType } from "@/types/quiz";

type Props = {
  result: ResultType;
  onRestart: () => void;
};

export default function ResultScreen({ result, onRestart }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!contentRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      // 日本語Webフォント(Noto Sans JP)が完全に読み込まれてからキャプチャ
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      } else {
        // 複数ページに分割
        let yOffset = 0;
        let pageIndex = 0;
        while (yOffset < imgHeight) {
          if (pageIndex > 0) pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, -yOffset, imgWidth, imgHeight);
          yOffset += pageHeight;
          pageIndex += 1;
        }
      }
      pdf.save(`診断結果_${result.name}.pdf`);
    } catch (err) {
      console.error("PDF生成に失敗しました:", err);
      alert(
        "PDFの生成に失敗しました。お手数ですが、もう一度お試しください。",
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-[600px] mx-auto px-6 py-8 sm:py-12">
      <div ref={contentRef} className="bg-white">
        <p className="text-center text-sm text-[#666666] mb-2">あなたの現在地</p>
        <h1
          className="text-center text-2xl sm:text-3xl font-bold text-[#1E5BA8] leading-snug mb-10 break-keep"
          style={{ textWrap: "balance" }}
        >
          あなたは今、「{result.name}」です
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
          <ol className="space-y-5">
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

        <section className="bg-[#E8F0F9] rounded-2xl px-6 py-7 mb-6">
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
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="w-full bg-[#1E5BA8] hover:bg-[#174785] active:bg-[#143d72] disabled:bg-[#A8BDD7] disabled:cursor-wait text-white font-bold text-base py-4 px-6 rounded-full shadow-md transition-colors"
        >
          {isDownloading ? "PDFを作成中…" : "📄 結果をPDFでダウンロード"}
        </button>
        <button
          onClick={onRestart}
          className="w-full bg-white border-2 border-[#1E5BA8] hover:bg-[#E8F0F9] active:bg-[#D6E4F4] text-[#1E5BA8] font-bold text-base py-3 px-6 rounded-full transition-colors"
        >
          もう一度診断する
        </button>
      </div>

      <p className="mt-6 text-center text-xs text-[#666666]">
        この結果はあなたの読者特典です。手元に残してご活用ください。
      </p>
    </div>
  );
}
