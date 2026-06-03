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
    const client = supabase;
    const load = async () => {
      try {
        const { data } = await client
          .from("progress")
          .select("problem_id, status, solved_at")
          .eq("user_id", userId);
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
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [userId]);

  const markAttempted = useCallback(
    async (problemId: number) => {
      if (progressRef.current[problemId]?.status === "solved") return;
      if (supabase && userId) {
        try {
          await supabase
            .from("progress")
            .upsert({ user_id: userId, problem_id: problemId, status: "attempted", attempts: 1 });
        } catch {
          // best-effort; local state still updates
        }
      }
      setProgress((prev) => ({ ...prev, [problemId]: { status: "attempted" } }));
    },
    [userId],
  );

  const markSolved = useCallback(
    async (problemId: number) => {
      const now = new Date().toISOString();
      if (supabase && userId) {
        try {
          await supabase
            .from("progress")
            .upsert({ user_id: userId, problem_id: problemId, status: "solved", solved_at: now });
        } catch {
          // best-effort; local state still updates
        }
      }
      setProgress((prev) => ({ ...prev, [problemId]: { status: "solved", solvedAt: now } }));
    },
    [userId],
  );

  const addSubmission = useCallback(
    async (problemId: number, language: Language, code: string, passed: boolean) => {
      if (supabase && userId) {
        try {
          await supabase
            .from("submissions")
            .insert({ user_id: userId, problem_id: problemId, language, code, passed });
        } catch {
          // best-effort
        }
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
