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

export interface TestCase {
  input: unknown[];
  expected: unknown;
  description?: string;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
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
  starterPy: string;
  solutionJs: string;
  solutionPy: string;
  solutionExplanation: string;
}
