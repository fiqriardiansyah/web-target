import { z } from "zod";

export const dpSchema = z.object({
    dp: z.string().min(4),
});

export type DPSchema = z.infer<typeof dpSchema>;