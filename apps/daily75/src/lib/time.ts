const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const CUTOFFS: [number, Intl.RelativeTimeFormatUnit][] = [
  [60, "second"],
  [3600, "minute"],
  [86400, "hour"],
  [86400 * 30, "day"],
  [86400 * 365, "month"],
  [Infinity, "year"],
];

const DIVISORS: Record<string, number> = {
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
  month: 86400 * 30,
  year: 86400 * 365,
};

export function timeAgo(iso: string, nowMs = Date.now()): string {
  const diffSec = (new Date(iso).getTime() - nowMs) / 1000;
  const absDiff = Math.abs(diffSec);
  const [, unit] = CUTOFFS.find(([cutoff]) => absDiff < cutoff)!;
  return rtf.format(Math.round(diffSec / DIVISORS[unit]), unit);
}
