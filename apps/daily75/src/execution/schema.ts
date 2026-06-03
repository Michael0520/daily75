import { z } from "zod";

export const TestResultSchema = z.object({
  input: z.array(z.any()),
  expected: z.any(),
  actual: z.any(),
  passed: z.boolean(),
  error: z.string().optional(),
});

export const WorkerMessageSchema = z.object({
  results: z.array(TestResultSchema).optional(),
  error: z.string().optional(),
});
