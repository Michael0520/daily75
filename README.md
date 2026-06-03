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

| Layer               | Tool                          |
| ------------------- | ----------------------------- |
| UI                  | React 19 + Vite               |
| Editor              | Monaco Editor                 |
| JS/TS execution     | Web Worker + `new Function()` |
| Syntax highlighting | Shiki v3                      |
| Styling             | Tailwind CSS v4 + shadcn/ui   |
| Database            | Supabase (optional)           |

---

## Quick Start

```bash
pnpm install
pnpm dev:leetcode
# → http://localhost:5173
```

The app works without Supabase — progress is kept in-memory for the session and code is persisted to localStorage.

To enable persistent progress, copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

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
