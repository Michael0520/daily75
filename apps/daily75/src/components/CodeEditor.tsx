import MonacoEditor, { type BeforeMount } from "@monaco-editor/react";
import { Loader2, Play } from "lucide-react";
import { useEffect } from "react";
import type { Language } from "../execution/types.ts";
import { Button } from "./ui/button.tsx";

interface Props {
  language: Language;
  code: string;
  running: boolean;
  onLanguageChange: (lang: Language) => void;
  onCodeChange: (code: string) => void;
  onRun: () => void;
}

const LANGS: { value: Language; label: string; monaco: string }[] = [
  { value: "javascript", label: "JS", monaco: "javascript" },
  { value: "typescript", label: "TS", monaco: "typescript" },
];

const defineTheme: BeforeMount = (monaco) => {
  monaco.editor.defineTheme("daily75-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "3d5560", fontStyle: "italic" },
      { token: "keyword", foreground: "47d489" },
      { token: "string", foreground: "89d9b0" },
      { token: "number", foreground: "f0b472" },
    ],
    colors: {
      "editor.background": "#0c1214",
      "editor.foreground": "#f4f5f2",
      "editorLineNumber.foreground": "#2d4048",
      "editorLineNumber.activeForeground": "#5a7880",
      "editor.selectionBackground": "#1b3528",
      "editor.lineHighlightBackground": "#121a1d",
      "editorCursor.foreground": "#47d489",
      "editor.inactiveSelectionBackground": "#162a20",
      "editorIndentGuide.background1": "#1a2d32",
      "editorIndentGuide.activeBackground1": "#263e45",
      "editorWidget.background": "#111c20",
      "editorSuggestWidget.background": "#111c20",
      "editorSuggestWidget.border": "#1e3038",
      "editorSuggestWidget.selectedBackground": "#1b3528",
      "scrollbar.shadow": "#00000000",
      "scrollbarSlider.background": "#1e3a2f50",
      "scrollbarSlider.hoverBackground": "#1e3a2f80",
      "scrollbarSlider.activeBackground": "#1e3a2faa",
    },
  });
};

export function CodeEditor({
  language,
  code,
  running,
  onLanguageChange,
  onCodeChange,
  onRun,
}: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && !running) {
        e.preventDefault();
        onRun();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [running, onRun]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-3 py-1.5">
        <div className="flex gap-0.5">
          {LANGS.map((l) => (
            <button
              key={l.value}
              onClick={() => onLanguageChange(l.value)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-all duration-150 active:scale-95 ${
                language === l.value
                  ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <Button
          size="sm"
          onClick={onRun}
          disabled={running}
          title="Run (⌘↵)"
          className={`h-7 gap-1.5 border-0 bg-emerald-600 px-3 text-xs font-medium text-white transition-all hover:bg-emerald-500 active:scale-95 disabled:bg-emerald-600/40 disabled:text-white/50 ${
            running ? "shadow-[0_0_14px_oklch(0.72_0.185_155/0.35)]" : ""
          }`}
        >
          {running ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              running
            </>
          ) : (
            <>
              <Play className="h-3 w-3 fill-current" />
              run
            </>
          )}
        </Button>
      </div>

      <div className="flex-1">
        <MonacoEditor
          height="100%"
          language={LANGS.find((l) => l.value === language)?.monaco ?? "javascript"}
          value={code}
          onChange={(v) => onCodeChange(v ?? "")}
          theme="daily75-dark"
          beforeMount={defineTheme}
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 8 },
            lineNumbers: "on",
            overviewRulerBorder: false,
            scrollbar: { verticalScrollbarSize: 4, horizontalScrollbarSize: 4 },
          }}
        />
      </div>
    </div>
  );
}
