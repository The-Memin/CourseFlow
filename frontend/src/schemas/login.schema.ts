import z from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must have at least 6 characteres")
});

export type LoginForm = z.infer<typeof loginSchema>