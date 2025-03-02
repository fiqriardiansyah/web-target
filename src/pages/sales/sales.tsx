import { Button } from "antd";
import { PAYMENT_CHANNEL } from "../../@constant";
import { SalesProvider } from "../../context/sales";
import { useConstantContext, useSalesContext } from "../../hooks";
import { CartSales, FilterSales, Payment, SummarySales } from "../../modules";
import { salesService } from "../../services";

function Component() {
    const { state: { is_cc, sales }, summaryPriceMutation } = useSalesContext();
    const { ccPaymentChannel, paymentChannel } = useConstantContext();

    const createOrderFn = async (data: Partial<CreateOrderReq>) => {
        if (data.is_cc) {
            return (await salesService.CreateOrderDp(data)).data?.data;
        }
        return (await salesService.CreateOrder(data)).data?.data;
    }

    const allowedPayment = is_cc ? ccPaymentChannel : paymentChannel;
    const payments = allowedPayment.data?.map((p) => PAYMENT_CHANNEL[p.payment_channel_name as keyof typeof PAYMENT_CHANNEL]);

    return (
        <div className="container-custom flex gap-8 pb-10">
            <div className="w-full flex flex-col gap-10">
                <FilterSales />
                <CartSales />
            </div>
            <SummarySales
                paymentComponent={(
                    <Payment payments={payments} createOrderMutationFn={createOrderFn}>
                        {({ openModal, loading }) => (
                            <Button
                                loading={summaryPriceMutation.isPending || loading}
                                disabled={!Object.keys(summaryPriceMutation.data || {}).length || !sales}
                                type="primary"
                                size="large"
                                className="mt-10"
                                onClick={openModal}>
                                Bayar
                            </Button>
                        )}
                    </Payment>
                )}
            />
        </div>
    )
}

export default function SalesPage() {
    return (
        <SalesProvider>
            <Component />
        </SalesProvider>
    )
}