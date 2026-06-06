import { Users } from "lucide-react";
import { timeAgo } from "../lib/time.ts";
import type { BoardEntry } from "../social/types.ts";

interface Props {
  entries: BoardEntry[];
  loading: boolean;
  onSelectUser: (userId: string) => void;
}

const LANG_BADGE: Record<string, string> = {
  typescript: "bg-blue-500/15 text-blue-400",
  javascript: "bg-yellow-500/15 text-yellow-400",
};

export function DailyBoardTab({ entries, loading, onSelectUser }: Props) {
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="animate-pulse text-xs text-muted-foreground">Loading board…</span>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
        <Users className="h-6 w-6 opacity-30" />
        <span className="text-xs">No one has solved today's challenge yet.</span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="border-b px-3 py-2">
        <span className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{entries.length}</span> solved today · click
          to view solution
        </span>
      </div>
      <ul className="flex-1 overflow-y-auto py-1">
        {entries.map((e) => (
          <li key={e.userId}>
            <button
              onClick={() => onSelectUser(e.userId)}
              className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
            >
              <span className="w-5 shrink-0 text-center text-xs tabular-nums text-muted-foreground">
                {e.rank}
              </span>
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                {e.displayName[0].toUpperCase()}
              </div>
              <span className="min-w-0 flex-1 truncate text-foreground">{e.displayName}</span>
              <span
                className={`shrink-0 rounded px-1.5 py-0.5 text-xs ${LANG_BADGE[e.language] ?? ""}`}
              >
                {e.language === "typescript" ? "TS" : "JS"}
              </span>
              <span className="shrink-0 tabular-nums text-xs text-muted-foreground">
                {timeAgo(e.solvedAt)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
