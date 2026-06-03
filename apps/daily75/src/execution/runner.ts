import type { TestCase } from "../problem/types.ts";
import type { RunResponse } from "./worker.ts";
import type { Language, TestResult } from "./types.ts";

export type { Language, TestResult };

const TIMEOUT_MS = 5000;

export async function runCode(
  code: string,
  language: Language,
  testCases: TestCase[],
): Promise<TestResult[]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
    const timer = setTimeout(() => {
      worker.terminate();
      reject(new Error("Time Limit Exceeded (5s)"));
    }, TIMEOUT_MS);

    worker.onmessage = (e: MessageEvent<RunResponse>) => {
      clearTimeout(timer);
      worker.terminate();
      if (e.data.error) reject(new Error(e.data.error));
      else if (!e.data.results) reject(new Error("Worker returned no results"));
      else resolve(e.data.results);
    };

    worker.onerror = (err) => {
      clearTimeout(timer);
      worker.terminate();
      reject(new Error(err.message));
    };

    worker.postMessage({ code, testCases, language });
  });
}
