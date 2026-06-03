export type ProblemStatus = "unsolved" | "attempted" | "solved";

export interface ProgressEntry {
  status: ProblemStatus;
  solvedAt?: string;
}

export type ProgressMap = Record<number, ProgressEntry>;
