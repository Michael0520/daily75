import { useCallback, useEffect, useMemo, useState } from "react";
import { Database, FlaskConical, History, Lightbulb, Trophy, Users, Zap } from "lucide-react";
import { useAuth } from "./auth/useAuth.ts";
import { AuthButton } from "./components/AuthButton.tsx";
import { CodeEditor } from "./components/CodeEditor.tsx";
import { DailyBoardTab } from "./components/DailyBoardTab.tsx";
import { DailyCountdown } from "./components/DailyCountdown.tsx";
import { PeerCodeViewer } from "./components/PeerCodeViewer.tsx";
import { ProblemDescription } from "./components/ProblemDescription.tsx";
import { ProblemList } from "./components/ProblemList.tsx";
import { SolutionViewer } from "./components/SolutionViewer.tsx";
import { SubmissionHistory } from "./components/SubmissionHistory.tsx";
import { TestResults } from "./components/TestResults.tsx";
import { Separator } from "./components/ui/separator.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs.tsx";
import { config } from "./config.ts";
import { useCodeState } from "./editor/useCodeState.ts";
import { runCode } from "./execution/runner.ts";
import type { Language, TestResult } from "./execution/types.ts";
import { hasSupabase } from "./infra/supabase.ts";
import { blind75 } from "./problem/blind75.ts";
import { selectGlobalDailyProblem } from "./problem/schedule.ts";
import { useDailyProblem } from "./problem/useDailyProblem.ts";
import { useProgress } from "./progress/useProgress.ts";
import { useStreak } from "./progress/useStreak.ts";
import { useSubmissions } from "./progress/useSubmissions.ts";
import { useDailyBoard } from "./social/useDailyBoard.ts";
import { usePeerSolution } from "./social/usePeerSolution.ts";

export function App() {
  const { session, loading: authLoading, signInWithGoogle, signOut } = useAuth();
  const userId = session?.user.id ?? null;

  const { progress, loading, markAttempted, markSolved, addSubmission, solvedCount } =
    useProgress(userId);
  const daily = useDailyProblem();
  const streak = useStreak(progress);

  const [selectedId, setSelectedId] = useState<number>(() => selectGlobalDailyProblem(blind75).id);
  const [language, setLanguage] = useState<Language>("javascript");
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState<Set<number>>(new Set());
  const [selectedPeerId, setSelectedPeerId] = useState<string | null>(null);

  const problem = useMemo(
    () => blind75.find((p) => p.id === selectedId) ?? blind75[0],
    [selectedId],
  );
  const { code, setCode } = useCodeState(problem, language);

  const isDailyProblem = problem.id === daily.id;
  const { entries, loading: boardLoading } = useDailyBoard(problem.id);
  const { solution: peerSolution, loading: peerLoading } = usePeerSolution(
    selectedPeerId,
    problem.id,
  );
  const { submissions, loading: submissionsLoading } = useSubmissions(userId, problem.id);

  useEffect(() => {
    setResults(null);
    setRunError(null);
    setSelectedPeerId(null);
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

  const status = progress[selectedId]?.status;
  const unlocked = attempted.has(selectedId) || status === "attempted" || status === "solved";

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
        {streak > 0 && (
          <>
            <Separator orientation="vertical" className="h-4 opacity-30" />
            <span className="flex items-center gap-1 text-xs text-orange-400 tabular-nums">
              🔥 {streak}
            </span>
          </>
        )}
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
        <Separator orientation="vertical" className="h-4 opacity-30" />
        <DailyCountdown />
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

          <div className="h-64 border-t">
            <Tabs defaultValue="results" className="flex h-full flex-col">
              <TabsList className="h-8 w-full justify-start rounded-none border-b px-2">
                <TabsTrigger value="results" className="h-7 gap-1.5 text-xs">
                  <FlaskConical className="h-3 w-3" />
                  Tests
                  {results && (
                    <span
                      className={`ml-0.5 rounded-full px-1 text-[10px] tabular-nums ${
                        results.every((r) => r.passed)
                          ? "bg-primary/20 text-primary"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {results.filter((r) => r.passed).length}/{results.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="solution" className="h-7 gap-1.5 text-xs">
                  <Lightbulb className="h-3 w-3" />
                  Solution
                </TabsTrigger>
                {isDailyProblem && (
                  <TabsTrigger value="daily" className="h-7 gap-1.5 text-xs">
                    <Users className="h-3 w-3" />
                    Daily
                    {entries.length > 0 && (
                      <span className="ml-0.5 rounded-full bg-primary/20 px-1 text-[10px] tabular-nums text-primary">
                        {entries.length}
                      </span>
                    )}
                  </TabsTrigger>
                )}
                <TabsTrigger value="history" className="h-7 gap-1.5 text-xs">
                  <History className="h-3 w-3" />
                  History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="results" className="m-0 flex-1 overflow-hidden">
                <TestResults results={results} error={runError} running={running} />
              </TabsContent>
              <TabsContent value="solution" className="m-0 flex-1 overflow-hidden">
                <SolutionViewer problem={problem} language={language} unlocked={unlocked} />
              </TabsContent>
              {isDailyProblem && (
                <TabsContent value="daily" className="m-0 flex-1 overflow-hidden">
                  <div className="flex h-full">
                    <div className={selectedPeerId ? "min-w-0 flex-1 overflow-hidden" : "w-full"}>
                      <DailyBoardTab
                        entries={entries}
                        loading={boardLoading}
                        onSelectUser={setSelectedPeerId}
                      />
                    </div>
                    {selectedPeerId && (
                      <div className="w-72 shrink-0 overflow-hidden">
                        <PeerCodeViewer
                          solution={peerSolution}
                          loading={peerLoading}
                          onClose={() => setSelectedPeerId(null)}
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
              )}
              <TabsContent value="history" className="m-0 flex-1 overflow-hidden">
                <SubmissionHistory
                  submissions={submissions}
                  loading={submissionsLoading}
                  userId={userId}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
