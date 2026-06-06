import { useMemo } from "react";
import type { ProgressMap } from "./types.ts";
import { blind75 } from "../problem/blind75.ts";
import { selectGlobalDailyProblem } from "../problem/schedule.ts";

export function useStreak(progress: ProgressMap): number {
  return useMemo(() => {
    const DAY_MS = 86_400_000;
    let streak = 0;
    let day = Math.floor(Date.now() / DAY_MS);
    while (streak <= 365) {
      const problem = selectGlobalDailyProblem(blind75, day * DAY_MS);
      if (progress[problem.id]?.status !== "solved") break;
      streak++;
      day--;
    }
    return streak;
  }, [progress]);
}
