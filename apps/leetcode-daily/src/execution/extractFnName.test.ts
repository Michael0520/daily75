import { describe, expect, it } from "vite-plus/test";
import { extractFnName } from "./extractFnName.ts";

describe("extractFnName", () => {
  it("extracts JS function declaration", () => {
    expect(extractFnName("function twoSum(nums, target) {}")).toBe("twoSum");
  });

  it("extracts Python def", () => {
    expect(extractFnName("def twoSum(nums, target):\n    pass")).toBe("twoSum");
  });

  it("handles camelCase names", () => {
    expect(extractFnName("function maxProfit(prices) {}")).toBe("maxProfit");
  });

  it("handles names with underscores", () => {
    expect(extractFnName("def max_profit(prices):\n    pass")).toBe("max_profit");
  });

  it("finds the first function in multi-function code", () => {
    const code = "function helper(x) {}\nfunction solution(n) {}";
    expect(extractFnName(code)).toBe("helper");
  });

  it("falls back to 'solution' when no match", () => {
    expect(extractFnName("const x = 1;")).toBe("solution");
    expect(extractFnName("")).toBe("solution");
  });

  it("handles TypeScript function with type annotations", () => {
    expect(extractFnName("function twoSum(nums: number[], target: number): number[] {}")).toBe(
      "twoSum",
    );
  });
});
