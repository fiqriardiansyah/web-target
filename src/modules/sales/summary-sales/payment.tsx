import React from "react";
import TextArea from "antd/es/input/TextArea";
import { useMutation, useQuery } from "@tanstack/react-query";
import Reportpng from '../../../asset/report.png';
import Tunaipng from '../../../asset/payment-tunai.png';
import Placeholderpng from '../../../asset/placeholder.png';
import Transferpng from '../../../asset/payment-transfer.png';
import Qrcodepng from '../../../asset/payment-qrcode.png';
import Debitpng from '../../../asset/payment-debit.png';
import Creditpng from '../../../asset/payment-credit.png';
import ModalCustom, { ModalCustomProps } from "../../../components/modal/modal";
import salesService from "../../../services/sales/sales";
import { formatCurrency } from "../../../utils";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";

interface PaymentProps extends ModalCustomProps {
    customerID: number;
    customerName: string;
    salesID: number;
    summaryReq: SummaryPrice;
    summaryRes: SummaryResponse;
}

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

const Payment = ({ children, customerID, customerName, salesID, summaryReq, summaryRes, ...props }: PaymentProps) => {
    const closeRef = React.useRef<HTMLButtonElement | null>(null);
    const navigate = useNavigate();

    const paymentChannelQuery = useQuery({
        queryFn: async () => (await salesService.PaymentChannel2({ is_cc: summaryReq.is_cc })).data?.data,
        queryKey: [salesService.paymentChannel],
    });

    const createOrderMutation = useMutation({
        mutationFn: async (data: CreateOrderReq) => (await salesService.CreateOrder(data)).data?.data,
        onSuccess(data) {
            closeRef.current?.click();
            navigate(-1);
            message.success("Success Create Order!");
        },
    });

    const onCreateOrder = (channel: PaymentChannel) => {
        const data: CreateOrderReq = {
            is_service: summaryReq.is_service,
            is_cc: summaryReq.is_cc,
            payment_channel_id: channel.payment_channel_id,
            voucher: [],
            detail_product: summaryReq.product,
            voucher_id: summaryReq.voucher_id,
            voucher_matrix_id: summaryReq.voucher_matrix_id,
            service_order: [],
            customer_id: customerID,
            sales_id: salesID,
            payment_amount: summaryRes.total_pembayaran,
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
                        <p className="font-semibold ml-5"> {customerName}</p>
                    </div>
                    <div className="w-full text-start flex items-start">
                        Total Pembayaran :
                        <p className="font-semibold ml-3"> {formatCurrency(summaryRes.total_pembayaran || 0)}</p>
                    </div>

                    <p className="mt-5">Catatan : </p>
                    <div className="w-full text-start flex items-start mt-1">
                        <div className="flex-1 mr-5">
                            <TextArea rows={3} placeholder="Masukkan catatan jika diperlukan" />
                        </div>
                        <button
                            onClick={() => { }}
                            className="bg-gray-100 cursor-pointer text-gray-500 text-sm font-semibold border borders border-gray-400 rounded h-[75px] w-[300px] flex items-center justify-center"
                        >
                            <img src={Reportpng} alt="" className="w-[50px] mr-5" />
                            Print Performa Invoice
                        </button>
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
                                        className="col-span-1 bg-white text-sm font-semibold border borders border-gray-400 rounded h-[100px] flex items-center justify-center m-2"
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