import { Button } from "antd";
import { PAYMENT_CHANNEL } from "../../@constant";
import { SalesProvider } from "../../context/sales";
import { useConstantContext, useSalesContext } from "../../hooks";
import { CartSales, FilterSales, ModalDp, Payment, SummarySales } from "../../modules";
import { DPSchema } from "../../schema";
import { salesService } from "../../services";
import { formatCurrency, parseNumberFromDots } from "../../utils";

function Component() {
    const { summaryPriceMutation, state: { sales, is_cc, dp_amount, customer }, setState } = useSalesContext();
    const { ccPaymentChannel, paymentChannel } = useConstantContext();

    const onAddDp = ({ dp }: DPSchema) => {
        setState((prev) => ({ ...prev, dp_amount: parseNumberFromDots(dp) }));
    }

    const createOrderFn = async (data: Partial<CreateOrderReq>) => {
        return (await salesService.CreateOrderDp({ ...data, dp_amount })).data?.data;
    }

    const allowedPayment = is_cc ? ccPaymentChannel : paymentChannel;
    const payments = allowedPayment.data
        ?.filter((p) => p.payment_channel_id !== PAYMENT_CHANNEL.CUSTOM.id)
        ?.map((p) => PAYMENT_CHANNEL[p.payment_channel_name as keyof typeof PAYMENT_CHANNEL]);

    const disabledButtonPay = !Object.keys(summaryPriceMutation.data || {}).length || !sales || !dp_amount;

    const paymentComponent = (
        <Payment detailPaymentComponent={(
            <>
                <div className="w-full text-start flex items-start">
                    Nama Customer :
                    <p className="font-semibold ml-5"> {customer?.name}</p>
                </div>
                <div className="w-full text-start flex items-start mt-3">
                    Grand Total :
                    <p className="font-semibold ml-3"> {formatCurrency(summaryPriceMutation.data?.grand_total || 0)}</p>
                </div>
                <div className="w-full text-start flex items-start">
                    Down Payment :
                    <p className="font-semibold ml-3 text-red-400"> {formatCurrency(summaryPriceMutation.data?.dp_amount || 0)}</p>
                </div>
                <div className="w-[200px] my-4 h-[1px] bg-gray-600"></div>
                <div className="w-full text-start flex items-start">
                    Sisa Pembayaran :
                    <p className="font-semibold ml-3"> {formatCurrency(summaryPriceMutation.data?.sisa_pembayaran || 0)}</p>
                </div>
            </>
        )} payments={payments} createOrderMutationFn={createOrderFn}>
            {({ openModal, loading }) => (
                <Button
                    loading={summaryPriceMutation.isPending || loading}
                    disabled={disabledButtonPay}
                    type="primary"
                    size="large"
                    className="mt-10"
                    onClick={openModal}>
                    Bayar
                </Button>
            )}
        </Payment>
    )

    return (
        <div className="container-custom flex gap-8 pb-10">
            <div className="w-full flex flex-col gap-10">
                <FilterSales />
                <CartSales />
            </div>
            <SummarySales paymentComponent={paymentComponent}>
                <ModalDp onSubmit={onAddDp} maxDp={summaryPriceMutation.data?.grand_total}>
                    {({ openModal }) => (
                        <Button onClick={openModal} type="primary" className="!text-white !bg-blue-600 !font-semibold w-full" size="large">
                            Down Payment
                        </Button>
                    )}
                </ModalDp>
            </SummarySales>
        </div>
    )
}

export default function DPSalesPage() {
    return (
        <SalesProvider>
            <Component />
        </SalesProvider>
    )
}