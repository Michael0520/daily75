import type { TestCase } from "../data/types.ts";

export interface RunRequest {
  code: string;
  fnName: string;
  testCases: TestCase[];
}

export interface TestResult {
  input: unknown[];
  expected: unknown;
  actual: unknown;
  passed: boolean;
  error?: string;
}

export interface RunResponse {
  results: TestResult[];
  error?: string;
}

self.onmessage = (e: MessageEvent<RunRequest>) => {
  const { code, fnName, testCases } = e.data;
  const results: TestResult[] = [];

  let fn: (...args: unknown[]) => unknown;
  try {
    // eslint-disable-next-line no-new-func
    fn = new Function(`${code}; return ${fnName};`)() as (...args: unknown[]) => unknown;
  } catch (err) {
    self.postMessage({ results: [], error: String(err) } satisfies RunResponse);
    return;
  }

  for (const tc of testCases) {
    try {
      const actual = fn(...tc.input);
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

  self.postMessage({ results } satisfies RunResponse);
};
