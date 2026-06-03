import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase.ts";

export type ProblemStatus = "unsolved" | "attempted" | "solved";

export interface ProgressMap {
  [problemId: number]: { status: ProblemStatus; solvedAt?: string };
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("progress")
      .select("problem_id, status, solved_at")
      .then(({ data }) => {
        if (!data) return;
        const map: ProgressMap = {};
        for (const row of data) {
          map[row.problem_id as number] = {
            status: row.status as ProblemStatus,
            solvedAt: row.solved_at as string | undefined,
          };
        }
        setProgress(map);
        setLoading(false);
      });
  }, []);

  const markAttempted = useCallback(
    async (problemId: number) => {
      const current = progress[problemId]?.status;
      if (current === "solved") return;
      await supabase
        .from("progress")
        .upsert({ problem_id: problemId, status: "attempted", attempts: 1 });
      setProgress((prev) => ({ ...prev, [problemId]: { status: "attempted" } }));
    },
    [progress],
  );

  const markSolved = useCallback(async (problemId: number) => {
    const now = new Date().toISOString();
    await supabase
      .from("progress")
      .upsert({ problem_id: problemId, status: "solved", solved_at: now });
    setProgress((prev) => ({ ...prev, [problemId]: { status: "solved", solvedAt: now } }));
  }, []);

  const addSubmission = useCallback(
    async (problemId: number, language: string, code: string, passed: boolean) => {
      await supabase.from("submissions").insert({ problem_id: problemId, language, code, passed });
    },
    [],
  );

  const solvedCount = Object.values(progress).filter((p) => p.status === "solved").length;

  return { progress, loading, markAttempted, markSolved, addSubmission, solvedCount };
}
