import type { TestCase } from "../data/types.ts";
import type { RunResponse } from "./jsRunner.worker.ts";

export type Language = "javascript" | "typescript" | "python";

export interface TestResult {
  input: unknown[];
  expected: unknown;
  actual: unknown;
  passed: boolean;
  error?: string;
}

const TIMEOUT_MS = 5000;

function extractFnName(code: string): string {
  const match = code.match(/function\s+(\w+)\s*\(/) ?? code.match(/def\s+(\w+)\s*\(/);
  return match?.[1] ?? "solution";
}

export async function runJS(code: string, testCases: TestCase[]): Promise<TestResult[]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./jsRunner.worker.ts", import.meta.url), { type: "module" });
    const timer = setTimeout(() => {
      worker.terminate();
      reject(new Error("Time Limit Exceeded (5s)"));
    }, TIMEOUT_MS);

    worker.onmessage = (e: MessageEvent<RunResponse>) => {
      clearTimeout(timer);
      worker.terminate();
      if (e.data.error) reject(new Error(e.data.error));
      else resolve(e.data.results as TestResult[]);
    };

    worker.onerror = (err) => {
      clearTimeout(timer);
      worker.terminate();
      reject(new Error(err.message));
    };

    worker.postMessage({ code, fnName: extractFnName(code), testCases });
  });
}

export async function runPython(code: string, testCases: TestCase[]): Promise<TestResult[]> {
  // Pyodide is lazy-loaded on first Python run
  const { loadPyodide } = await import(
    "https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.mjs" as string
  );
  const pyodide = await (loadPyodide as () => Promise<{ runPython: (code: string) => unknown }>)();

  const fnName = extractFnName(code);
  const results: TestResult[] = [];

  for (const tc of testCases) {
    try {
      const callArgs = tc.input.map((a) => JSON.stringify(a)).join(", ");
      const script = `
import json
${code}
result = ${fnName}(${callArgs})
json.dumps(result)
`.trim();
      const raw = pyodide.runPython(script) as string;
      const actual: unknown = JSON.parse(raw);
      const passed = JSON.stringify(actual) === JSON.stringify(tc.expected);
      results.push({ input: tc.input, expected: tc.expected, actual, passed });
    } catch (err) {
      results.push({
        input: tc.input,
        expected: tc.expected,
        actual: undefined,
        passed: false,
        error: String(err),
      });
    }
  }

  return results;
}

export async function runCode(
  code: string,
  language: Language,
  testCases: TestCase[],
): Promise<TestResult[]> {
  if (language === "python") return runPython(code, testCases);
  return runJS(code, testCases);
}
