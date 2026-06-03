import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../infra/supabase.ts";
import type { Language } from "../execution/types.ts";
import type { ProgressMap, ProblemStatus } from "./types.ts";

export type { ProgressMap };

export function useProgress(userId: string | null) {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loading, setLoading] = useState(true);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    setProgress({});
    if (!supabase || !userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from("progress")
      .select("problem_id, status, solved_at")
      .eq("user_id", userId)
      .then(({ data }) => {
        if (data) {
          const map: ProgressMap = {};
          for (const row of data) {
            map[row.problem_id as number] = {
              status: row.status as ProblemStatus,
              solvedAt: row.solved_at as string | undefined,
            };
          }
          setProgress(map);
        }
        setLoading(false);
      });
  }, [userId]);

  const markAttempted = useCallback(
    async (problemId: number) => {
      if (progressRef.current[problemId]?.status === "solved") return;
      if (supabase && userId) {
        await supabase
          .from("progress")
          .upsert({ user_id: userId, problem_id: problemId, status: "attempted", attempts: 1 });
      }
      setProgress((prev) => ({ ...prev, [problemId]: { status: "attempted" } }));
    },
    [userId],
  );

  const markSolved = useCallback(
    async (problemId: number) => {
      const now = new Date().toISOString();
      if (supabase && userId) {
        await supabase
          .from("progress")
          .upsert({ user_id: userId, problem_id: problemId, status: "solved", solved_at: now });
      }
      setProgress((prev) => ({ ...prev, [problemId]: { status: "solved", solvedAt: now } }));
    },
    [userId],
  );

  const addSubmission = useCallback(
    async (problemId: number, language: Language, code: string, passed: boolean) => {
      if (supabase && userId) {
        await supabase
          .from("submissions")
          .insert({ user_id: userId, problem_id: problemId, language, code, passed });
      }
    },
    [userId],
  );

  const solvedCount = useMemo(
    () => Object.values(progress).filter((p) => p.status === "solved").length,
    [progress],
  );

  return { progress, loading, markAttempted, markSolved, addSubmission, solvedCount };
}
