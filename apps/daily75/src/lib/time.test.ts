import { describe, it, expect } from "vite-plus/test";
import { timeAgo } from "./time.ts";

const NOW = new Date("2026-01-01T12:00:00Z").getTime();

function iso(offsetMs: number) {
  return new Date(NOW + offsetMs).toISOString();
}

describe("timeAgo", () => {
  it("returns 'now' for 0 seconds", () => {
    expect(timeAgo(iso(0), NOW)).toBe("now");
  });

  it("returns seconds for < 60s ago", () => {
    expect(timeAgo(iso(-30_000), NOW)).toMatch(/30 seconds ago/);
  });

  it("returns minutes for < 1h ago", () => {
    expect(timeAgo(iso(-5 * 60_000), NOW)).toMatch(/5 minutes ago/);
  });

  it("returns hours for < 24h ago", () => {
    expect(timeAgo(iso(-2 * 3_600_000), NOW)).toMatch(/2 hours ago/);
  });

  it("returns days for < 30 days ago", () => {
    expect(timeAgo(iso(-3 * 86_400_000), NOW)).toMatch(/3 days ago/);
  });

  it("returns months for < 365 days ago", () => {
    expect(timeAgo(iso(-60 * 86_400_000), NOW)).toMatch(/2 months ago/);
  });

  it("returns years for > 365 days ago", () => {
    expect(timeAgo(iso(-400 * 86_400_000), NOW)).toMatch(/last year/);
  });

  it("handles future timestamps", () => {
    expect(timeAgo(iso(60_000), NOW)).toMatch(/in 1 minute/);
  });
});
