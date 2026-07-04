import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must have at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm your password"),
}).refine(
  ({ password, confirmPassword }) => password === confirmPassword,
  {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  }
);

export type RegisterForm = z.infer<typeof registerSchema>;