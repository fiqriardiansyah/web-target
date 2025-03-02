import { ArrowLeftOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, message, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useForm } from "react-hook-form";
import CreditPng from '../../../asset/payment-credit.png';
import Debitpng from '../../../asset/payment-debit.png';
import Qrcodepng from '../../../asset/payment-qrcode.png';
import Transferpng from '../../../asset/payment-transfer.png';
import Tunaipng from '../../../asset/payment-tunai.png';
import Placeholderpng from '../../../asset/placeholder.png';
import TargetPng from '../../../asset/target.png';
import { ButtonPrint, ControlledInputNumber } from "../../../components";
import ModalCustom, { ModalCustomProps } from "../../../components/modal/modal";
import { useSalesContext } from "../../../hooks";
import { editPriceSchema, EditPriceSchema } from "../../../schema";
import salesService from "../../../services/sales/sales";
import { formatCurrency, parseNumberFromDots } from "../../../utils";

const MAX_CUSTOM_PAYMENTS = 2;
const PAYMENT_CUSTOM_ID = 11;
const PAYMENT_CHANNEL_IMAGES = [
    {
        value: 6,
        img: Tunaipng,
        text: 'TUNAI'
    },
    {
        value: 7,
        img: Transferpng,
        text: 'TRANSFER'
    },
    {
        value: 8,
        img: Qrcodepng,
        text: 'QRIS'
    },
    {
        value: 9,
        img: Debitpng,
        text: 'DEBIT'
    },
    {
        value: 10,
        img: CreditPng,
        text: 'CREDIT'
    },
    {
        value: PAYMENT_CUSTOM_ID,
    },
];


interface PaymentProps extends ModalCustomProps {
    any?: unknown
}

const Payment = ({ children, ...props }: PaymentProps) => {
    const { summaryPrice, summaryPriceMutation, state: { customer, sales }, resetAll } = useSalesContext();
    const closeRef = React.useRef<HTMLButtonElement | null>(null);

    const [notes, setNotes] = React.useState('');
    const [isCustomPayment, setIsCustomPayment] = React.useState(false);
    const [customPayments, setCustomPayments] = React.useState<number[]>([]);
    const [selectedInputCustomPrice, setSelectedInputCustomPrice] = React.useState<number | undefined>();

    const isMaxCustomPayment = customPayments.length >= MAX_CUSTOM_PAYMENTS;

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

    const onPaymentCustoms = (id: number) => {
        return () => {
            setCustomPayments((prev) => {
                if (isMaxCustomPayment && !prev.find((i) => i === id)) return prev;
                if (prev.find((i) => i === id)) {
                    return prev.filter((i) => i !== id);
                }
                return [...prev, id];
            });
        }
    }

    const onPay = (channelId: number) => {
        const data: Partial<CreateOrderReq> = {
            is_service: summaryPrice?.is_service,
            is_cc: summaryPrice?.is_cc,
            payment_channel_id: channelId,
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
    }

    const onChoosePayment = (channelId: number) => {
        if (channelId === PAYMENT_CUSTOM_ID) {
            setIsCustomPayment(true);
            return;
        }
        onPay(channelId);
    };

    const { control, handleSubmit, watch } = useForm<EditPriceSchema>({
        mode: 'onChange',
        resolver: zodResolver(
            editPriceSchema.refine((data) => parseNumberFromDots(data.price) < (summaryPriceMutation.data?.total_pembayaran || 0), {
                message: `Tidak bisa sama atau lebih dari ${formatCurrency(summaryPriceMutation.data?.total_pembayaran)}`,
                path: ["price"]
            })
        ),
    });

    React.useEffect(() => {
        setSelectedInputCustomPrice(customPayments[0]);
    }, [isMaxCustomPayment, customPayments]);

    const onSubmitForm = (data: EditPriceSchema) => {
        console.log(data);
    };

    return (
        <ModalCustom width={1000} title={<p className="font-semibold text-lg">Pembayaran</p>} {...props} handlerInComponent={children} footer={null}>
            {(ctrl) => (
                <>
                    <button ref={closeRef} type="button" className="hidden" onClick={ctrl.closeModal}>
                        close
                    </button>
                    {isCustomPayment ? (
                        <div className="mt-5 pb-10">
                            <div className="flex items-center">
                                <Button onClick={() => setIsCustomPayment(false)} shape='circle' icon={<ArrowLeftOutlined />} />
                                <img src={TargetPng} className='h-[30px] ml-5' alt="" />
                            </div>
                            <p className="font-semibold mt-4">Silahkan pilih {MAX_CUSTOM_PAYMENTS} tipe pembayaran</p>
                            <div className="p-2 grid grid-cols-5 gap-3 bg-slate-200 mt-4">
                                {PAYMENT_CHANNEL_IMAGES.filter((i) => i.value !== PAYMENT_CUSTOM_ID).map((val) => {
                                    const isPick = customPayments.find((c) => c === val.value);
                                    return (
                                        <button
                                            key={val.value}
                                            onClick={onPaymentCustoms(val.value)}
                                            style={{ filter: !isPick && isMaxCustomPayment ? 'grayscale(1)' : '' }}
                                            className={`
                                                ${isPick ? 'bg-primary/20' : 'bg-white'} cursor-pointer col-span-1 text-sm font-semibold p-3 rounded h-[100px] shadow-lg flex-col hover:shadow flex items-center justify-center m-2
                                            `}
                                        >
                                            <img src={val.img} alt="" className="h-[60px] mb-1" />
                                            {val.text}
                                        </button>
                                    )
                                })}
                            </div>
                            {customPayments.length >= MAX_CUSTOM_PAYMENTS && (
                                <div className="flex flex-col mt-10">
                                    <p className="text-lg mb-7">Total Pembayaran <span className="font-bold ml-2 text-xl">{formatCurrency(summaryPriceMutation.data?.total_pembayaran || 0)}</span></p>
                                    {customPayments.map((id, index) => {
                                        const payment = PAYMENT_CHANNEL_IMAGES.find((p) => p.value === id);
                                        return (
                                            <>
                                                <div onClick={() => setSelectedInputCustomPrice(id)} className="flex gap-8 cursor-pointer" key={id}>
                                                    <div className="w-[80px] flex items-center justify-center">
                                                        <img src={payment?.img} className="h-[60px] object-cover" alt="" />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <p className="font-semibold">Pembayaran {payment?.text}</p>
                                                        {selectedInputCustomPrice === id ? (
                                                            <Form className="flex gap-4" onFinish={handleSubmit(onSubmitForm)}>
                                                                <ControlledInputNumber
                                                                    name="price"
                                                                    inputProps={{ addonBefore: 'Rp', size: 'large', placeholder: 'Masukkan nominal potongan', className: 'w-[300px]' }}
                                                                    control={control} />
                                                                <Button size="large" type="primary" htmlType="submit" className="!px-5">
                                                                    Bayar
                                                                </Button>
                                                            </Form>
                                                        ) : (
                                                            <p className="font-bold text-xl">{formatCurrency((summaryPriceMutation.data?.total_pembayaran || 0) - parseNumberFromDots(watch("price")))}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                {index !== customPayments.length - 1 && (
                                                    <div className="w-full h-[1px] bg-gray-400 my-5"></div>
                                                )}
                                            </>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="">
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
                                                onClick={() => onChoosePayment(val.payment_channel_id)}
                                                className="cursor-pointer col-span-1 bg-white text-sm font-semibold border borders border-gray-400 rounded h-[100px] flex items-center justify-center m-2"
                                            >
                                                <img src={PAYMENT_CHANNEL_IMAGES.find((val2) => val2.value === val.payment_channel_id)?.img || Placeholderpng} alt="" className="h-[70px] mr-5" />
                                                {val.payment_channel_name}
                                            </button>
                                        ))}

                                    </div>
                                </>
                            }
                        </div>
                    )}
                </>
            )}
        </ModalCustom>
    )
}

export default Payment;