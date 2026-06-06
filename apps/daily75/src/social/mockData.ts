import type { BoardEntry } from "./types.ts";

const BASE = Date.now();

export const MOCK_BOARD: BoardEntry[] = [
  {
    userId: "u1",
    displayName: "Alice",
    avatarUrl: null,
    solvedAt: new Date(BASE - 7200000).toISOString(),
    language: "typescript",
    rank: 1,
  },
  {
    userId: "u2",
    displayName: "Bob",
    avatarUrl: null,
    solvedAt: new Date(BASE - 5400000).toISOString(),
    language: "javascript",
    rank: 2,
  },
  {
    userId: "u3",
    displayName: "Carol",
    avatarUrl: null,
    solvedAt: new Date(BASE - 3600000).toISOString(),
    language: "typescript",
    rank: 3,
  },
  {
    userId: "u4",
    displayName: "David",
    avatarUrl: null,
    solvedAt: new Date(BASE - 1800000).toISOString(),
    language: "javascript",
    rank: 4,
  },
  {
    userId: "u5",
    displayName: "Eve",
    avatarUrl: null,
    solvedAt: new Date(BASE - 900000).toISOString(),
    language: "typescript",
    rank: 5,
  },
];

export const MOCK_SOLUTIONS: Record<string, string> = {
  u1: `function twoSum(nums: number[], target: number): number[] {\n  const map = new Map<number, number>();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp)!, i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
  u2: `function twoSum(nums, target) {\n  const seen = {};\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (need in seen) return [seen[need], i];\n    seen[nums[i]] = i;\n  }\n}`,
  u3: `function twoSum(nums: number[], target: number): number[] {\n  const m = new Map<number, number>();\n  for (const [i, n] of nums.entries()) {\n    if (m.has(target - n)) return [m.get(target - n)!, i];\n    m.set(n, i);\n  }\n  return [];\n}`,
  u4: `function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++)\n    for (let j = i + 1; j < nums.length; j++)\n      if (nums[i] + nums[j] === target) return [i, j];\n}`,
  u5: `function twoSum(nums: number[], target: number): number[] {\n  return nums.reduce((acc, n, i) => {\n    const j = nums.indexOf(target - n);\n    return j !== -1 && j !== i ? [i, j] : acc;\n  }, [] as number[]);\n}`,
};
