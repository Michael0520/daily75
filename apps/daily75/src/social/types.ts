export interface BoardEntry {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  solvedAt: string; // ISO timestamp
  language: "javascript" | "typescript";
  rank: number;
}

export interface PeerSolution {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  code: string;
  language: "javascript" | "typescript";
  solvedAt: string;
}
