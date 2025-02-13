interface BasePaginationResponse<T = unknown> {
    product_list: T[];
    total_data: number;
    total_page: number;
    current_page: number;
}

interface BaseResponse<T = unknown> {
    data: T;
    status: number;
    message: string;
}
