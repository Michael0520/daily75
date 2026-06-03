import type { Problem } from "../data/types.ts";
import { Badge } from "./ui/badge.tsx";
import { ScrollArea } from "./ui/scroll-area.tsx";

const diffColor = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

interface Props {
  problem: Problem;
}

export function ProblemDescription({ problem }: Props) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{problem.title}</h2>
          <Badge className={diffColor[problem.difficulty]}>{problem.difficulty}</Badge>
          {problem.topics.map((t) => (
            <Badge key={t} variant="outline" className="text-xs">
              {t}
            </Badge>
          ))}
        </div>

        <div className="whitespace-pre-wrap text-sm leading-relaxed">{problem.description}</div>

        <div className="space-y-3">
          {problem.examples.map((ex, i) => (
            <div key={i} className="rounded-md bg-muted p-3 text-sm">
              <p className="font-medium">Example {i + 1}</p>
              <p className="mt-1">
                <span className="font-mono text-xs">Input:</span> {ex.input}
              </p>
              <p>
                <span className="font-mono text-xs">Output:</span> {ex.output}
              </p>
              {ex.explanation && <p className="mt-1 text-muted-foreground">{ex.explanation}</p>}
            </div>
          ))}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Constraints</p>
          <ul className="space-y-1">
            {problem.constraints.map((c, i) => (
              <li key={i} className="font-mono text-xs text-muted-foreground">
                • {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ScrollArea>
  );
}
