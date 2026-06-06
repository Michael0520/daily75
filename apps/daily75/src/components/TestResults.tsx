import { CheckCircle2, CirclePlay, Loader2, TriangleAlert, XCircle } from "lucide-react";
import type { TestResult } from "../execution/types.ts";
import { ScrollArea } from "./ui/scroll-area.tsx";

interface Props {
  results: TestResult[] | null;
  error: string | null;
  running: boolean;
}

export function TestResults({ results, error, running }: Props) {
  if (running) {
    return (
      <div className="flex h-full items-center justify-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        running tests…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3">
        <div className="mb-2 flex items-center gap-1.5">
          <TriangleAlert className="h-3.5 w-3.5 text-red-400" />
          <p className="text-xs font-medium text-red-400">Error</p>
        </div>
        <pre className="whitespace-pre-wrap font-mono text-xs text-red-400/80">{error}</pre>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
        <CirclePlay className="h-6 w-6 opacity-30" />
        <p className="text-sm">Run tests to see results</p>
      </div>
    );
  }

  const passed = results.filter((r) => r.passed).length;
  const allPassed = passed === results.length;

  return (
    <ScrollArea className="h-full">
      <div className="space-y-2 p-3">
        <p className={`text-sm font-medium ${allPassed ? "text-primary" : "text-red-400"}`}>
          {passed}/{results.length} passed
        </p>
        {results.map((r, i) => (
          <div
            key={i}
            className={`rounded border p-2 text-xs ${
              r.passed ? "border-primary/20 bg-primary/5" : "border-red-500/20 bg-red-500/5"
            }`}
          >
            <div className="mb-1 flex items-center gap-1.5">
              {r.passed ? (
                <CheckCircle2 className="h-3 w-3 text-primary" />
              ) : (
                <XCircle className="h-3 w-3 text-red-400" />
              )}
              <span className="font-medium text-foreground">Case {i + 1}</span>
            </div>
            <p className="font-mono text-muted-foreground">Input: {JSON.stringify(r.input)}</p>
            <p className="font-mono text-muted-foreground">
              Expected: {JSON.stringify(r.expected)}
            </p>
            {!r.passed && (
              <p className="font-mono text-red-400">
                Got: {r.error ?? (r.actual === undefined ? "undefined" : JSON.stringify(r.actual))}
              </p>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
