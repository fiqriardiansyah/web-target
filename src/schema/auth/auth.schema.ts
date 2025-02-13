import { z } from "zod";

export const authSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(3, "Must be at least 3"),
});

export type AuthSchema = z.infer<typeof authSchema>;