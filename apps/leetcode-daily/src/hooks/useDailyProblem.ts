import { useMemo } from "react";
import { blind75 } from "../data/blind75.ts";
import type { Problem } from "../data/types.ts";
import type { ProgressMap } from "./useProgress.ts";

export function useDailyProblem(progress: ProgressMap): Problem {
  return useMemo(() => {
    const unsolved = blind75.filter((p) => progress[p.id]?.status !== "solved");
    const pool = unsolved.length > 0 ? unsolved : blind75;
    const dayIndex = Math.floor(Date.now() / 86_400_000);
    return pool[dayIndex % pool.length];
  }, [progress]);
}
