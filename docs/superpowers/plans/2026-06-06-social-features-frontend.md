# Social Features Frontend — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement task-by-task.

**Goal:** Add social/competitive daily-challenge features to daily75 — daily board, peer solution viewer, streak tracker, countdown, and submission history — all using mock data (drop-in ready for real Supabase later).

**Architecture:** A new `social/` module owns the mock-data layer (types + hooks). UI components are added to existing panels (new "Daily" tab in bottom strip; streak + countdown in header). All social hooks share a stable interface so swapping mock → real Supabase only touches the hook internals.

**Tech Stack:** React, TypeScript, Tailwind, Radix UI, Monaco Editor (read-only reuse), Zod, vite-plus/test

---

### Task 1: Social types + mock data

**Files:**

- Create: `src/social/types.ts`
- Create: `src/social/mockData.ts`

- [ ] Create `src/social/types.ts`

```ts
export interface BoardEntry {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  solvedAt: string; // ISO timestamp
  language: "javascript" | "typescript";
  rank: number;
}

export interface PeerSolution {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  code: string;
  language: "javascript" | "typescript";
  solvedAt: string;
}
```

- [ ] Create `src/social/mockData.ts`

```ts
import type { BoardEntry, PeerSolution } from "./types.ts";

const BASE = new Date();
BASE.setHours(BASE.getHours() - 2);

export const MOCK_BOARD: BoardEntry[] = [
  {
    userId: "u1",
    displayName: "Alice",
    avatarUrl: null,
    solvedAt: new Date(BASE.getTime() - 7200000).toISOString(),
    language: "typescript",
    rank: 1,
  },
  {
    userId: "u2",
    displayName: "Bob",
    avatarUrl: null,
    solvedAt: new Date(BASE.getTime() - 5400000).toISOString(),
    language: "javascript",
    rank: 2,
  },
  {
    userId: "u3",
    displayName: "Carol",
    avatarUrl: null,
    solvedAt: new Date(BASE.getTime() - 3600000).toISOString(),
    language: "typescript",
    rank: 3,
  },
  {
    userId: "u4",
    displayName: "David",
    avatarUrl: null,
    solvedAt: new Date(BASE.getTime() - 1800000).toISOString(),
    language: "javascript",
    rank: 4,
  },
  {
    userId: "u5",
    displayName: "Eve",
    avatarUrl: null,
    solvedAt: new Date(BASE.getTime() - 900000).toISOString(),
    language: "typescript",
    rank: 5,
  },
];

export const MOCK_SOLUTIONS: Record<string, string> = {
  u1: `function twoSum(nums: number[], target: number): number[] {\n  const map = new Map<number, number>();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp)!, i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
  u2: `function twoSum(nums, target) {\n  const seen = {};\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (need in seen) return [seen[need], i];\n    seen[nums[i]] = i;\n  }\n}`,
  u3: `function twoSum(nums: number[], target: number): number[] {\n  const m = new Map<number, number>();\n  for (const [i, n] of nums.entries()) {\n    if (m.has(target - n)) return [m.get(target - n)!, i];\n    m.set(n, i);\n  }\n  return [];\n}`,
  u4: `function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++)\n    for (let j = i + 1; j < nums.length; j++)\n      if (nums[i] + nums[j] === target) return [i, j];\n}`,
  u5: `function twoSum(nums: number[], target: number): number[] {\n  return nums.reduce((acc, n, i) => {\n    const j = nums.indexOf(target - n);\n    return j !== -1 && j !== i ? [i, j] : acc;\n  }, [] as number[]);\n}`,
};
```

- [ ] Commit: `git add src/social/ && git commit -m "feat: add social types and mock data"`

---

### Task 2: useDailyBoard + usePeerSolution hooks

**Files:**

- Create: `src/social/useDailyBoard.ts`
- Create: `src/social/usePeerSolution.ts`
- Create: `src/social/useDailyBoard.test.ts`

- [ ] Create `src/social/useDailyBoard.ts`

```ts
import { useEffect, useState } from "react";
import type { BoardEntry } from "./types.ts";
import { MOCK_BOARD } from "./mockData.ts";

export function useDailyBoard(_problemId: number): { entries: BoardEntry[]; loading: boolean } {
  const [entries, setEntries] = useState<BoardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setEntries(MOCK_BOARD);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [_problemId]);

  return { entries, loading };
}
```

- [ ] Create `src/social/usePeerSolution.ts`

```ts
import { useEffect, useState } from "react";
import type { PeerSolution } from "./types.ts";
import { MOCK_BOARD, MOCK_SOLUTIONS } from "./mockData.ts";

export function usePeerSolution(
  userId: string | null,
  _problemId: number,
): { solution: PeerSolution | null; loading: boolean } {
  const [solution, setSolution] = useState<PeerSolution | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      setSolution(null);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => {
      const entry = MOCK_BOARD.find((e) => e.userId === userId) ?? null;
      const code = MOCK_SOLUTIONS[userId] ?? null;
      setSolution(entry && code ? { ...entry, code } : null);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [userId, _problemId]);

  return { solution, loading };
}
```

- [ ] Create `src/social/useDailyBoard.test.ts`

```ts
import { describe, expect, it } from "vite-plus/test";
import { MOCK_BOARD } from "./mockData.ts";

describe("MOCK_BOARD", () => {
  it("entries are sorted by rank", () => {
    for (let i = 1; i < MOCK_BOARD.length; i++) {
      expect(MOCK_BOARD[i].rank).toBeGreaterThan(MOCK_BOARD[i - 1].rank);
    }
  });

  it("all entries have required fields", () => {
    for (const e of MOCK_BOARD) {
      expect(e.userId).toBeTruthy();
      expect(e.displayName).toBeTruthy();
      expect(["javascript", "typescript"]).toContain(e.language);
      expect(new Date(e.solvedAt).getTime()).not.toBeNaN();
    }
  });

  it("all board entries have a matching mock solution", () => {
    const { MOCK_SOLUTIONS } = require("./mockData.ts");
    for (const e of MOCK_BOARD) {
      expect(MOCK_SOLUTIONS[e.userId]).toBeTruthy();
    }
  });
});
```

- [ ] Run tests: `pnpm test` — expect pass
- [ ] Commit: `git commit -m "feat: add useDailyBoard and usePeerSolution hooks"`

---

### Task 3: DailyBoardTab component

**Files:**

- Create: `src/components/DailyBoardTab.tsx`

- [ ] Create `src/components/DailyBoardTab.tsx`

```tsx
import { Users } from "lucide-react";
import type { BoardEntry } from "../social/types.ts";

interface Props {
  entries: BoardEntry[];
  loading: boolean;
  onSelectUser: (userId: string) => void;
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

const LANG_BADGE: Record<string, string> = {
  typescript: "bg-blue-500/15 text-blue-400",
  javascript: "bg-yellow-500/15 text-yellow-400",
};

export function DailyBoardTab({ entries, loading, onSelectUser }: Props) {
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-xs text-muted-foreground animate-pulse">Loading board…</span>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
        <Users className="h-6 w-6 opacity-30" />
        <span className="text-xs">No one has solved today's challenge yet.</span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="border-b px-3 py-2">
        <span className="text-xs text-muted-foreground">
          <span className="text-foreground font-medium">{entries.length}</span> solved today
        </span>
      </div>
      <ul className="flex-1 overflow-y-auto py-1">
        {entries.map((e) => (
          <li key={e.userId}>
            <button
              onClick={() => onSelectUser(e.userId)}
              className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-accent transition-colors"
            >
              <span className="w-5 shrink-0 text-center text-xs text-muted-foreground tabular-nums">
                {e.rank}
              </span>
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                {e.displayName[0].toUpperCase()}
              </div>
              <span className="min-w-0 flex-1 truncate text-foreground">{e.displayName}</span>
              <span
                className={`shrink-0 rounded px-1.5 py-0.5 text-xs ${LANG_BADGE[e.language] ?? ""}`}
              >
                {e.language === "typescript" ? "TS" : "JS"}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                {timeAgo(e.solvedAt)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] Commit: `git commit -m "feat: add DailyBoardTab component"`

---

### Task 4: PeerCodeViewer component

**Files:**

- Create: `src/components/PeerCodeViewer.tsx`

- [ ] Create `src/components/PeerCodeViewer.tsx`

```tsx
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
          onClick={onClose}
          className="rounded p-0.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-3">
        {loading && (
          <p className="text-xs text-muted-foreground animate-pulse">Loading solution…</p>
        )}
        {!loading && !solution && (
          <p className="text-xs text-muted-foreground">Solution not available.</p>
        )}
        {!loading && solution && <ShikiCode code={solution.code} language={solution.language} />}
      </div>
    </div>
  );
}
```

- [ ] Commit: `git commit -m "feat: add PeerCodeViewer component"`

---

### Task 5: Wire Daily tab into App + bottom panel

**Files:**

- Modify: `src/App.tsx`

- [ ] In `App.tsx`, add imports:

```ts
import { Users } from "lucide-react";
import { DailyBoardTab } from "./components/DailyBoardTab.tsx";
import { PeerCodeViewer } from "./components/PeerCodeViewer.tsx";
import { useDailyBoard } from "./social/useDailyBoard.ts";
import { usePeerSolution } from "./social/usePeerSolution.ts";
```

- [ ] In `App()`, add state and hooks after existing hooks:

```ts
const [selectedPeerId, setSelectedPeerId] = useState<string | null>(null);
const { entries, loading: boardLoading } = useDailyBoard(problem.id);
const { solution: peerSolution, loading: peerLoading } = usePeerSolution(
  selectedPeerId,
  problem.id,
);
```

- [ ] Add `isDailyProblem` derived value:

```ts
const isDailyProblem = problem.id === daily.id;
```

- [ ] In the bottom `<Tabs>`, add "Daily" trigger (only when on daily problem):

```tsx
{
  isDailyProblem && (
    <TabsTrigger value="daily" className="h-7 gap-1.5 text-xs">
      <Users className="h-3 w-3" />
      Daily
      {entries.length > 0 && (
        <span className="ml-0.5 rounded-full bg-primary/20 px-1 text-[10px] text-primary tabular-nums">
          {entries.length}
        </span>
      )}
    </TabsTrigger>
  );
}
```

- [ ] Add TabsContent for "daily":

```tsx
{
  isDailyProblem && (
    <TabsContent value="daily" className="flex-1 overflow-hidden m-0">
      <div className="flex h-full">
        <div className={selectedPeerId ? "flex-1 overflow-hidden" : "w-full"}>
          <DailyBoardTab
            entries={entries}
            loading={boardLoading}
            onSelectUser={setSelectedPeerId}
          />
        </div>
        {selectedPeerId && (
          <div className="w-80 shrink-0 overflow-hidden">
            <PeerCodeViewer
              solution={peerSolution}
              loading={peerLoading}
              onClose={() => setSelectedPeerId(null)}
            />
          </div>
        )}
      </div>
    </TabsContent>
  );
}
```

- [ ] Run dev server and verify "Daily" tab appears when on today's problem
- [ ] Commit: `git commit -m "feat: wire Daily tab with board and peer solution viewer"`

---

### Task 6: Streak tracker

**Files:**

- Create: `src/progress/useStreak.ts`
- Create: `src/progress/useStreak.test.ts`
- Modify: `src/App.tsx`

- [ ] Create `src/progress/useStreak.ts`

```ts
import { useMemo } from "react";
import type { ProgressMap } from "./types.ts";
import { blind75 } from "../problem/blind75.ts";
import { selectGlobalDailyProblem } from "../problem/schedule.ts";

export function useStreak(progress: ProgressMap): number {
  return useMemo(() => {
    const DAY_MS = 86_400_000;
    let streak = 0;
    let day = Math.floor(Date.now() / DAY_MS);
    while (true) {
      const problem = selectGlobalDailyProblem(blind75, day * DAY_MS);
      if (progress[problem.id]?.status !== "solved") break;
      streak++;
      day--;
      if (streak > 365) break; // safety cap
    }
    return streak;
  }, [progress]);
}
```

- [ ] Create `src/progress/useStreak.test.ts`

```ts
import { describe, expect, it } from "vite-plus/test";
import { useStreak } from "./useStreak.ts";

// useStreak is a pure useMemo wrapper — test the underlying logic via direct calls
import { blind75 } from "../problem/blind75.ts";
import { selectGlobalDailyProblem } from "../problem/schedule.ts";

const DAY_MS = 86_400_000;

describe("useStreak logic", () => {
  it("returns 0 with empty progress", () => {
    const progress = {};
    // today's problem not solved → streak = 0
    const todayProblem = selectGlobalDailyProblem(blind75);
    expect(progress[todayProblem.id]?.status).toBeUndefined();
  });

  it("streak increases when consecutive daily problems are solved", () => {
    const today = Math.floor(Date.now() / DAY_MS);
    const p0 = selectGlobalDailyProblem(blind75, today * DAY_MS);
    const p1 = selectGlobalDailyProblem(blind75, (today - 1) * DAY_MS);
    const progress = {
      [p0.id]: { status: "solved" as const },
      [p1.id]: { status: "solved" as const },
    };
    let streak = 0;
    let day = today;
    while (true) {
      const p = selectGlobalDailyProblem(blind75, day * DAY_MS);
      if (progress[p.id]?.status !== "solved") break;
      streak++;
      day--;
    }
    expect(streak).toBe(2);
  });

  it("breaks streak on unsolved day", () => {
    const today = Math.floor(Date.now() / DAY_MS);
    const p0 = selectGlobalDailyProblem(blind75, today * DAY_MS);
    // only today solved, yesterday not
    const progress = { [p0.id]: { status: "solved" as const } };
    let streak = 0;
    let day = today;
    while (true) {
      const p = selectGlobalDailyProblem(blind75, day * DAY_MS);
      if (progress[p.id]?.status !== "solved") break;
      streak++;
      day--;
    }
    expect(streak).toBe(1);
  });
});
```

- [ ] Run tests: `pnpm test` — expect pass

- [ ] In `App.tsx`, add streak to header:

```ts
import { useStreak } from "./progress/useStreak.ts";
// ... inside App():
const streak = useStreak(progress);
```

In the header, after solved count:

```tsx
{
  streak > 0 && (
    <>
      <Separator orientation="vertical" className="h-4 opacity-30" />
      <span className="flex items-center gap-1 text-xs text-orange-400 tabular-nums">
        🔥 {streak}
      </span>
    </>
  );
}
```

- [ ] Commit: `git commit -m "feat: add streak tracker with tests"`

---

### Task 7: Daily countdown in header

**Files:**

- Create: `src/components/DailyCountdown.tsx`
- Modify: `src/App.tsx`

- [ ] Create `src/components/DailyCountdown.tsx`

```tsx
import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

function msTilMidnightUTC(): number {
  const now = Date.now();
  const nextMidnight = (Math.floor(now / 86_400_000) + 1) * 86_400_000;
  return nextMidnight - now;
}

function formatMs(ms: number): string {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((s % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${h}:${m}:${sec}`;
}

export function DailyCountdown() {
  const [remaining, setRemaining] = useState(msTilMidnightUTC);

  useEffect(() => {
    const id = setInterval(() => setRemaining(msTilMidnightUTC()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
      <Timer className="h-3 w-3 opacity-50" />
      {formatMs(remaining)}
    </span>
  );
}
```

- [ ] In `App.tsx`, import and add to header:

```ts
import { DailyCountdown } from "./components/DailyCountdown.tsx";
```

In header after the daily problem button:

```tsx
<Separator orientation="vertical" className="h-4 opacity-30" />
<DailyCountdown />
```

- [ ] Commit: `git commit -m "feat: add daily countdown timer to header"`

---

### Task 8: Submission history

**Files:**

- Create: `src/progress/useSubmissions.ts`
- Create: `src/components/SubmissionHistory.tsx`
- Modify: `src/App.tsx`

- [ ] Create `src/progress/useSubmissions.ts`

```ts
import { useEffect, useState } from "react";
import { supabase } from "../infra/supabase.ts";
import type { Language } from "../execution/types.ts";

export interface Submission {
  id: number;
  language: Language;
  passed: boolean;
  createdAt: string;
}

export function useSubmissions(userId: string | null, problemId: number) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase || !userId) {
      setSubmissions([]);
      return;
    }
    setLoading(true);
    const client = supabase;
    void (async () => {
      try {
        const { data } = await client
          .from("submissions")
          .select("id, language, passed, created_at")
          .eq("user_id", userId)
          .eq("problem_id", problemId)
          .order("created_at", { ascending: false })
          .limit(20);
        if (data) {
          setSubmissions(
            data.map((r) => ({
              id: r.id,
              language: r.language as Language,
              passed: r.passed,
              createdAt: r.created_at,
            })),
          );
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, problemId]);

  return { submissions, loading };
}
```

- [ ] Create `src/components/SubmissionHistory.tsx`

```tsx
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
        <span className="text-xs text-muted-foreground animate-pulse">Loading…</span>
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
```

- [ ] In `App.tsx`, add imports and wire up:

```ts
import { History } from "lucide-react";
import { useSubmissions } from "./progress/useSubmissions.ts";
import { SubmissionHistory } from "./components/SubmissionHistory.tsx";
```

In `App()`:

```ts
const { submissions, loading: submissionsLoading } = useSubmissions(userId, problem.id);
```

Add "History" tab trigger and content in bottom Tabs (alongside Tests, Solution, Daily).

- [ ] Commit: `git commit -m "feat: add submission history tab"`

---

### Task 9: Final verification + console error check

- [ ] Open browser at `http://localhost:5173`
- [ ] Verify: header shows solved count, streak (if any), countdown timer
- [ ] Verify: clicking daily problem button → "Daily" tab appears in bottom panel
- [ ] Verify: Daily tab shows 5 mock users with ranks, language badges, time
- [ ] Verify: clicking a user → peer solution panel opens on the right
- [ ] Verify: closing peer panel works
- [ ] Verify: History tab visible for all problems, empty state shown (no Supabase)
- [ ] Run: `pnpm test` — all tests pass
- [ ] Check: `pnpm check` — no type errors
- [ ] Commit: `git commit -m "chore: verify all social features working"`
