import MonacoEditor from "@monaco-editor/react";
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

export function CodeEditor({
  language,
  code,
  running,
  onLanguageChange,
  onCodeChange,
  onRun,
}: Props) {
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
          className="h-7 border-0 bg-emerald-600 text-xs font-medium text-white transition-all hover:bg-emerald-500 active:scale-95 disabled:bg-emerald-600/40 disabled:text-white/50"
        >
          {running ? "running…" : "▶ run"}
        </Button>
      </div>

      <div className="flex-1">
        <MonacoEditor
          height="100%"
          language={LANGS.find((l) => l.value === language)?.monaco ?? "javascript"}
          value={code}
          onChange={(v) => onCodeChange(v ?? "")}
          theme="vs-dark"
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 8 },
            lineNumbers: "on",
          }}
        />
      </div>
    </div>
  );
}
