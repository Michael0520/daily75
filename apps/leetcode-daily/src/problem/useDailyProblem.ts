import { useMemo } from "react";
import type { ProgressMap } from "../progress/types.ts";
import { blind75 } from "./blind75.ts";
import { selectDailyProblem } from "./schedule.ts";
import type { Problem } from "./types.ts";

export function useDailyProblem(progress: ProgressMap): Problem {
  return useMemo(() => selectDailyProblem(blind75, progress), [progress]);
}
