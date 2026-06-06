import { X } from "lucide-react";
import type { PeerSolution } from "../social/types.ts";
import { ShikiCode } from "./ShikiCode.tsx";

interface Props {
  solution: PeerSolution | null;
  loading: boolean;
  onClose: () => void;
}

export function PeerCodeViewer({ solution, loading, onClose }: Props) {
  return (
    <div className="flex h-full flex-col border-l bg-background">
      <div className="flex h-9 shrink-0 items-center justify-between border-b px-3">
        <span className="text-xs font-medium text-foreground">
          {loading ? "Loading…" : solution ? `${solution.displayName}'s solution` : "Solution"}
        </span>
        <button
          aria-label="Close"
          onClick={onClose}
          className="rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-3">
        {loading && (
          <p className="animate-pulse text-xs text-muted-foreground">Loading solution…</p>
        )}
        {!loading && !solution && (
          <p className="text-xs text-muted-foreground">Solution not available.</p>
        )}
        {!loading && solution && <ShikiCode code={solution.code} lang={solution.language} />}
      </div>
    </div>
  );
}
