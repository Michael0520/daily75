# daily75

> Grind Blind 75 entirely in the browser — no backend required.

A personal daily coding practice platform built around the [Blind 75](https://www.techinterviewhandbook.org/grind75) problem set. Write JavaScript or TypeScript directly in the browser, run tests against real test cases, unlock solutions, and track your progress.

<img width="1438" height="1156" alt="CleanShot 2026-06-04 at 04 16 46" src="https://github.com/user-attachments/assets/bc6e4ff5-5ab7-4cad-9576-dce2b31794d0" />

---

## Features

- **All 75 problems** — Full Blind 75 problem set with descriptions, examples, constraints, and curated test cases
- **In-browser execution** — Web Worker + `new Function()` sandbox with a 5s timeout; no server needed
- **TypeScript support** — Custom regex-based type stripper; no compiler needed
- **Tree & linked list helpers** — `TreeNode` and `ListNode` auto-injected; array ↔ tree/list conversion built in
- **Syntax highlighting** — Shiki (`one-dark-pro` theme) renders solution code
- **Unlock gate** — Solutions are hidden until you make at least one submission
- **Progress tracking** — Persisted via Supabase with Google OAuth; falls back to in-memory when no DB is configured
- **Daily pick** — Deterministically recommends one unsolved problem per day
- **Filtering** — Filter the problem list by topic or difficulty
- **Keyboard shortcut** — `⌘↵` / `Ctrl+Enter` to run tests

---

## Tech Stack

| Layer               | Tool                               |
| ------------------- | ---------------------------------- |
| UI                  | React 19 + Vite (vite-plus)        |
| Editor              | Monaco Editor (custom dark theme)  |
| JS/TS execution     | Web Worker + `new Function()`      |
| Syntax highlighting | Shiki v3                           |
| Styling             | Tailwind CSS v4 + shadcn/ui        |
| Auth                | Supabase Google OAuth              |
| Database            | Supabase (optional)                |
| Validation          | Zod (runtime schema at boundaries) |

---

## Quick Start

```bash
# from the monorepo root
pnpm install

# run the app
cd apps/daily75
pnpm dev
# → http://localhost:5173
```

The app works without Supabase — progress is kept in-memory for the session.

To enable persistent progress and Google sign-in, copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

Then apply the migration:

```sql
-- progress table
CREATE TABLE IF NOT EXISTS progress (
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id  int  NOT NULL,
  status      text NOT NULL CHECK (status IN ('unsolved', 'attempted', 'solved')) DEFAULT 'unsolved',
  attempts    int  NOT NULL DEFAULT 0,
  solved_at   timestamptz,
  PRIMARY KEY (user_id, problem_id)
);

-- submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id  int  NOT NULL,
  language    text NOT NULL CHECK (language IN ('javascript', 'typescript')),
  code        text NOT NULL,
  passed      boolean NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE progress    ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_progress" ON progress FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_own_submissions" ON submissions FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
```

Enable Google OAuth in the Supabase dashboard under Authentication → Providers → Google.
