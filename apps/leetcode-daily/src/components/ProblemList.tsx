import { CheckCircle, Circle, Clock } from "lucide-react";
import { useState } from "react";
import { blind75 } from "../data/blind75.ts";
import type { Difficulty, Topic } from "../data/types.ts";
import type { ProgressMap } from "../hooks/useProgress.ts";
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
  Easy: "text-green-500",
  Medium: "text-yellow-500",
  Hard: "text-red-500",
};

interface Props {
  selectedId: number | null;
  progress: ProgressMap;
  onSelect: (id: number) => void;
}

export function ProblemList({ selectedId, progress, onSelect }: Props) {
  const [topic, setTopic] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<string>("all");

  const filtered = blind75.filter(
    (p) =>
      (topic === "all" || p.topics.includes(topic as Topic)) &&
      (difficulty === "all" || p.difficulty === difficulty),
  );

  return (
    <div className="flex h-full flex-col border-r">
      <div className="space-y-2 border-b p-3">
        <Select value={topic} onValueChange={setTopic}>
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
        <Select value={difficulty} onValueChange={setDifficulty}>
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
                    "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
                    selectedId === p.id && "bg-accent",
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
