import { describe, expect, it } from "vite-plus/test";
import type { Problem } from "./types.ts";
import { filterProblems } from "./filter.ts";

const make = (
  id: number,
  topics: Problem["topics"],
  difficulty: Problem["difficulty"],
): Problem => ({
  id,
  slug: `p-${id}`,
  title: `Problem ${id}`,
  difficulty,
  topics,
  description: "",
  examples: [],
  constraints: [],
  testCases: [],
  starterJs: "",
  solutionJs: "",
  solutionExplanation: "",
});

const problems: Problem[] = [
  make(1, ["Array"], "Easy"),
  make(2, ["Array", "Dynamic Programming"], "Medium"),
  make(3, ["Tree"], "Hard"),
  make(4, ["Graph"], "Medium"),
  make(5, ["Dynamic Programming"], "Easy"),
];

describe("filterProblems", () => {
  it("returns all problems when both filters are 'all'", () => {
    expect(filterProblems(problems, { topic: "all", difficulty: "all" })).toHaveLength(5);
  });

  it("filters by topic", () => {
    const result = filterProblems(problems, { topic: "Array", difficulty: "all" });
    expect(result.map((p) => p.id)).toEqual([1, 2]);
  });

  it("filters by difficulty", () => {
    const result = filterProblems(problems, { topic: "all", difficulty: "Easy" });
    expect(result.map((p) => p.id)).toEqual([1, 5]);
  });

  it("filters by both topic and difficulty", () => {
    const result = filterProblems(problems, { topic: "Dynamic Programming", difficulty: "Medium" });
    expect(result.map((p) => p.id)).toEqual([2]);
  });

  it("returns empty array when no match", () => {
    const result = filterProblems(problems, { topic: "Heap", difficulty: "Hard" });
    expect(result).toHaveLength(0);
  });

  it("matches problems with multiple topics", () => {
    const result = filterProblems(problems, { topic: "Dynamic Programming", difficulty: "all" });
    expect(result.map((p) => p.id)).toEqual([2, 5]);
  });

  it("returns empty array for empty input", () => {
    expect(filterProblems([], { topic: "all", difficulty: "all" })).toHaveLength(0);
  });
});
