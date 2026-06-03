/**
 * Extracts the top-level function name from a code snippet.
 * Supports JavaScript `function name(` and Python `def name(` declarations.
 * Falls back to "solution" when no match is found.
 */
export function extractFnName(code: string): string {
  const match = code.match(/function\s+(\w+)\s*\(/) ?? code.match(/def\s+(\w+)\s*\(/);
  return match?.[1] ?? "solution";
}
