import { Lock } from "lucide-react";
import type { Language } from "../execution/types.ts";
import type { Problem } from "../problem/types.ts";
import { ScrollArea } from "./ui/scroll-area.tsx";
import { ShikiCode } from "./ShikiCode.tsx";

interface Props {
  problem: Problem;
  language: Language;
  unlocked: boolean;
}

export function SolutionViewer({ problem, language, unlocked }: Props) {
  if (!unlocked) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
        <Lock className="h-6 w-6 opacity-40" />
        <p className="text-xs">
          Press{" "}
          <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">
            ⌘↵
          </kbd>{" "}
          to run and unlock
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-3 p-3">
        <ShikiCode code={problem.solutionJs} lang={language} />
        <div className="rounded-md bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
          {problem.solutionExplanation}
        </div>
      </div>
    </ScrollArea>
  );
}
