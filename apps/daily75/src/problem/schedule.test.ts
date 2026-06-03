import { describe, expect, it } from "vite-plus/test";
import type { Problem } from "./types.ts";
import { selectDailyProblem } from "./schedule.ts";

const DAY_MS = 86_400_000;

const makeProblems = (n: number): Problem[] =>
  Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    slug: `problem-${i + 1}`,
    title: `Problem ${i + 1}`,
    difficulty: "Easy" as const,
    topics: ["Array" as const],
    description: "",
    examples: [],
    constraints: [],
    testCases: [],
    starterJs: "",
    solutionJs: "",
    solutionExplanation: "",
  }));

describe("selectDailyProblem", () => {
  it("is deterministic — same day always returns same problem", () => {
    const problems = makeProblems(10);
    const now = DAY_MS * 100;
    expect(selectDailyProblem(problems, {}, now).id).toBe(selectDailyProblem(problems, {}, now).id);
  });

  it("rotates across consecutive days — all problems appear within one cycle", () => {
    const problems = makeProblems(5);
    const ids = new Set(
      Array.from({ length: 5 }, (_, d) => selectDailyProblem(problems, {}, DAY_MS * d).id),
    );
    expect(ids.size).toBe(5);
  });

  it("excludes solved problems from the pool", () => {
    const problems = makeProblems(3);
    const progress = { 1: { status: "solved" as const }, 2: { status: "solved" as const } };
    for (let d = 0; d < 10; d++) {
      expect(selectDailyProblem(problems, progress, DAY_MS * d).id).toBe(3);
    }
  });

  it("falls back to full pool when all problems are solved", () => {
    const problems = makeProblems(3);
    const progress = {
      1: { status: "solved" as const },
      2: { status: "solved" as const },
      3: { status: "solved" as const },
    };
    const result = selectDailyProblem(problems, progress, DAY_MS * 7);
    expect(problems.map((p) => p.id)).toContain(result.id);
  });

  it("treats 'attempted' problems as still unsolved", () => {
    const problems = makeProblems(2);
    const progress = { 1: { status: "attempted" as const } };
    const pool = new Set(
      Array.from({ length: 10 }, (_, d) => selectDailyProblem(problems, progress, DAY_MS * d).id),
    );
    expect(pool.size).toBe(2);
  });

  it("handles empty progress map", () => {
    const problems = makeProblems(5);
    const result = selectDailyProblem(problems, {}, DAY_MS * 42);
    expect(problems.map((p) => p.id)).toContain(result.id);
  });
});
