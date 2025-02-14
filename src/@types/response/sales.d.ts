interface SearchCustomer {
    id: number;
    name: string;
    phone_number: string;
    sales: number;
    sales_name: string;
}

interface PendingOrderList {
    order_id: number;
    order_no: string | string;
    inv_no: string;
    ref_id: string;
    ref_no: string;
    voucher_id: number[];
    voucher: PendingOrderVoucher[] | string;
    list: PendingOrderItem[];
    order_draft_id?: number;
    dp_amount?: number;
    sisa_pembayaran?: number;
    grand_total?: number;
}

interface PendingOrderItem {
    product_id: number | string;
    product_qty: string;
    product_price: string;
    stock: number;
    product_code1: string;
    product_name: string;
    product_images: null;
    is_pkg: boolean;
}

interface PendingOrderVoucher {
    name: string;
    price: number;
    percentage: string;
    product_id: string;
    product: string;
    service: string;
}

interface SalesName {
    id: number;
    name: string;
}

interface Product {
    product_id: number;
    product_name: string;
    product_code: string;
    product_code2: string;
    product_category: string;
    product_subcategory: string;
    brand_name: string;
    model_detail: string;
    product_price: number;
    product_images: string | string[];
    stock: number;
    is_pkg: boolean;
    store?: number;
    qty?: number;
}

interface ProductPackage {
    product_id: number;
    product_name: string;
    list_child: Package[];
}

interface Package extends Product {
    product_qty?: number; //
    model_details?: string; //
}

interface SummaryResponse {
    total_item: number;
    total_price: number;
    total_discount: number;
    grand_total: number;
    list_voucher_custom: ListVoucherCustom[];
    list_discount: ListDiscount[];
    service_charge: number;
    service_charge_name: string;
    cc_charge: number;
    cc_charge_name: string;
    total_pembayaran: number;
}

interface ListDiscount {
    product_id: number | null;
    discount_name: string;
    freeProduct: string;
    service_name: null | string;
    discount_price: number;
}

interface ListVoucherCustom {
    name: string;
    price: number;
    percentage: number;
    product_id: null;
    product: ProductVoucher[];
    service: ServiceSummary[];
}

interface Voucher {
    id: number;
    title: string;
    description: string;
    voucher_code: string;
    image: string;
    end_time: string;
}

interface PaymentChannel {
    payment_channel_id: number;
    payment_channel_name: string;
}
