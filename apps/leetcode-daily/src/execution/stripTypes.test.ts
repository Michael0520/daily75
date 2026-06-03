import { describe, expect, it } from "vite-plus/test";
import { stripTypeAnnotations } from "./stripTypes.ts";

describe("stripTypeAnnotations", () => {
  describe("parameter type annotations", () => {
    it("strips simple param types", () => {
      const code = "function twoSum(nums: number[], target: number) {}";
      expect(stripTypeAnnotations(code)).toBe("function twoSum(nums, target) {}");
    });

    it("strips union param types", () => {
      const code = "function foo(val: string | null) {}";
      expect(stripTypeAnnotations(code)).toBe("function foo(val) {}");
    });

    it("strips optional params", () => {
      const code = "function foo(a: number, b?: string) {}";
      expect(stripTypeAnnotations(code)).toBe("function foo(a, b) {}");
    });
  });

  describe("return type annotations", () => {
    it("strips return type before brace", () => {
      const code = "function twoSum(nums: number[], target: number): number[] {\n  return [];\n}";
      const result = stripTypeAnnotations(code);
      expect(result).toContain("function twoSum(nums, target) ");
      expect(result).not.toContain(": number[]");
    });

    it("strips void return type", () => {
      const code = "function foo(x: number): void {\n}";
      expect(stripTypeAnnotations(code)).not.toContain(": void");
    });
  });

  describe("generic type parameters", () => {
    it("strips function generics", () => {
      const code = "function identity<T>(val: T): T {\n  return val;\n}";
      expect(stripTypeAnnotations(code)).not.toContain("<T>");
    });
  });

  describe("as casts", () => {
    it("strips as-cast", () => {
      const code = "const x = foo() as number;";
      expect(stripTypeAnnotations(code)).not.toContain("as number");
    });

    it("does not eat array contents after as-cast", () => {
      const code = "return [map.get(complement) as number, i];";
      const result = stripTypeAnnotations(code);
      expect(result).toContain(", i]");
      expect(result).not.toContain("as number");
    });
  });

  describe("interface declarations", () => {
    it("removes interface block", () => {
      const code = "interface Foo {\n  bar: number;\n}\nfunction foo() {}";
      expect(stripTypeAnnotations(code)).not.toContain("interface");
      expect(stripTypeAnnotations(code)).toContain("function foo()");
    });

    it("removes type alias", () => {
      const code = "type Pair = [number, number];\nfunction foo() {}";
      expect(stripTypeAnnotations(code)).not.toContain("type Pair");
      expect(stripTypeAnnotations(code)).toContain("function foo()");
    });
  });

  describe("plain JavaScript passthrough", () => {
    it("leaves valid JS unchanged", () => {
      const code = "function twoSum(nums, target) {\n  return [0, 1];\n}";
      expect(stripTypeAnnotations(code)).toBe(code);
    });

    it("preserves arrow functions", () => {
      const code = "const f = (x) => x * 2;";
      expect(stripTypeAnnotations(code)).toBe(code);
    });
  });

  describe("realistic LeetCode patterns", () => {
    it("handles Two Sum TypeScript — stripped output runs correctly", () => {
      const ts = `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement) as number, i];
    map.set(nums[i], i);
  }
  return [];
}`;
      const js = stripTypeAnnotations(ts);
      // eslint-disable-next-line no-new-func
      const fn = new Function(`${js}; return twoSum;`)();
      expect(fn([2, 7, 11, 15], 9)).toEqual([0, 1]);
    });
  });
});
