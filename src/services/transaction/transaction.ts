import BaseService from "../base-service";

class TransactionService extends BaseService {
    listTransaction = "/giias/cashier/list-transaction";

    listTransactionFilter = "/giias/cashier/list-transaction/filter";

    detailTransaction = "/giias/cashier/detail-transaction";

    cancelationTransaction = "/giias/cashier/request-cancellation";

    uploadReceipt = "/giias/cashier/upload-receipt";

    UploadReceipt<T extends string>(data: UploadReceipt) {
        return this.ProxyRequest<T>(async ({ post }) => {
            const req = await post({
                url: this.uploadReceipt,
                data,
            });
            return req;
        });
    }

    CancelationTransaction<T extends DetailTransaction>({ id, note }: { id: string; note: string }) {
        return this.ProxyRequest<T>(async ({ post }) => {
            const req = await post({
                url: this.cancelationTransaction + '/' + id,
                config: { params: { note } },
            });
            return req;
        });
    }

    DetailTransaction<T extends DetailTransaction>(id: string) {
        return this.ProxyRequest<T>(async ({ get }) => {
            const req = await get({
                url: this.detailTransaction + '/' + id,
            });
            return req;
        });
    }

    ListTransactionFilter<T extends Transaction[]>(params: { start_date?: string; end_date?: string }) {
        return this.ProxyRequest<T>(async ({ get }) => {
            const req = await get({
                url: this.listTransactionFilter,
                config: { params },
            });
            return req;
        });
    }

    ListTransaction<T extends Transaction[]>() {
        return this.ProxyRequest<T>(async ({ get }) => {
            const req = await get({
                url: this.listTransaction,
            });
            return req;
        });
    }

}

const transactionService = new TransactionService();
export default transactionService;
