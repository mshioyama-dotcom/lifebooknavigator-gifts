"use client";

type Props = {
  title: string;
  subtitle: string;
  description: string[];
  onStart: () => void;
};

export default function TopScreen({
  title,
  subtitle,
  description,
  onStart,
}: Props) {
  return (
    <div className="w-full max-w-[600px] mx-auto px-6 py-12 sm:py-16 flex flex-col items-center text-center">
      <p className="text-sm sm:text-base text-[#666666] mb-3">{subtitle}</p>
      <h1
        className="text-2xl sm:text-3xl font-bold text-[#1E5BA8] leading-snug mb-10 break-keep"
        style={{ textWrap: "balance" }}
      >
        {title}
      </h1>

      <div className="bg-[#E8F0F9] rounded-2xl px-6 py-8 mb-10 w-full">
        <ul className="space-y-3 text-left">
          {description.map((line, i) => (
            <li
              key={i}
              className="text-sm sm:text-base text-[#333333] leading-relaxed"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onStart}
        className="w-full sm:w-auto sm:min-w-[280px] bg-[#1E5BA8] hover:bg-[#174785] active:bg-[#143d72] text-white font-bold text-base sm:text-lg py-4 px-8 rounded-full shadow-md transition-colors"
      >
        診断を始める
      </button>

      <p className="mt-8 text-xs text-[#666666]">
        読者特典『50代から始めるライフデザイン』
      </p>
    </div>
  );
}
