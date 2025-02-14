import { number, z } from "zod";

export const accountValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
});

export const customVoucherSchema = z.object({
    name: z.string().min(3),
    price: z.string().min(1).default("0"),
    percentage: z.string().min(1).default("0"),
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

export const editPriceSchema = z.object({
    price: z.string().min(4),
});

export type EditPriceSchema = z.infer<typeof editPriceSchema>;

export type CustomVoucherSchema = z.infer<typeof customVoucherSchema>;

export type AccountValidationSchema = z.infer<typeof accountValidationSchema>;

export type ServiceSchema = z.infer<typeof serviceSchema>;

export type SummaryPriceSchema = z.infer<typeof summaryPriceSchema>;