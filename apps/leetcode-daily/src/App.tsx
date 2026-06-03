import { useCallback, useEffect, useState } from "react";
import { CodeEditor } from "./components/CodeEditor.tsx";
import { ProblemDescription } from "./components/ProblemDescription.tsx";
import { ProblemList } from "./components/ProblemList.tsx";
import { SolutionViewer } from "./components/SolutionViewer.tsx";
import { TestResults } from "./components/TestResults.tsx";
import { Separator } from "./components/ui/separator.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs.tsx";
import { blind75 } from "./data/blind75.ts";
import type { Problem } from "./data/types.ts";
import { useDailyProblem } from "./hooks/useDailyProblem.ts";
import { useProgress } from "./hooks/useProgress.ts";
import type { Language, TestResult } from "./lib/codeRunner.ts";
import { runCode } from "./lib/codeRunner.ts";

type CodeMap = Record<string, Record<Language, string>>;

function getStarter(problem: Problem, lang: Language): string {
  if (lang === "python") return problem.starterPy;
  return problem.starterJs;
}

export function App() {
  const { progress, loading, markAttempted, markSolved, addSubmission, solvedCount } =
    useProgress();
  const daily = useDailyProblem(progress);

  const [selectedId, setSelectedId] = useState<number>(1);
  const [language, setLanguage] = useState<Language>("javascript");
  const [codeMap, setCodeMap] = useState<CodeMap>({});
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState<Set<number>>(new Set());

  const problem = blind75.find((p) => p.id === selectedId) ?? blind75[0];

  const code = codeMap[selectedId]?.[language] ?? getStarter(problem, language);

  useEffect(() => {
    setResults(null);
    setRunError(null);
  }, [selectedId, language]);

  const handleCodeChange = useCallback(
    (val: string) => {
      setCodeMap((prev) => ({
        ...prev,
        [selectedId]: { ...prev[selectedId], [language]: val } as Record<Language, string>,
      }));
    },
    [selectedId, language],
  );

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  const handleRun = useCallback(async () => {
    setRunning(true);
    setResults(null);
    setRunError(null);

    try {
      const res = await runCode(code, language, problem.testCases);
      setResults(res);
      const allPassed = res.every((r) => r.passed);

      setAttempted((prev) => new Set(prev).add(selectedId));
      await markAttempted(selectedId);
      await addSubmission(selectedId, language, code, allPassed);
      if (allPassed) await markSolved(selectedId);
    } catch (err) {
      setRunError(String(err));
      setAttempted((prev) => new Set(prev).add(selectedId));
      await markAttempted(selectedId);
    } finally {
      setRunning(false);
    }
  }, [code, language, problem, selectedId, markAttempted, markSolved, addSubmission]);

  const unlocked = attempted.has(selectedId) || progress[selectedId]?.status !== "unsolved";

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="flex h-11 items-center gap-4 border-b px-4">
        <span className="font-semibold">LeetCode Daily</span>
        <Separator orientation="vertical" className="h-4" />
        <span className="text-sm text-muted-foreground">
          {loading ? "…" : `${solvedCount} / 75 solved`}
        </span>
        <Separator orientation="vertical" className="h-4" />
        <button
          onClick={() => setSelectedId(daily.id)}
          className="text-sm text-primary hover:underline"
        >
          Today: {daily.title}
        </button>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Problem list */}
        <aside className="w-56 shrink-0 overflow-hidden">
          <ProblemList selectedId={selectedId} progress={progress} onSelect={setSelectedId} />
        </aside>

        {/* Description */}
        <div className="w-80 shrink-0 overflow-hidden border-r">
          <ProblemDescription problem={problem} />
        </div>

        {/* Editor + results */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              problem={problem}
              language={language}
              code={code}
              running={running}
              onLanguageChange={handleLanguageChange}
              onCodeChange={handleCodeChange}
              onRun={handleRun}
            />
          </div>

          <div className="h-56 border-t">
            <Tabs defaultValue="results" className="h-full flex flex-col">
              <TabsList className="h-8 w-full justify-start rounded-none border-b px-2">
                <TabsTrigger value="results" className="h-7 text-xs">
                  Test Results
                </TabsTrigger>
                <TabsTrigger value="solution" className="h-7 text-xs">
                  Solution
                </TabsTrigger>
              </TabsList>
              <TabsContent value="results" className="flex-1 overflow-hidden m-0">
                <TestResults results={results} error={runError} running={running} />
              </TabsContent>
              <TabsContent value="solution" className="flex-1 overflow-hidden m-0">
                <SolutionViewer problem={problem} language={language} unlocked={unlocked} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
