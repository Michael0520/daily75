import { CheckCircle, Clock, XCircle } from "lucide-react";
import type { Submission } from "../progress/useSubmissions.ts";

interface Props {
  submissions: Submission[];
  loading: boolean;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function SubmissionHistory({ submissions, loading }: Props) {
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="animate-pulse text-xs text-muted-foreground">Loading…</span>
      </div>
    );
  }
  if (submissions.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-xs text-muted-foreground">No submissions yet.</span>
      </div>
    );
  }
  return (
    <ul className="h-full overflow-y-auto py-1">
      {submissions.map((s) => (
        <li key={s.id} className="flex items-center gap-3 px-3 py-2 text-xs text-muted-foreground">
          {s.passed ? (
            <CheckCircle className="h-3.5 w-3.5 shrink-0 text-primary" />
          ) : (
            <XCircle className="h-3.5 w-3.5 shrink-0 text-red-400" />
          )}
          <span className={s.passed ? "text-foreground" : ""}>
            {s.passed ? "Accepted" : "Wrong Answer"}
          </span>
          <span className="uppercase">{s.language === "typescript" ? "TS" : "JS"}</span>
          <span className="ml-auto flex items-center gap-1 tabular-nums">
            <Clock className="h-3 w-3" />
            {timeAgo(s.createdAt)}
          </span>
        </li>
      ))}
    </ul>
  );
}
