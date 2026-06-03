import { z } from "zod";

export const TestResultSchema = z.object({
  input: z.array(z.any()),
  expected: z.any(),
  actual: z.any(),
  passed: z.boolean(),
  error: z.string().optional(),
});

export const WorkerMessageSchema = z.union([
  z.object({ results: z.array(TestResultSchema), error: z.undefined().optional() }),
  z.object({ error: z.string(), results: z.undefined().optional() }),
]);
