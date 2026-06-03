# LeetCode Daily

個人每日刷題平台，以 Blind 75 為題庫，支援在瀏覽器內直接寫 JS / TS / Python、執行測試驗證、查看解答、追蹤進度。

## 架構

```
apps/leetcode-daily/   React 19 SPA（主應用程式）
packages/utils/        共用工具（monorepo 共享）
```

### 前端 Domain 結構（DDD）

```
src/
  problem/     題目 domain — 資料、篩選、每日排程
  execution/   執行 domain — JS/TS/Python runner、型別剝除
  progress/    進度 domain — Supabase 進度追蹤
  editor/      編輯器 domain — 程式碼狀態與 localStorage 持久化
  infra/       基礎設施 — Supabase client
  components/  UI 層（薄，只呼叫 domain hooks）
  lib/         共用工具（shadcn cn()）
```

### 技術選型

| 層次            | 工具                                                  |
| --------------- | ----------------------------------------------------- |
| UI              | React 19 + Vite（`@voidzero-dev/vite-plus-core`）     |
| 編輯器          | Monaco Editor（`@monaco-editor/react`）               |
| JS/TS 執行      | Web Worker + `new Function()` 沙箱，5s timeout        |
| Python 執行     | Pyodide WASM（lazy load，首次使用才載入）             |
| TypeScript 執行 | 自製 regex type-stripper（`execution/stripTypes.ts`） |
| 後端 / DB       | Supabase（PostgreSQL + JS SDK 直連，無 API server）   |
| 樣式            | Tailwind CSS v4 + shadcn/ui                           |
| 測試            | vite-plus built-in test（`vp test`）                  |

## 開發

```bash
# 安裝依賴
pnpm install

# 啟動開發伺服器（http://localhost:5176）
pnpm dev:leetcode

# 執行單元測試
pnpm --filter leetcode-daily test

# 監看模式
pnpm --filter leetcode-daily test:watch

# 型別檢查
pnpm --filter leetcode-daily exec tsc --noEmit

# 全部驗證（fmt + lint + test + build）
vp run ready
```

## 環境設定

複製 `.env.example` 並填入 Supabase 憑證：

```bash
cp apps/leetcode-daily/.env.example apps/leetcode-daily/.env.local
```

```env
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

未設定時應用程式仍可正常運作，進度僅存於當次 session（in-memory），程式碼會持久化至 localStorage。

## Supabase Schema

```sql
CREATE TABLE progress (
  problem_id   int PRIMARY KEY,
  status       text CHECK (status IN ('unsolved','attempted','solved')) DEFAULT 'unsolved',
  attempts     int DEFAULT 0,
  solved_at    timestamptz
);

CREATE TABLE submissions (
  id           serial PRIMARY KEY,
  problem_id   int,
  language     text CHECK (language IN ('javascript','typescript','python')),
  code         text,
  passed       boolean,
  created_at   timestamptz DEFAULT now()
);
```

## 測試

```
src/
  execution/
    stripTypes.test.ts     — TypeScript type-stripping（12 tests）
    extractFnName.test.ts  — 函式名稱擷取（7 tests）
  problem/
    filter.test.ts         — 題目篩選（7 tests）
    schedule.test.ts       — 每日排程邏輯（6 tests）
```

執行：`pnpm --filter leetcode-daily test`（33 tests, ~100ms）
