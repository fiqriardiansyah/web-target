import { number, z } from "zod";

export const accountValidationSchema = z.object({
    email: z.string().min(5),
    password: z.string().min(4),
});

export const serviceSchema = z.object({
    service_name: z.string().min(3),
    price: z.string().min(4),
});

export const summaryPriceSchema = z.object({
    is_service: z.number().default(0),
    is_cc: z.number().default(0),
    product: z.array(z.any()),
    service: z.array(serviceSchema),
    voucher: z.array(z.any()),
    voucher_id: z.array(z.number()),
    voucher_matrix_id: z.array(z.number()),
    customer_id: number(),
});

export type AccountValidationSchema = z.infer<typeof accountValidationSchema>;

export type ServiceSchema = z.infer<typeof serviceSchema>;

export type SummaryPriceSchema = z.infer<typeof summaryPriceSchema>;