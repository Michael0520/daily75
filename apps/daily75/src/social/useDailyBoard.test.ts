import { describe, expect, it } from "vite-plus/test";
import { MOCK_BOARD, MOCK_SOLUTIONS } from "./mockData.ts";

describe("MOCK_BOARD", () => {
  it("entries are sorted by rank", () => {
    for (let i = 1; i < MOCK_BOARD.length; i++) {
      expect(MOCK_BOARD[i].rank).toBeGreaterThan(MOCK_BOARD[i - 1].rank);
    }
  });

  it("all entries have required fields", () => {
    for (const e of MOCK_BOARD) {
      expect(e.userId).toBeTruthy();
      expect(e.displayName).toBeTruthy();
      expect(["javascript", "typescript"]).toContain(e.language);
      expect(new Date(e.solvedAt).getTime()).not.toBeNaN();
    }
  });

  it("all board entries have a matching mock solution", () => {
    for (const e of MOCK_BOARD) {
      expect(MOCK_SOLUTIONS[e.userId]).toBeTruthy();
    }
  });

  it("solvedAt timestamps are in the past", () => {
    const now = Date.now();
    for (const e of MOCK_BOARD) {
      expect(new Date(e.solvedAt).getTime()).toBeLessThan(now);
    }
  });

  it("later ranks solved later than earlier ranks", () => {
    for (let i = 1; i < MOCK_BOARD.length; i++) {
      const prev = new Date(MOCK_BOARD[i - 1].solvedAt).getTime();
      const curr = new Date(MOCK_BOARD[i].solvedAt).getTime();
      expect(curr).toBeGreaterThan(prev);
    }
  });
});
