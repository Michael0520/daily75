import { useEffect, useState } from "react";
import type { PeerSolution } from "./types.ts";
import { MOCK_BOARD, MOCK_SOLUTIONS } from "./mockData.ts";

export function usePeerSolution(
  userId: string | null,
  _problemId: number,
): { solution: PeerSolution | null; loading: boolean } {
  const [solution, setSolution] = useState<PeerSolution | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      setSolution(null);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => {
      const entry = MOCK_BOARD.find((e) => e.userId === userId) ?? null;
      const code = MOCK_SOLUTIONS[userId] ?? null;
      setSolution(entry && code ? { ...entry, code } : null);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [userId, _problemId]);

  return { solution, loading };
}
