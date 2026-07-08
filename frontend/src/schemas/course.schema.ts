import { z } from "zod";
import { goalSchema } from "./goal.schema";

export const createCourseSchema = z.object({
    name: z
      .string()
      .min(3),

    description: z
      .string()
      .min(10),

    goals: z
      .array(goalSchema)
      .min(1),
  });

export type CreateCourseForm = z.infer< typeof createCourseSchema>;