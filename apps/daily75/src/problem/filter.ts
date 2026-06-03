import type { Difficulty, Problem, Topic } from "./types.ts";

export interface ProblemFilters {
  topic: Topic | "all";
  difficulty: Difficulty | "all";
}

export function filterProblems(problems: Problem[], filters: ProblemFilters): Problem[] {
  return problems.filter(
    (p) =>
      (filters.topic === "all" || p.topics.includes(filters.topic as Topic)) &&
      (filters.difficulty === "all" || p.difficulty === filters.difficulty),
  );
}
