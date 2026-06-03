## Context

這是一個全新的 React SPA，建立在現有的 Vite+ monorepo 之上（`apps/leetcode-daily`）。專案目前只有一個 boilerplate website app 與一個 utils package，沒有任何業務邏輯。本設計涵蓋新 app 的完整架構，包含瀏覽器內程式碼執行、Supabase 資料持久化、以及 UI 組件結構。

## Goals / Non-Goals

**Goals:**

- 在瀏覽器內執行 JavaScript/TypeScript 與 Python 並對比測試案例輸出
- 以 Supabase 持久化進度與提交記錄（單使用者，無需 Auth）
- 提供 Monaco Editor 品質的程式碼編輯體驗
- Blind 75 所有 75 題靜態資料可搜尋、可篩選

**Non-Goals:**

- 多使用者 / 帳號系統（留待未來）
- 伺服器端程式碼執行（全在客戶端）
- 自訂題目新增
- 行動裝置版面最佳化（桌面優先）

## Decisions

### 1. 程式碼執行環境：全客戶端

**決定**：JS/TS 用 Web Worker + `new Function()` 沙箱；Python 用 Pyodide（WASM）。

**理由**：不需後端伺服器，部署簡單，個人使用安全性足夠。Pyodide lazy load 在首次執行 Python 時才載入（~10MB），避免影響初始載入速度。

**替代方案考慮**：Elysia.js API server 可執行更安全的沙箱，但增加部署複雜度，對個人工具不必要。

---

### 2. 資料庫：Supabase 直連（無 API 層）

**決定**：React app 直接使用 `@supabase/supabase-js` 與 Supabase PostgREST 溝通，不另立 API server。

**理由**：單使用者、無敏感商業邏輯，直連足夠。Supabase RLS 設定為 public 讀寫（anon key 即可）。

**替代方案考慮**：Elysia.js wrapper 可多一層控制，但對此規模無必要。

---

### 3. UI 框架：React 19 + Tailwind v4 + shadcn/ui

**決定**：在 `apps/leetcode-daily` 新增獨立 React app，不修改現有 `apps/website`。UI 元件使用 shadcn/ui（基於 Radix UI + Tailwind），提供 Button、Badge、Tabs、ScrollArea、Tooltip 等現成無障礙元件。

**理由**：React 組件模型適合多面板互動式 UI（問題列表 + 編輯器 + 測試結果）。shadcn/ui 直接複製元件到專案，完全可客製化，不引入黑盒依賴。Tailwind v4 與 Vite 整合良好，和現有 monorepo toolchain 一致。

**替代方案考慮**：純 Tailwind 手寫元件速度慢；MUI/Chakra 體積大且風格固定。shadcn/ui 在 Radix UI 無障礙基礎上提供設計彈性，是此規模專案的最佳折衷。

---

### 4. 題目資料：靜態 TS 檔 + Supabase seed

**決定**：Blind 75 題目資料定義在 `src/data/blind75.ts`，提供 `scripts/seed.ts` 寫入 Supabase。

**理由**：靜態資料易維護、可 code review；seed script 只需執行一次。題目不會頻繁變動，不需要 CMS。

---

### 5. 每日推薦：Deterministic 算法

**決定**：`unsolved[epochDay % unsolved.length]`，不需後端。

**理由**：同一天任何裝置結果相同（同步一致），簡單可預測，無需 cron job。

## Risks / Trade-offs

- **Pyodide 首次載入慢**（~10MB）→ 顯示 loading indicator，提前在背景預載
- **Web Worker 沙箱不完美**：使用者可寫無窮迴圈 → 5 秒 timeout 強制終止 Worker
- **Supabase anon key 暴露於前端**：RLS 設定為允許所有操作，理論上任何人可存取資料庫 → 接受此風險（個人工具，資料非敏感）
- **test_cases 硬編碼**：Blind 75 測試案例需人工整理，耗時 → 先整理 10 題驗證流程，再補齊其餘
