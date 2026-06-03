import { z } from "zod";

export const ProblemStatusSchema = z.enum(["unsolved", "attempted", "solved"]);

export const ProgressRowSchema = z.object({
  problem_id: z.number(),
  status: ProblemStatusSchema,
  solved_at: z.string().nullish(),
});
