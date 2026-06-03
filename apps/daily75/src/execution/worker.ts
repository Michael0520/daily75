import type { TestCase } from "../problem/types.ts";
import type { TestResult } from "./types.ts";
import { extractFnName } from "./extractFnName.ts";
import { stripTypeAnnotations } from "./stripTypes.ts";

export interface RunRequest {
  code: string;
  testCases: TestCase[];
  language: "javascript" | "typescript";
}

export interface RunResponse {
  results: TestResult[];
  error?: string;
}

// Injected into every execution context: TreeNode, ListNode, and array↔structure converters
const PREAMBLE = `
class TreeNode { constructor(val, left=null, right=null) { this.val=val; this.left=left; this.right=right; } }
class ListNode { constructor(val, next=null) { this.val=val; this.next=next; } }
function _at(arr) {
  if (!arr || !arr.length || arr[0]==null) return null;
  const root=new TreeNode(arr[0]), q=[root]; let i=1;
  while (i<arr.length) {
    const n=q.shift();
    if (i<arr.length && arr[i]!=null) { n.left=new TreeNode(arr[i]); q.push(n.left); } i++;
    if (i<arr.length && arr[i]!=null) { n.right=new TreeNode(arr[i]); q.push(n.right); } i++;
  }
  return root;
}
function _tt(r) {
  if (!r) return [];
  const res=[],q=[r];
  while(q.length){const n=q.shift();if(n){res.push(n.val);q.push(n.left,n.right);}else res.push(null);}
  while(res.length&&res[res.length-1]==null) res.pop();
  return res;
}
function _al(arr) { let d=new ListNode(0),c=d; for(const v of arr){c.next=new ListNode(v);c=c.next;} return d.next; }
function _lt(h) { const r=[]; while(h){r.push(h.val);h=h.next;} return r; }
function _als(arrs) { return arrs.map(_al); }
`;

self.onmessage = (e: MessageEvent<RunRequest>) => {
  const { code, testCases, language } = e.data;
  const execCode = language === "typescript" ? stripTypeAnnotations(code) : code;
  const fnName = extractFnName(execCode);

  const testRunner = `
const __results = [];
for (const __tc of __testCases) {
  try {
    const __inputs = __tc.inputTypes
      ? __tc.input.map((a, i) => {
          const t = __tc.inputTypes[i];
          if (t === 'tree') return _at(a);
          if (t === 'list') return _al(a);
          if (t === 'list[]') return _als(a);
          return a;
        })
      : __tc.input;
    let __actual = ${fnName}(...__inputs);
    if (__tc.expectedType === 'tree') __actual = _tt(__actual);
    if (__tc.expectedType === 'list') __actual = _lt(__actual);
    const __passed = JSON.stringify(__actual) === JSON.stringify(__tc.expected);
    __results.push({ input: __tc.input, expected: __tc.expected, actual: __actual, passed: __passed });
  } catch(e) {
    __results.push({ input: __tc.input, expected: __tc.expected, actual: undefined, passed: false, error: String(e) });
  }
}
return __results;
`;

  let results: TestResult[];
  try {
    // eslint-disable-next-line no-new-func
    results = new Function("__testCases", `${PREAMBLE}${execCode}\n${testRunner}`)(
      testCases,
    ) as TestResult[];
  } catch (err) {
    self.postMessage({ results: [], error: String(err) } satisfies RunResponse);
    return;
  }

  self.postMessage({ results } satisfies RunResponse);
};
