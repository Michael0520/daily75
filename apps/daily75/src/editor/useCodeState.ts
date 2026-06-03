import { useCallback, useState } from "react";
import type { Language } from "../execution/types.ts";
import type { Problem } from "../problem/types.ts";

type CodeMap = Record<string, string>;

function storageKey(problemId: number, language: Language) {
  return `lc-code-${problemId}-${language}`;
}

function loadSaved(problemId: number, language: Language): string | null {
  try {
    return localStorage.getItem(storageKey(problemId, language));
  } catch {
    return null;
  }
}

function saveToDisk(problemId: number, language: Language, code: string) {
  try {
    localStorage.setItem(storageKey(problemId, language), code);
  } catch {
    // ignore quota errors
  }
}

function getStarter(problem: Problem): string {
  return problem.starterJs;
}

export function useCodeState(problem: Problem, language: Language) {
  const [overrides, setOverrides] = useState<CodeMap>({});

  const key = `${problem.id}-${language}`;
  const code = overrides[key] ?? loadSaved(problem.id, language) ?? getStarter(problem);

  const setCode = useCallback(
    (val: string) => {
      setOverrides((prev) => ({ ...prev, [key]: val }));
      saveToDisk(problem.id, language, val);
    },
    [key],
  );

  return { code, setCode };
}
