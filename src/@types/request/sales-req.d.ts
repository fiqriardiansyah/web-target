interface ProductSummary {
    price: number;
    product_id: number;
    qty: number;
}

interface ProductVoucher {
    price: number;
    id: number;
    qty: number;
}

interface ServiceSummary {
    service_name: string;
    price: number;
}

interface ServiceVoucher {
    name: string;
    price: number;
}

interface VoucherCustomSummary {
    id?: number;
    name: string;
    price: number;
    percentage: number;
    product: ProductVoucher[];
    service: ServiceVoucher[];
}

interface SummaryPrice {
    is_service: number;
    product: ProductSummary[];
    service: ServiceSummary[];
    voucher: VoucherCustomSummary[];
    is_cc: number;
    voucher_id: number[];
    voucher_matrix_id: number[];
    customer_id: number;
}

interface SummaryPriceDP extends SummaryPrice {
    dp_amount: number;
}

interface CreateOrderReq {
    is_service: number;
    is_cc: number;
    payment_channel_id: number;
    notes?: string;
    voucher: unknown[];
    detail_product: ProductSummary[];
    payment_amount?: number;
    voucher_id: number[]
    voucher_matrix_id: number[];
    service_order: unknown[];
    customer_id: number;
    sales_id: number;
}