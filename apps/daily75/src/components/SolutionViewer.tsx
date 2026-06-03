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
        <Lock className="h-8 w-8" />
        <p className="text-sm">Submit at least once to unlock</p>
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
