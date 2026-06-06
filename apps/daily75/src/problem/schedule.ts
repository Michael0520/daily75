import type { Problem } from "./types.ts";
import type { ProgressMap } from "../progress/types.ts";

/**
 * Selects the same problem for ALL users on a given day.
 * Pure function of date — no per-user state involved.
 * `nowMs` defaults to Date.now() but is injectable for testing.
 */
export function selectGlobalDailyProblem(problems: Problem[], nowMs = Date.now()): Problem {
  const dayIndex = Math.floor(nowMs / 86_400_000);
  return problems[dayIndex % problems.length];
}

/**
 * Selects today's problem from the user's UNSOLVED pool.
 * Different users may get different problems. Use for personal recommendations,
 * not for the shared daily challenge.
 */
export function selectPersonalDailyProblem(
  problems: Problem[],
  progress: ProgressMap,
  nowMs = Date.now(),
): Problem {
  const unsolved = problems.filter((p) => progress[p.id]?.status !== "solved");
  const pool = unsolved.length > 0 ? unsolved : problems;
  const dayIndex = Math.floor(nowMs / 86_400_000);
  return pool[dayIndex % pool.length];
}
