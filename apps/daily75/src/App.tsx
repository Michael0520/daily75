import { useCallback, useEffect, useMemo, useState } from "react";
import { Database, FlaskConical, Lightbulb, Trophy, Zap } from "lucide-react";
import { useAuth } from "./auth/useAuth.ts";
import { AuthButton } from "./components/AuthButton.tsx";
import { CodeEditor } from "./components/CodeEditor.tsx";
import { ProblemDescription } from "./components/ProblemDescription.tsx";
import { ProblemList } from "./components/ProblemList.tsx";
import { SolutionViewer } from "./components/SolutionViewer.tsx";
import { TestResults } from "./components/TestResults.tsx";
import { Separator } from "./components/ui/separator.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs.tsx";
import { config } from "./config.ts";
import { useCodeState } from "./editor/useCodeState.ts";
import { runCode } from "./execution/runner.ts";
import type { Language, TestResult } from "./execution/types.ts";
import { hasSupabase } from "./infra/supabase.ts";
import { blind75 } from "./problem/blind75.ts";
import { useDailyProblem } from "./problem/useDailyProblem.ts";
import { useProgress } from "./progress/useProgress.ts";

export function App() {
  const { session, loading: authLoading, signInWithGoogle, signOut } = useAuth();
  const userId = session?.user.id ?? null;

  const { progress, loading, markAttempted, markSolved, addSubmission, solvedCount } =
    useProgress(userId);
  const daily = useDailyProblem(progress);

  const [selectedId, setSelectedId] = useState<number>(1);
  const [language, setLanguage] = useState<Language>("javascript");
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState<Set<number>>(new Set());

  const problem = useMemo(
    () => blind75.find((p) => p.id === selectedId) ?? blind75[0],
    [selectedId],
  );
  const { code, setCode } = useCodeState(problem, language);

  useEffect(() => {
    setResults(null);
    setRunError(null);
  }, [selectedId, language]);

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  const handleRun = useCallback(async () => {
    const currentId = selectedId;
    setRunning(true);
    setResults(null);
    setRunError(null);

    try {
      const res = await runCode(code, language, problem.testCases);
      setResults(res);
      const allPassed = res.length > 0 && res.every((r) => r.passed);

      setAttempted((prev) => new Set(prev).add(currentId));
      await markAttempted(currentId);
      await addSubmission(currentId, language, code, allPassed);
      if (allPassed) await markSolved(currentId);
    } catch (err) {
      setRunError(String(err));
      setAttempted((prev) => new Set(prev).add(currentId));
      await markAttempted(currentId);
    } finally {
      setRunning(false);
    }
  }, [code, language, problem, selectedId, markAttempted, markSolved, addSubmission]);

  const unlocked = attempted.has(selectedId) || progress[selectedId]?.status !== "unsolved";

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Grain noise overlay */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.025]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      <header className="flex h-11 shrink-0 items-center gap-3 border-b px-4">
        <span
          className="font-bold tracking-tight text-foreground"
          style={{ letterSpacing: "-0.03em" }}
        >
          {config.appName}
        </span>
        <Separator orientation="vertical" className="h-4 opacity-30" />
        <span className="flex items-center gap-1.5 tabular-nums text-xs text-muted-foreground">
          <Trophy className="h-3 w-3 text-primary/60" />
          {loading ? "…" : `${solvedCount} / ${blind75.length}`}
        </span>
        {!hasSupabase && (
          <>
            <Separator orientation="vertical" className="h-4 opacity-30" />
            <span className="flex items-center gap-1 text-xs text-amber-400">
              <Database className="h-3 w-3" />
              no db
            </span>
          </>
        )}
        <Separator orientation="vertical" className="h-4 opacity-30" />
        <button
          onClick={() => setSelectedId(daily.id)}
          className="flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-500/8 px-2.5 py-0.5 text-xs text-emerald-400 transition-colors hover:bg-emerald-500/15 active:scale-[0.97]"
        >
          <Zap className="h-3 w-3" />
          {daily.title}
        </button>
        <div className="ml-auto">
          <AuthButton
            session={session}
            loading={authLoading}
            onSignIn={signInWithGoogle}
            onSignOut={signOut}
          />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 shrink-0 overflow-hidden">
          <ProblemList selectedId={selectedId} progress={progress} onSelect={setSelectedId} />
        </aside>

        <div className="w-80 shrink-0 overflow-hidden border-r">
          <ProblemDescription problem={problem} />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              language={language}
              code={code}
              running={running}
              onLanguageChange={handleLanguageChange}
              onCodeChange={setCode}
              onRun={handleRun}
            />
          </div>

          <div className="h-56 border-t">
            <Tabs defaultValue="results" className="h-full flex flex-col">
              <TabsList className="h-8 w-full justify-start rounded-none border-b px-2">
                <TabsTrigger value="results" className="h-7 gap-1.5 text-xs">
                  <FlaskConical className="h-3 w-3" />
                  Tests
                </TabsTrigger>
                <TabsTrigger value="solution" className="h-7 gap-1.5 text-xs">
                  <Lightbulb className="h-3 w-3" />
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
