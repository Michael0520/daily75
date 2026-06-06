import { useMemo } from "react";
import type { Problem } from "../problem/types.ts";
import type { ProgressMap } from "./types.ts";
import { blind75 } from "../problem/blind75.ts";
import { selectGlobalDailyProblem } from "../problem/schedule.ts";

export function computeStreak(
  problems: Problem[],
  progress: ProgressMap,
  nowMs = Date.now(),
): number {
  const DAY_MS = 86_400_000;
  let streak = 0;
  let day = Math.floor(nowMs / DAY_MS);
  while (streak <= 365) {
    const problem = selectGlobalDailyProblem(problems, day * DAY_MS);
    if (progress[problem.id]?.status !== "solved") break;
    streak++;
    day--;
  }
  return streak;
}

export function useStreak(progress: ProgressMap): number {
  return useMemo(() => computeStreak(blind75, progress), [progress]);
}
