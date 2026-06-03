# LeetCode Daily Platform — Design Doc

## Context

個人每日刷題平台，以 Blind 75 為題庫，支援在瀏覽器內直接寫 JS / TS / Python、執行測試、查看解答、追蹤進度。資料存 Supabase，無需獨立後端 API。

---

## Goals / Non-Goals

**Goals:**

- 在瀏覽器內執行 JS/TS/Python 並對比測試案例輸出
- 以 Supabase 持久化進度與提交記錄（單使用者，無需 Auth）
- 提供 Monaco Editor 品質的程式碼編輯體驗
- Blind 75 全部 75 題靜態資料可搜尋、可篩選

**Non-Goals:**

- 多使用者 / 帳號系統
- 伺服器端程式碼執行
- 自訂題目新增
- 行動裝置版面最佳化（桌面優先）

---

## 架構

### Domain 結構（DDD）

```
apps/leetcode-daily/src/
  problem/        題目 domain
    types.ts      Problem, TestCase, Example, Difficulty, Topic
    blind75.ts    75 題靜態資料
    filter.ts     filterProblems(problems, { topic, difficulty })
    schedule.ts   selectDailyProblem(problems, progress, nowMs?)
    useDailyProblem.ts  React hook（包裝 schedule.ts）

  execution/      程式碼執行 domain
    types.ts      Language, TestResult
    stripTypes.ts stripTypeAnnotations(code) — TS 型別剝除
    extractFnName.ts  extractFnName(code)
    worker.ts     Web Worker 沙箱（JS/TS）
    runner.ts     runCode() / runJS() / runPython()

  progress/       進度追蹤 domain
    types.ts      ProblemStatus, ProgressEntry, ProgressMap
    useProgress.ts  Supabase hook

  editor/         編輯器狀態 domain
    useCodeState.ts  localStorage 持久化

  infra/          基礎設施
    supabase.ts   Supabase client（null when env vars absent）

  components/     UI 層（薄，只呼叫 domain hooks）
    CodeEditor.tsx
    ProblemDescription.tsx
    ProblemList.tsx
    SolutionViewer.tsx
    TestResults.tsx
    ui/           shadcn/ui primitives

  lib/
    utils.ts      cn()（shadcn 工具）
```

### UI 佈局

```
┌──────────────────────────────────────────────────────────┐
│ LeetCode Daily  │  X / 75 solved  │  Today: <Title>      │
├───────────┬─────────────────┬───────────────────────────┤
│ Problem   │  Description    │  Monaco Editor            │
│ List      │  Examples       │  [JS | TS | Python]       │
│           │  Constraints    │                           │
│ topic ▼   ├─────────────────┤  [▶ Run Tests]            │
│ diff  ▼   │  Test Results   ├───────────────────────────┤
│           │  ✅ 3/3 passed  │  Solution (locked/unlocked)│
└───────────┴─────────────────┴───────────────────────────┘
```

---

## Decisions

### 1. 全客戶端程式碼執行

- **JS/TS**：Web Worker + `new Function()` 沙箱，5s timeout
- **TypeScript**：自製 regex stripper（`execution/stripTypes.ts`）在執行前剝除型別標註，不引入 TypeScript compiler 依賴（~5MB）
- **Python**：Pyodide WASM，lazy load（首次 ~10MB），獨立 Promise chain 每 test case 執行

### 2. Supabase 直連（無 API 層）

單使用者、無敏感邏輯，anon key 直連 PostgREST 足夠。`infra/supabase.ts` 當 env vars 缺席時回傳 `null`，progress domain 優雅降級（in-memory 狀態，不 crash）。

### 3. 程式碼持久化（localStorage）

`editor/useCodeState.ts` 以 `lc-code-{problemId}-{language}` 為 key 持久化至 localStorage，重整後草稿保留。優先序：in-memory overrides → localStorage → starter code。

### 4. 每日排程：Deterministic

```ts
const dayIndex = Math.floor(nowMs / 86_400_000);
const pool = unsolved.length > 0 ? unsolved : allProblems;
return pool[dayIndex % pool.length];
```

`nowMs` 可注入（測試用），不需 cron job，跨裝置同步一致。

### 5. DDD 架構原則

- 各 domain 有獨立的 `types.ts`，不跨 domain 共享型別
- UI 層（`components/`）只依賴 domain 型別與 hooks，不含業務邏輯
- `filterProblems()` 從 UI 抽至 `problem/filter.ts`，可獨立測試
- Infrastructure（Supabase）隔離在 `infra/`，domain hook 透過 null-check 降級

---

## 測試策略

| Domain    | 測試檔                  | 覆蓋重點                                                                                 |
| --------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| execution | `stripTypes.test.ts`    | param/return types, optional `?:`, generics, `as` cast, realistic Two Sum TS → JS 可執行 |
| execution | `extractFnName.test.ts` | JS/Python 宣告、fallback                                                                 |
| problem   | `filter.test.ts`        | topic/difficulty 組合、空結果、多 topic                                                  |
| problem   | `schedule.test.ts`      | 確定性、輪替、solved 排除、all-solved fallback                                           |

執行：`pnpm --filter leetcode-daily test`（33 tests）

---

## Risks / Trade-offs

| 風險                   | 緩解                                                 |
| ---------------------- | ---------------------------------------------------- |
| Pyodide 首次載入 ~10MB | lazy load + "Loading Python…" 提示                   |
| Web Worker 無窮迴圈    | 5s timeout 強制 terminate()                          |
| Supabase anon key 暴露 | 接受（個人工具，資料非敏感）                         |
| TS stripper 不完整     | 涵蓋 LeetCode 95% 常見 pattern；邊界 case 可補 regex |
| test_cases 需人工整理  | 先 10 題 Array，逐類補齊剩餘 65 題                   |
