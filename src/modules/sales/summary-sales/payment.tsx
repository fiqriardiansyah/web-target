import { useMutation, useQuery } from "@tanstack/react-query";
import { message, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import Creditpng from '../../../asset/payment-credit.png';
import Debitpng from '../../../asset/payment-debit.png';
import Qrcodepng from '../../../asset/payment-qrcode.png';
import Transferpng from '../../../asset/payment-transfer.png';
import Tunaipng from '../../../asset/payment-tunai.png';
import Placeholderpng from '../../../asset/placeholder.png';
import { ButtonPrint } from "../../../components";
import ModalCustom, { ModalCustomProps } from "../../../components/modal/modal";
import { useSalesContext } from "../../../hooks";
import salesService from "../../../services/sales/sales";
import { formatCurrency } from "../../../utils";

const IMG_PAYMENT_CHANNEL = [
    {
        value: 6,
        img: Tunaipng,
    },
    {
        value: 7,
        img: Transferpng,
    },
    {
        value: 8,
        img: Qrcodepng,
    },
    {
        value: 9,
        img: Debitpng,
    },
    {
        value: 10,
        img: Creditpng,
    },
];

interface PaymentProps extends ModalCustomProps {
    any?: unknown
}

const Payment = ({ children, ...props }: PaymentProps) => {
    const { summaryPrice, summaryPriceMutation, state: { customer, sales }, resetAll } = useSalesContext();
    const closeRef = React.useRef<HTMLButtonElement | null>(null);

    const [notes, setNotes] = React.useState('');

    const paymentChannelQuery = useQuery({
        queryFn: async () => (await salesService.PaymentChannel({ is_cc: summaryPrice!.is_cc })).data?.data,
        queryKey: [salesService.paymentChannel, summaryPrice?.is_cc],
    });

    const createOrderMutation = useMutation({
        mutationFn: async (data: Partial<CreateOrderReq>) => {
            if (data.is_cc) {
                return (await salesService.CreateOrderDp(data)).data?.data
            }
            return (await salesService.CreateOrder(data)).data?.data;
        },
        onSuccess() {
            resetAll();
            closeRef.current?.click();
            message.success("Success Create Order!");
        },
    });

    const onCreateOrder = (channel: PaymentChannel) => {
        const data: Partial<CreateOrderReq> = {
            is_service: summaryPrice?.is_service,
            is_cc: summaryPrice?.is_cc,
            payment_channel_id: channel.payment_channel_id,
            voucher: summaryPrice?.voucher,
            detail_product: summaryPrice?.product,
            voucher_id: summaryPrice?.voucher_id,
            voucher_matrix_id: summaryPrice?.voucher_matrix_id,
            service_order: summaryPrice?.service,
            customer_id: customer?.id,
            sales_id: sales?.id,
            payment_amount: summaryPriceMutation.data?.total_pembayaran,
            notes
        }
        createOrderMutation.mutate(data);
    };

    return (
        <ModalCustom width={1000} title={<p className="font-semibold text-lg">Pembayaran</p>} {...props} handlerInComponent={children} footer={null}>
            {(ctrl) => (
                <>
                    <button ref={closeRef} type="button" className="hidden" onClick={ctrl.closeModal}>
                        close
                    </button>
                    <div className="w-full text-start flex items-start mt-5">
                        Nama Customer :
                        <p className="font-semibold ml-5"> {customer?.name}</p>
                    </div>
                    <div className="w-full text-start flex items-start">
                        Total Pembayaran :
                        <p className="font-semibold ml-3"> {formatCurrency(summaryPriceMutation.data?.total_pembayaran || 0)}</p>
                    </div>

                    <p className="mt-5">Catatan : </p>
                    <div className="w-full text-start flex items-start mt-1">
                        <div className="flex-1 mr-5">
                            <TextArea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Masukkan catatan jika diperlukan" />
                        </div>
                        <ButtonPrint text="Print Performa Invoice" />
                    </div>

                    {(paymentChannelQuery?.isPending || createOrderMutation.isPending) && <div className="w-full flex items-center h-[150px] justify-center col-span-3">
                        <Spin size="large" />
                    </div>}

                    {!paymentChannelQuery.isLoading &&
                        <>
                            <p className="mt-5 font-semibold">Pembayaran Melalui : </p>
                            <div className="w-full grid grid-cols-3 mt-1 bg-gray-100 p-5">
                                {paymentChannelQuery.data?.map((val) => (
                                    <button
                                        onClick={() => onCreateOrder(val)}
                                        className="cursor-pointer col-span-1 bg-white text-sm font-semibold border borders border-gray-400 rounded h-[100px] flex items-center justify-center m-2"
                                    >
                                        <img src={IMG_PAYMENT_CHANNEL.find((val2) => val2.value === val.payment_channel_id)?.img || Placeholderpng} alt="" className="h-[70px] mr-5" />
                                        {val.payment_channel_name}
                                    </button>
                                ))}

                            </div>
                        </>
                    }
                </>
            )}
        </ModalCustom>
    )
}

export default Payment;