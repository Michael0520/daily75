# CLAUDE.md — daily75

## Project layout

```
apps/daily75/src/
  App.tsx              # root component; all top-level state lives here
  problem/             # Problem type, blind75 data, filter, daily-pick logic
  execution/           # Web Worker runner, type stripper, schemas
  progress/            # Supabase progress hooks + schemas
  editor/              # Code state (localStorage persistence)
  auth/                # Supabase Google OAuth hook
  infra/               # supabase client (nullable)
  components/          # UI components
  components/ui/       # shadcn/ui primitives
```

## Key conventions

### CLI

- Dev server: `pnpm dev` (inside `apps/daily75/`)
- Tests: `pnpm test` (single run) · `pnpm test:watch`
- Type-check + lint: `vp check --fix`
- All commands go through `vp` (vite-plus wrapper)

### Imports

- Path alias `@` → `src/`
- Test imports: `import { describe, it, expect } from "vite-plus/test"` — never from `vitest` directly

### Dependencies

- pnpm workspace with `catalogMode: prefer` — all versions go in `pnpm-workspace.yaml` catalog, then `"catalog:"` in `package.json`

### Supabase / infra

- `infra/supabase.ts` exports `supabase` as `SupabaseClient | null` and `hasSupabase: boolean`
- Always guard with `if (supabase)` before use; never assume it's non-null
- Progress/submissions tables require `user_id uuid` + composite PK; see `supabase/migrations/`

### TypeScript execution (Web Worker)

- Worker sends `{ results: TestResult[], error?: string }` — `results` is always present (empty array on error)
- Type stripping uses regex, not the TS compiler — see `execution/stripTypes.ts`
- `WorkerMessageSchema` (zod) validates the worker response at runtime

### Zod boundaries

- `progress/schema.ts` — validates Supabase rows before inserting into ProgressMap
- `execution/schema.ts` — validates worker message before resolving the promise

### Dark theme

- Force dark: `<html class="dark">` in `index.html`
- Colors in OKLCH — primary is emerald `oklch(0.72 0.185 155)`
- Monaco editor uses custom theme `"daily75-dark"` defined in `CodeEditor.tsx` via `beforeMount`

### Solution lock

- `unlocked = attempted.has(id) || status === "attempted" || status === "solved"`
- `undefined !== "unsolved"` is `true` — never use that pattern for the lock check

## Problem data

All 75 Blind 75 problems are in `src/problem/blind75.ts` (complete — do not add stubs).
Tree/linked-list problems use `inputTypes`/`expectedType` hints in `testCases` for automatic conversion.
