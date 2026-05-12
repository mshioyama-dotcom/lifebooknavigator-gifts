import { ResultType } from "@/types/quiz";

export function calculateResult(
  totalScore: number,
  resultTypes: ResultType[],
): ResultType {
  const result = resultTypes.find(
    (type) => totalScore >= type.minScore && totalScore <= type.maxScore,
  );
  if (!result) {
    return resultTypes[0];
  }
  return result;
}
