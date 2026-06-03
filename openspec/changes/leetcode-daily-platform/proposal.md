## Why

目前沒有專屬的每日刷題工具，依賴 LeetCode 官網缺乏個人化進度追蹤與自選語言的靈活性。需要一個在地化平台，讓自己每天固定刷一題 Blind 75，並能在瀏覽器內直接寫 JS/TS 或 Python、跑測試驗證答案、查看標準解答。

## What Changes

- 新增 `apps/leetcode-daily` — React 19 SPA，為本專案主要應用
- 整合 Monaco Editor 作為瀏覽器內程式碼編輯器，支援 JavaScript、TypeScript、Python
- 整合 Pyodide（WASM Python）與 Web Worker 沙箱執行程式碼並驗證測試案例
- 建立 Supabase 資料庫儲存 Blind 75 題目、使用者進度與提交記錄
- 提供每日推薦題目（根據當日日期 deterministic 選題）
- 支援依 topic / difficulty 篩選題目列表

## Capabilities

### New Capabilities

- `problem-browser`: 瀏覽 Blind 75 題目列表，支援依 topic（Array, Tree, DP…）與 difficulty 篩選，顯示完成狀態
- `code-editor`: 瀏覽器內 Monaco Editor，支援 JavaScript、TypeScript、Python 切換與語法高亮
- `code-execution`: 在瀏覽器執行使用者程式碼並對比測試案例，JS/TS 使用 Web Worker 沙箱，Python 使用 Pyodide
- `solution-viewer`: 完成（或嘗試後）解鎖標準解答與說明
- `progress-tracking`: 透過 Supabase 追蹤每題狀態（unsolved / attempted / solved）與提交記錄
- `daily-problem`: 根據當日日期從未完成題目中 deterministic 選出今日推薦題

### Modified Capabilities

（無現有 spec，全為新建）

## Impact

- 新增 `apps/leetcode-daily/` 目錄，加入 pnpm workspace
- 新增 Supabase project（需要 `.env.local` 環境變數）
- 新增依賴：`react`、`@monaco-editor/react`、`@supabase/supabase-js`、`tailwindcss`
- Pyodide 為 lazy-loaded CDN 資源（~10MB 首次載入）
- 不影響現有 `apps/website` 與 `packages/utils`
