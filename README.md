# daily75

> 在瀏覽器裡刷完 Blind 75，不需要任何後端。

一個個人每日刷題平台，以 [Blind 75](https://www.techinterviewhandbook.org/grind75) 為題庫，支援在瀏覽器內直接寫 JavaScript / TypeScript、執行測試、查看解答、追蹤進度。

---

## ✨ 功能

- **75 題全收錄** — Blind 75 完整題庫，含題目描述、範例、限制條件
- **瀏覽器執行** — Web Worker + `new Function()` 沙箱，支援 JS / TS，5s timeout
- **TypeScript 支援** — 自製 regex type-stripper，無需編譯器，執行前即時剝除型別
- **樹 / 鏈結串列** — 自動注入 `TreeNode`、`ListNode`，array ↔ tree / list 雙向轉換
- **語法高亮** — Shiki (`one-dark-pro`) 渲染解答程式碼
- **解鎖機制** — 提交一次後才顯示標準解答與解題說明
- **進度追蹤** — Supabase 持久化（無 DB 時降級為 in-memory，程式碼存 localStorage）
- **每日推薦** — 依日期確定性推薦一道未完成的題目
- **篩選** — 依 Topic / Difficulty 過濾題目列表

---

## 🖥 Tech Stack

| 層次       | 工具                           |
| ---------- | ------------------------------ |
| UI         | React 19 + Vite (`vite-plus`)  |
| 編輯器     | Monaco Editor                  |
| JS/TS 執行 | Web Worker + `new Function()`  |
| 語法高亮   | Shiki v3                       |
| 樣式       | Tailwind CSS v4 + shadcn/ui    |
| 資料庫     | Supabase (optional)            |
| 測試       | vite-plus built-in (`vp test`) |

---

## 🚀 Quick Start

```bash
# 1. 安裝依賴
pnpm install

# 2. （選填）設定 Supabase
cp apps/leetcode-daily/.env.example apps/leetcode-daily/.env.local
# 填入 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY

# 3. 啟動開發伺服器
pnpm dev:leetcode
# → http://localhost:5173
```

不設定 Supabase 也能正常使用，進度僅在當次 session 保留。

---

## 🗄 Supabase Schema

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
  language     text CHECK (language IN ('javascript','typescript')),
  code         text,
  passed       boolean,
  created_at   timestamptz DEFAULT now()
);
```

---

## 📁 Project Structure

```
apps/leetcode-daily/src/
  problem/      題目資料、篩選、每日排程
  execution/    JS/TS runner、type-stripping、Web Worker
  progress/     Supabase 進度追蹤
  editor/       程式碼狀態與 localStorage
  infra/        Supabase client
  components/   UI 元件
```

---

## 🧪 Tests

```bash
pnpm --filter leetcode-daily test
# 33 tests, ~100ms
```

| 檔案                              | 內容                      |
| --------------------------------- | ------------------------- |
| `execution/stripTypes.test.ts`    | TypeScript type-stripping |
| `execution/extractFnName.test.ts` | 函式名稱擷取              |
| `problem/filter.test.ts`          | 題目篩選邏輯              |
| `problem/schedule.test.ts`        | 每日排程邏輯              |
