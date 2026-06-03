import type { Problem } from "./types.ts";
import type { ProgressMap } from "../progress/types.ts";

/**
 * Deterministically selects today's problem from the unsolved pool.
 * Falls back to the full list once all problems are solved.
 * `nowMs` defaults to Date.now() but is injectable for testing.
 */
export function selectDailyProblem(
  problems: Problem[],
  progress: ProgressMap,
  nowMs = Date.now(),
): Problem {
  const unsolved = problems.filter((p) => progress[p.id]?.status !== "solved");
  const pool = unsolved.length > 0 ? unsolved : problems;
  const dayIndex = Math.floor(nowMs / 86_400_000);
  return pool[dayIndex % pool.length];
}
