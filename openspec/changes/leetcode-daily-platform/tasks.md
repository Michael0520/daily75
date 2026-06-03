## 1. Project Setup

- [ ] 1.1 建立 `apps/leetcode-daily` 目錄，設定 Vite + React 19 + TypeScript
- [ ] 1.2 將 `apps/leetcode-daily` 加入 pnpm workspace
- [ ] 1.3 安裝依賴：`react`、`react-dom`、`@monaco-editor/react`、`@supabase/supabase-js`
- [ ] 1.4 設定 Tailwind CSS v4 + shadcn/ui（`npx shadcn@latest init`，選 Vite + TypeScript）
- [ ] 1.5 安裝常用 shadcn/ui 元件：`button`、`badge`、`tabs`、`scroll-area`、`tooltip`、`select`、`separator`
- [ ] 1.6 建立 `.env.local` 範本（`VITE_SUPABASE_URL`、`VITE_SUPABASE_ANON_KEY`）

## 2. Supabase Setup

- [ ] 2.1 建立 Supabase project（需在 supabase.com 手動操作）
- [ ] 2.2 寫 `supabase/migrations/001_initial.sql`（problems、progress、submissions 三張表）
- [ ] 2.3 設定 RLS：允許 anon role 讀寫所有表
- [ ] 2.4 建立 `src/lib/supabase.ts`（Supabase client singleton）

## 3. Blind 75 Data

- [ ] 3.1 建立 `src/data/blind75.ts`：定義所有 75 題靜態資料（title、difficulty、topics、description、examples、constraints、test_cases、starter_js、starter_py、solution_js、solution_py、solution_explanation）
- [ ] 3.2 先完整整理前 10 題驗證資料格式（Two Sum、Valid Parentheses、Best Time to Buy Stock、Maximum Subarray、Contains Duplicate、Product of Array Except Self、Maximum Product Subarray、Find Minimum in Rotated Sorted Array、Search in Rotated Sorted Array、3Sum）
- [ ] 3.3 補齊剩餘 65 題資料
- [ ] 3.4 建立 `scripts/seed.ts`：讀取 blind75.ts 並 upsert 到 Supabase
- [ ] 3.5 執行 seed script 確認資料寫入

## 4. Code Execution Engine

- [ ] 4.1 建立 `src/lib/jsRunner.worker.ts`：Web Worker 包裝 `new Function()`，接收 code + test cases，回傳結果陣列，5 秒 timeout
- [ ] 4.2 建立 `src/lib/pyodideRunner.ts`：lazy load Pyodide，執行 Python code + test cases，5 秒 timeout
- [ ] 4.3 建立 `src/hooks/useCodeRunner.ts`：統一包裝兩種執行引擎，expose `runCode(code, language, testCases)` → `TestResult[]`
- [ ] 4.4 寫 Vitest 單元測試驗證 jsRunner（pass case、fail case、timeout case、runtime error case）

## 5. Data Hooks

- [ ] 5.1 建立 `src/hooks/useProblems.ts`：從 Supabase 讀取題目列表，支援 topic / difficulty 篩選
- [ ] 5.2 建立 `src/hooks/useProgress.ts`：讀取進度、upsert status、新增 submission 記錄
- [ ] 5.3 建立 `src/hooks/useDailyProblem.ts`：deterministic 選題邏輯（epochDay % unsolved.length）

## 6. UI Components

- [ ] 6.1 建立 `ProblemList` 組件：題目列表 sidebar，含 topic/difficulty 篩選器與完成狀態 badge
- [ ] 6.2 建立 `ProblemDescription` 組件：顯示題目說明、examples、constraints
- [ ] 6.3 建立 `CodeEditor` 組件：Monaco Editor 包裝，含語言切換 toggle（JS / TS / Python）
- [ ] 6.4 建立 `TestRunner` 組件：Run Tests 按鈕 + 測試結果顯示（input / expected / actual / pass/fail）
- [ ] 6.5 建立 `SolutionViewer` 組件：解答顯示面板，attempt 前鎖定，含 solution code + explanation
- [ ] 6.6 建立 `ProgressBar` / Header 組件：顯示 "X / 75 solved" + 今日推薦題 banner
- [ ] 6.7 組裝 `App.tsx`：三欄佈局（ProblemList | ProblemDescription | CodeEditor + TestRunner + SolutionViewer）

## 7. Daily Problem Feature

- [ ] 7.1 在 Header 顯示今日推薦題目（title + difficulty），點擊載入該題

## 8. Integration & Verification

- [ ] 8.1 端對端測試：選 Two Sum，用 JS 寫解，跑測試，驗收 pass/fail 顯示正確
- [ ] 8.2 端對端測試：同題改用 Python，驗收 Pyodide 執行正確
- [ ] 8.3 驗收：進度正確更新到 Supabase，重新整理後狀態保留
- [ ] 8.4 驗收：View Solution 在未嘗試時鎖定，嘗試後解鎖
- [ ] 8.5 驗收：topic / difficulty 篩選正確
- [ ] 8.6 執行 `pnpm run ready`（fmt + lint + test + build）通過
