# daily75

> Grind Blind 75 entirely in the browser — no backend required.

A personal daily coding practice platform built around the [Blind 75](https://www.techinterviewhandbook.org/grind75) problem set. Write JavaScript or TypeScript directly in the browser, run tests against real test cases, unlock solutions, and track your progress.

---

## Features

- **All 75 problems** — Full Blind 75 problem set with descriptions, examples, and constraints
- **In-browser execution** — Web Worker + `new Function()` sandbox with a 5s timeout
- **TypeScript support** — Custom regex-based type stripper; no compiler needed
- **Tree & linked list helpers** — `TreeNode` and `ListNode` auto-injected; array ↔ tree/list conversion built in
- **Syntax highlighting** — Shiki (`one-dark-pro` theme) renders solution code
- **Unlock gate** — Solutions are hidden until you make at least one submission
- **Progress tracking** — Persisted via Supabase; falls back to in-memory when no DB is configured
- **Daily pick** — Deterministically recommends one unsolved problem per day
- **Filtering** — Filter the problem list by topic or difficulty

---

## Tech Stack

| Layer               | Tool                           |
| ------------------- | ------------------------------ |
| UI                  | React 19 + Vite (`vite-plus`)  |
| Editor              | Monaco Editor                  |
| JS/TS execution     | Web Worker + `new Function()`  |
| Syntax highlighting | Shiki v3                       |
| Styling             | Tailwind CSS v4 + shadcn/ui    |
| Database            | Supabase (optional)            |
| Testing             | vite-plus built-in (`vp test`) |

---

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. (Optional) Configure Supabase
cp apps/leetcode-daily/.env.example apps/leetcode-daily/.env.local
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# 3. Start the dev server
pnpm dev:leetcode
# → http://localhost:5173
```

The app works without Supabase — progress is kept in-memory for the session and code is persisted to localStorage.

---

## Supabase Schema

```sql
CREATE TABLE progress (
  problem_id   int PRIMARY KEY,
  status       text CHECK (status IN ('unsolved', 'attempted', 'solved')) DEFAULT 'unsolved',
  attempts     int DEFAULT 0,
  solved_at    timestamptz
);

CREATE TABLE submissions (
  id           serial PRIMARY KEY,
  problem_id   int,
  language     text CHECK (language IN ('javascript', 'typescript')),
  code         text,
  passed       boolean,
  created_at   timestamptz DEFAULT now()
);
```

---

## Project Structure

```
apps/leetcode-daily/src/
  problem/      Problem data, filtering, daily schedule
  execution/    JS/TS runner, type-stripping, Web Worker
  progress/     Supabase progress tracking
  editor/       Code state and localStorage persistence
  infra/        Supabase client
  components/   UI components
```

---

## Tests

```bash
pnpm --filter leetcode-daily test
# 33 tests, ~100ms
```

| File                              | Coverage                  |
| --------------------------------- | ------------------------- |
| `execution/stripTypes.test.ts`    | TypeScript type-stripping |
| `execution/extractFnName.test.ts` | Function name extraction  |
| `problem/filter.test.ts`          | Problem filtering logic   |
| `problem/schedule.test.ts`        | Daily schedule logic      |
