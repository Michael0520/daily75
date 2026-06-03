import MonacoEditor from "@monaco-editor/react";
import { Lock } from "lucide-react";
import type { Problem } from "../data/types.ts";
import type { Language } from "../lib/codeRunner.ts";
import { ScrollArea } from "./ui/scroll-area.tsx";

interface Props {
  problem: Problem;
  language: Language;
  unlocked: boolean;
}

export function SolutionViewer({ problem, language, unlocked }: Props) {
  const code = language === "python" ? problem.solutionPy : problem.solutionJs;

  if (!unlocked) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
        <Lock className="h-8 w-8" />
        <p className="text-sm">Submit at least once to unlock</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-3 p-3">
        <div className="h-48 overflow-hidden rounded-md border">
          <MonacoEditor
            height="100%"
            language={language === "python" ? "python" : "javascript"}
            value={code}
            theme="vs-dark"
            options={{
              readOnly: true,
              fontSize: 12,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
          />
        </div>
        <div className="rounded-md bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
          {problem.solutionExplanation}
        </div>
      </div>
    </ScrollArea>
  );
}
