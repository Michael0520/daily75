import { CheckCircle2, XCircle } from "lucide-react";
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
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Running…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3">
        <p className="mb-1 text-xs font-medium text-red-500">Error</p>
        <pre className="whitespace-pre-wrap font-mono text-xs text-red-400">{error}</pre>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Run tests to see results
      </div>
    );
  }

  const passed = results.filter((r) => r.passed).length;

  return (
    <ScrollArea className="h-full">
      <div className="p-3 space-y-3">
        <p
          className={`text-sm font-medium ${passed === results.length ? "text-green-500" : "text-red-500"}`}
        >
          {passed}/{results.length} passed
        </p>
        {results.map((r, i) => (
          <div
            key={i}
            className={`rounded-md border p-2 text-xs ${r.passed ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}
          >
            <div className="flex items-center gap-1 mb-1">
              {r.passed ? (
                <CheckCircle2 className="h-3 w-3 text-green-500" />
              ) : (
                <XCircle className="h-3 w-3 text-red-500" />
              )}
              <span className="font-medium">Case {i + 1}</span>
            </div>
            <p className="font-mono text-muted-foreground">Input: {JSON.stringify(r.input)}</p>
            <p className="font-mono text-muted-foreground">
              Expected: {JSON.stringify(r.expected)}
            </p>
            {!r.passed && (
              <p className="font-mono text-red-400">Got: {r.error ?? JSON.stringify(r.actual)}</p>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
