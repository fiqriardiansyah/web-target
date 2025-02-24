import BaseService from "../base-service";

class ReportTransaction extends BaseService {

    salesPerformance = "/giias/cashier/report/sales-performance";

    SalesPerformance<T extends SalesPerformanceReportList[]>(params: SalesPerformanceReport) {
        return this.ProxyRequest<T>(async ({ get }) => {
            const req = await get({
                url: this.salesPerformance,
                config: { params }
            });
            return req;
        });
    }

}

const reportTransaction = new ReportTransaction();
export default reportTransaction;
