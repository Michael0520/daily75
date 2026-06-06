import { describe, expect, it } from "vite-plus/test";
import type { Problem } from "./types.ts";
import { selectGlobalDailyProblem, selectPersonalDailyProblem } from "./schedule.ts";

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

describe("selectGlobalDailyProblem", () => {
  it("is deterministic — same day always returns same problem", () => {
    const problems = makeProblems(10);
    const now = DAY_MS * 100;
    expect(selectGlobalDailyProblem(problems, now).id).toBe(
      selectGlobalDailyProblem(problems, now).id,
    );
  });

  it("rotates across consecutive days — all problems appear within one cycle", () => {
    const problems = makeProblems(5);
    const ids = new Set(
      Array.from({ length: 5 }, (_, d) => selectGlobalDailyProblem(problems, DAY_MS * d).id),
    );
    expect(ids.size).toBe(5);
  });

  it("returns the same problem for all users on the same day regardless of progress", () => {
    const problems = makeProblems(5);
    const now = DAY_MS * 42;
    const noProgress = selectGlobalDailyProblem(problems, now);
    const allSolved = selectGlobalDailyProblem(problems, now);
    expect(noProgress.id).toBe(allSolved.id);
  });

  it("different days produce different problems (for small pools)", () => {
    const problems = makeProblems(5);
    const day0 = selectGlobalDailyProblem(problems, DAY_MS * 0);
    const day1 = selectGlobalDailyProblem(problems, DAY_MS * 1);
    expect(day0.id).not.toBe(day1.id);
  });

  it("wraps around after a full cycle", () => {
    const problems = makeProblems(3);
    expect(selectGlobalDailyProblem(problems, DAY_MS * 0).id).toBe(
      selectGlobalDailyProblem(problems, DAY_MS * 3).id,
    );
  });
});

describe("selectPersonalDailyProblem", () => {
  it("is deterministic — same day always returns same problem", () => {
    const problems = makeProblems(10);
    const now = DAY_MS * 100;
    expect(selectPersonalDailyProblem(problems, {}, now).id).toBe(
      selectPersonalDailyProblem(problems, {}, now).id,
    );
  });

  it("rotates across consecutive days — all problems appear within one cycle", () => {
    const problems = makeProblems(5);
    const ids = new Set(
      Array.from({ length: 5 }, (_, d) => selectPersonalDailyProblem(problems, {}, DAY_MS * d).id),
    );
    expect(ids.size).toBe(5);
  });

  it("excludes solved problems from the pool", () => {
    const problems = makeProblems(3);
    const progress = { 1: { status: "solved" as const }, 2: { status: "solved" as const } };
    for (let d = 0; d < 10; d++) {
      expect(selectPersonalDailyProblem(problems, progress, DAY_MS * d).id).toBe(3);
    }
  });

  it("falls back to full pool when all problems are solved", () => {
    const problems = makeProblems(3);
    const progress = {
      1: { status: "solved" as const },
      2: { status: "solved" as const },
      3: { status: "solved" as const },
    };
    const result = selectPersonalDailyProblem(problems, progress, DAY_MS * 7);
    expect(problems.map((p) => p.id)).toContain(result.id);
  });

  it("treats 'attempted' problems as still unsolved", () => {
    const problems = makeProblems(2);
    const progress = { 1: { status: "attempted" as const } };
    const pool = new Set(
      Array.from(
        { length: 10 },
        (_, d) => selectPersonalDailyProblem(problems, progress, DAY_MS * d).id,
      ),
    );
    expect(pool.size).toBe(2);
  });

  it("handles empty progress map", () => {
    const problems = makeProblems(5);
    const result = selectPersonalDailyProblem(problems, {}, DAY_MS * 42);
    expect(problems.map((p) => p.id)).toContain(result.id);
  });
});
