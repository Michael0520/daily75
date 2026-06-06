import { useEffect, useState } from "react";
import { supabase } from "../infra/supabase.ts";
import type { Language } from "../execution/types.ts";

export interface Submission {
  id: number;
  language: Language;
  passed: boolean;
  createdAt: string;
}

export function useSubmissions(userId: string | null, problemId: number) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase || !userId) {
      setSubmissions([]);
      return;
    }
    setLoading(true);
    const client = supabase;
    void (async () => {
      try {
        const { data } = await client
          .from("submissions")
          .select("id, language, passed, created_at")
          .eq("user_id", userId)
          .eq("problem_id", problemId)
          .order("created_at", { ascending: false })
          .limit(20);
        if (data) {
          setSubmissions(
            data.map((r) => ({
              id: r.id as number,
              language: r.language as Language,
              passed: r.passed as boolean,
              createdAt: r.created_at as string,
            })),
          );
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, problemId]);

  return { submissions, loading };
}
