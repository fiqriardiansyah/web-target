import { z } from "zod";

export const headerFooterSchema = z.object({
    companyName: z.string().min(2),
    companyAddress: z.string().min(5),
    companyNPWP: z.string().min(15),
    footerText: z.string().min(1),
});

export type HeaderFooterSchema = z.infer<typeof headerFooterSchema>;