import { useMemo } from "react";
import { blind75 } from "./blind75.ts";
import { selectGlobalDailyProblem } from "./schedule.ts";
import type { Problem } from "./types.ts";

export function useDailyProblem(): Problem {
  return useMemo(() => selectGlobalDailyProblem(blind75), []);
}
