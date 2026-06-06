import { useEffect, useState } from "react";
import type { BoardEntry } from "./types.ts";
import { MOCK_BOARD } from "./mockData.ts";

export function useDailyBoard(_problemId: number): { entries: BoardEntry[]; loading: boolean } {
  const [entries, setEntries] = useState<BoardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setEntries(MOCK_BOARD);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [_problemId]);

  return { entries, loading };
}
