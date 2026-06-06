import { describe, it, expect } from "vite-plus/test";
import { computeStreak } from "./useStreak.ts";
import { blind75 } from "../problem/blind75.ts";
import { selectGlobalDailyProblem } from "../problem/schedule.ts";
import type { ProgressMap } from "./types.ts";

const DAY_MS = 86_400_000;
const BASE_NOW = new Date("2026-06-06T10:00:00Z").getTime();

function dailyIdAt(offsetDays: number): number {
  return selectGlobalDailyProblem(blind75, BASE_NOW + offsetDays * DAY_MS).id;
}

describe("computeStreak", () => {
  it("returns 0 when no problems solved", () => {
    expect(computeStreak(blind75, {}, BASE_NOW)).toBe(0);
  });

  it("returns 0 when today is not solved", () => {
    const progress: ProgressMap = {
      [dailyIdAt(-1)]: { status: "solved" },
    };
    expect(computeStreak(blind75, progress, BASE_NOW)).toBe(0);
  });

  it("returns 1 when only today is solved", () => {
    const progress: ProgressMap = {
      [dailyIdAt(0)]: { status: "solved" },
    };
    expect(computeStreak(blind75, progress, BASE_NOW)).toBe(1);
  });

  it("returns 3 for three consecutive days including today", () => {
    const progress: ProgressMap = {
      [dailyIdAt(0)]: { status: "solved" },
      [dailyIdAt(-1)]: { status: "solved" },
      [dailyIdAt(-2)]: { status: "solved" },
    };
    expect(computeStreak(blind75, progress, BASE_NOW)).toBe(3);
  });

  it("stops counting at a gap in the streak", () => {
    const progress: ProgressMap = {
      [dailyIdAt(0)]: { status: "solved" },
      [dailyIdAt(-1)]: { status: "solved" },
      // day -2 missing
      [dailyIdAt(-3)]: { status: "solved" },
    };
    expect(computeStreak(blind75, progress, BASE_NOW)).toBe(2);
  });

  it("does not count attempted as solved", () => {
    const progress: ProgressMap = {
      [dailyIdAt(0)]: { status: "attempted" },
    };
    expect(computeStreak(blind75, progress, BASE_NOW)).toBe(0);
  });
});
