import { CheckCircle, Circle, Clock } from "lucide-react";
import { useState } from "react";
import { blind75 } from "../problem/blind75.ts";
import { filterProblems } from "../problem/filter.ts";
import type { Difficulty, Topic } from "../problem/types.ts";
import type { ProgressMap } from "../progress/types.ts";
import { cn } from "../lib/utils.ts";
import { Badge } from "./ui/badge.tsx";
import { ScrollArea } from "./ui/scroll-area.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select.tsx";

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];
const TOPICS: Topic[] = [
  "Array",
  "Binary",
  "Dynamic Programming",
  "Graph",
  "Interval",
  "Linked List",
  "Matrix",
  "String",
  "Tree",
  "Heap",
];

const diffColor: Record<Difficulty, string> = {
  Easy: "text-emerald-400",
  Medium: "text-amber-400",
  Hard: "text-red-400",
};

interface Props {
  selectedId: number | null;
  progress: ProgressMap;
  onSelect: (id: number) => void;
}

export function ProblemList({ selectedId, progress, onSelect }: Props) {
  const [topic, setTopic] = useState<Topic | "all">("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");

  const filtered = filterProblems(blind75, { topic, difficulty });

  return (
    <div className="flex h-full flex-col border-r">
      <div className="space-y-2 border-b p-3">
        <Select value={topic} onValueChange={(v) => setTopic(v as Topic | "all")}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="All Topics" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {TOPICS.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty | "all")}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="All Difficulties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            {DIFFICULTIES.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="flex-1">
        <ul className="py-1">
          {filtered.map((p) => {
            const status = progress[p.id]?.status ?? "unsolved";
            return (
              <li key={p.id}>
                <button
                  onClick={() => onSelect(p.id)}
                  className={cn(
                    "flex w-full items-center gap-2 border-l-2 border-transparent px-3 py-1.5 text-left text-sm transition-all duration-150 hover:bg-accent active:scale-[0.99]",
                    selectedId === p.id
                      ? "border-l-primary bg-accent/70 text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="shrink-0">
                    {status === "solved" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : status === "attempted" ? (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </span>
                  <span className="flex-1 truncate">{p.title}</span>
                  <Badge
                    variant="outline"
                    className={cn("shrink-0 text-xs", diffColor[p.difficulty])}
                  >
                    {p.difficulty[0]}
                  </Badge>
                </button>
              </li>
            );
          })}
        </ul>
      </ScrollArea>

      <div className="border-t px-3 py-2 text-xs text-muted-foreground">
        {filtered.length} / {blind75.length} problems
      </div>
    </div>
  );
}
