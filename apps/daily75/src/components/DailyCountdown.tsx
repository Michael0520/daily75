import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

function msTilMidnightUTC(): number {
  const now = Date.now();
  const nextMidnight = (Math.floor(now / 86_400_000) + 1) * 86_400_000;
  return nextMidnight - now;
}

function formatMs(ms: number): string {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((s % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${h}:${m}:${sec}`;
}

export function DailyCountdown() {
  const [remaining, setRemaining] = useState(msTilMidnightUTC);

  useEffect(() => {
    const id = setInterval(() => setRemaining(msTilMidnightUTC()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="flex items-center gap-1 tabular-nums text-xs text-muted-foreground">
      <Timer className="h-3 w-3 opacity-50" />
      {formatMs(remaining)}
    </span>
  );
}
