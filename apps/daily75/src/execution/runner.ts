import type { TestCase } from "../problem/types.ts";
import type { Language, TestResult } from "./types.ts";
import { WorkerMessageSchema } from "./schema.ts";

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

    worker.onmessage = (e: MessageEvent<unknown>) => {
      clearTimeout(timer);
      worker.terminate();
      const parsed = WorkerMessageSchema.safeParse(e.data);
      if (!parsed.success) {
        reject(new Error("Invalid response from worker"));
        return;
      }
      if (parsed.data.error) reject(new Error(parsed.data.error));
      else if (!parsed.data.results) reject(new Error("Worker returned no results"));
      else resolve(parsed.data.results as TestResult[]);
    };

    worker.onerror = (err) => {
      clearTimeout(timer);
      worker.terminate();
      reject(new Error(err.message));
    };

    worker.postMessage({ code, testCases, language });
  });
}
