/**
 * Strips TypeScript-specific syntax from code so it can be executed
 * as JavaScript in a `new Function()` sandbox.
 *
 * Handles the patterns that appear in standard LeetCode TypeScript solutions:
 *   - Parameter type annotations:  `param: Type`, `param: Type[]`, `param: A | B`
 *   - Optional parameters:         `param?: Type`
 *   - Return type annotations:     `): Type {`, `): Type[] {`
 *   - Generic type parameters:     `<T>`, `<T extends Foo>` on function declarations
 *   - `as Type` casts:             `value as number`
 *   - `interface` / `type` declarations
 *
 * Intentionally NOT a full TypeScript parser — covers the 95% case for LeetCode
 * problems without adding a large dependency.
 */

// Matches: TypeName, TypeName[], TypeName | AltType, TypeName[] | null, etc.
// Excludes commas and angle brackets so the pattern never eats across parameters.
const TYPE_PAT = String.raw`(?:\w[\w[\]]*(?:\s*\|\s*\w[\w[\]]*)*)`;

export function stripTypeAnnotations(code: string): string {
  return (
    code
      // interface / type alias block declarations (multi-line)
      .replace(/^(?:export\s+)?(?:interface|type)\s+\w[\s\S]*?(?:\n\}|\n)\n?/gm, "")
      // `value as Type` casts — TYPE_PAT excludes commas so we don't eat array indices
      .replace(new RegExp(String.raw`\s+as\s+${TYPE_PAT}(?=[^a-zA-Z0-9_])`, "g"), "")
      // generic type parameters on function / class declarations: <T>, <T extends Foo>
      .replace(/<[^>()]+>(?=\s*\()/g, "")
      // optional param marker before a type colon: `b?: Type` → `b: Type`
      .replace(/\?(?=\s*:)/g, "")
      // parameter / variable type annotations: `: Type`, `: Type[]`, `: A | B`
      .replace(new RegExp(String.raw`:\s*${TYPE_PAT}(?=\s*[,)=}])`, "g"), "")
      // return type annotation before opening brace: `): Type {`
      .replace(new RegExp(String.raw`\)\s*:\s*${TYPE_PAT}\s*(?=[{(\n])`, "g"), ") ")
  );
}
