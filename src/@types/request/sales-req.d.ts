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

interface SummaryPriceDP extends SummaryPrice{
    dp_amount: number;
}