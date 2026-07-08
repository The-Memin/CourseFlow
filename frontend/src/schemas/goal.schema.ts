import { z } from "zod";

export const goalSchema = z.object({
  name: z
    .string()
    .min(3),

  description: z
    .string()
    .min(3),

  unit: z.enum([
    "TOPICS",
    "HOURS",
    "EXERCISES",
    "LABS",
    "PROJECTS",
  ]),

  targetValue: z
    .number()
    .min(1),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
  ]),
});

export type CreateGoalForm = z.infer<typeof goalSchema>;