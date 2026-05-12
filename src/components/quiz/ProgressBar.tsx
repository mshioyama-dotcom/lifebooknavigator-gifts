type Props = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: Props) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm font-medium text-[#1E5BA8]">
          Q{current} / {total}
        </span>
        <span className="text-xs text-[#666666]">{percent}%</span>
      </div>
      <div className="w-full h-2 bg-[#E8F0F9] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#1E5BA8] transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
