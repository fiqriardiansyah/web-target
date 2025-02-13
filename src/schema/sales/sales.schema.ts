import { number, z } from "zod";

export const summaryPriceSchema = z.object({
    is_service: z.number(),
    is_cc: z.number(),
    product: z.array(z.any()),
    service: z.array(z.any()),
    voucher: z.array(z.any()),
    voucher_id: z.array(z.number()),
    voucher_matrix_id: z.array(z.number()),
    customer_id: number(),
});

export type SummaryPriceSchema = z.infer<typeof summaryPriceSchema>;