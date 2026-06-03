export type Difficulty = "Easy" | "Medium" | "Hard";

export type Topic =
  | "Array"
  | "Binary"
  | "Dynamic Programming"
  | "Graph"
  | "Interval"
  | "Linked List"
  | "Matrix"
  | "String"
  | "Tree"
  | "Heap";

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export type InputType = "tree" | "list" | "list[]" | null;

export interface TestCase {
  input: unknown[];
  expected: unknown;
  description?: string;
  /** Per-argument type hints: 'tree' converts array→TreeNode, 'list' converts array→ListNode */
  inputTypes?: InputType[];
  /** If result is a tree/list, serialize back to array before comparing */
  expectedType?: "tree" | "list";
}

export interface Problem {
  id: number;
  slug: string;
  title: string;
  difficulty: Difficulty;
  topics: Topic[];
  description: string;
  examples: Example[];
  constraints: string[];
  testCases: TestCase[];
  starterJs: string;
  solutionJs: string;
  solutionExplanation: string;
}
