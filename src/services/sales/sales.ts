import BaseService from "../base-service";

class SalesService extends BaseService {
    searchCustomer = "/giias/cashier/get-customer";

    pendingOrder = "/giias/cashier/get-pending-order";

    searchSales = "/giias/cashier/get-sales-name";

    deletePendingOrder = "/cashier/delete-pending-order";

    getProduct = "giias/cashier/get-product";

    getProductStore = "giias/cashier/get-product-store";

    getPackage = "giias/cashier/get-paket";

    getPackageStore = "giias/cashier/get-paket-store";

    summaryPrice = "giias/cashier/summary-price";

    SummaryPrice<T extends SummaryResponse>(data: SummaryPrice) {
        return this.ProxyRequest<T>(async ({ post }) => {
            const req = await post({
                url: this.summaryPrice,
                data,
            });
            return req;
        });
    }

    GetPackageStore<T extends ProductPackage>(params: { query?: string; page?: number }) {
        return this.ProxyRequest<BasePaginationResponse<T>>(async ({ get }) => {
            const req = await get({
                url: this.getPackageStore,
                config: { params },
            });
            return req;
        });
    }

    GetPackage<T extends ProductPackage>(params: { query?: string; page?: number }) {
        return this.ProxyRequest<BasePaginationResponse<T>>(async ({ get }) => {
            const req = await get({
                url: this.getPackage,
                config: { params },
            });
            return req;
        });
    }

    GetProductStore<T extends Product>(params: { query?: string; page?: number }) {
        return this.ProxyRequest<BasePaginationResponse<T>>(async ({ get }) => {
            const req = await get({
                url: this.getProductStore,
                config: { params },
            });
            return req;
        });
    }

    GetProduct<T extends Product>(params: { query?: string; page?: number }) {
        return this.ProxyRequest<BasePaginationResponse<T>>(async ({ get }) => {
            const req = await get({
                url: this.getProduct,
                config: { params },
            });
            return req;
        });
    }

    DeletePendingOrder<T extends SalesName[]>(params: { order_id?: number | string }) {
        return this.ProxyRequest<T>(async ({ deleteMethod }) => {
            const req = await deleteMethod({
                url: this.deletePendingOrder + '/' + params.order_id,
            });
            return req;
        });
    }

    SearchSales<T extends SalesName[]>() {
        return this.ProxyRequest<T>(async ({ get }) => {
            const req = await get({
                url: this.searchSales
            });
            return req;
        });
    }

    PendingOrder<T extends PendingOrderList[]>(params: { cust_id?: number | string }) {
        return this.ProxyRequest<T>(async ({ get }) => {
            const req = await get({
                url: this.pendingOrder + "/" + params.cust_id,
            });
            return req;
        });
    }

    SearchCustomer<T extends SearchCustomer[]>() {
        return this.ProxyRequest<T>(async ({ get }) => {
            const req = await get({
                url: this.searchCustomer,
            });
            return req;
        });
    }

}

const salesService = new SalesService();
export default salesService;
