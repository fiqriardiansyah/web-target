interface Transaction {
    id: number;
    inv_no: string;
    created_at: string;
    dp: string;
    order_status: string;
}

interface DetailTransaction {
    total_product_price: number;
    id: number;
    inv_no: string;
    ref_id: number;
    ref_no: string;
    image: string;
    order_status: string;
    dp_no: string;
    dp_amount: number;
    customer_name: string;
    phone_number: string;
    sales_id: number;
    sales_name: string;
    created_at: number;
    notes: string;
    order_no: string;
    payment_channel_id: number;
    payment_channel_name: string;
    cancel_note: string;
    payment_custom: unknown[];
    is_cancellation_req: number;
    list_voucher_custom: ListVoucherCustom[];
    list_voucher: ListVoucher[];
    total_discount: number;
    ppn: number;
    dpp: number;
    grand_total: number;
    total_pelunasan: number;
    list_detail_order: ListDetailOrder[];
}

interface ListDetailOrder {
    order_detail_id: number;
    product_id: number | null;
    product_name: string;
    qty: number;
    price: number;
    freeProduct: null;
}

interface ListVoucher {
    voucher_id: number;
    voucher_name: string;
    product_id: number | null;
    freeProduct: string;
    service_name: null | string;
    image: null | string;
    discount_price: number;
}

interface ListVoucherCustom {
    name: string;
    price: number | null;
    percentage: number | null;
    product_id: null;
    product: Product[];
    service: Service[];
}

interface Product {
    id: number;
    price: number;
    qty: number;
}

interface Service {
    name: string;
    price: number;
}
