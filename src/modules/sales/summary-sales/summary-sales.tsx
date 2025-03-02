/* eslint-disable @typescript-eslint/no-unused-vars */
import { CloseCircleOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button, message, Switch } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import PlaceholderPng from '../../../asset/placeholder.png';
import { AccountValidationModal, MainCardProduct } from "../../../components";
import { useNavbarContext, useSalesContext } from "../../../hooks";
import { summaryPriceSchema, SummaryPriceSchema } from "../../../schema";
import { salesService } from "../../../services";
import { formatCurrency, formatNumberWithDots } from "../../../utils";
import ChooseVoucher from "./choose-voucher";
import CustomVoucher from "./custom-voucher";

interface SummarySalesProps {
    children?: React.ReactNode;
    paymentComponent?: React.ReactNode;
}

export default function SummarySales({ children, paymentComponent }: SummarySalesProps) {
    const {
        state: { packages, products, vouchers, services, voucherCustom, sales, customer },
        setState,
        resetAll,
        summaryPriceMutation,
        summaryPrice
    } = useSalesContext();
    const { setExtraComponent } = useNavbarContext();

    const { setValue, watch, reset } = useForm<SummaryPriceSchema>({
        mode: "onChange",
        resolver: zodResolver(summaryPriceSchema),
    });

    const valuesForm = watch();

    const draftOrderMutation = useMutation({
        mutationFn: async (data: Partial<CreateOrderReq>) => (await salesService.DraftOrder(data)).data?.data,
        onSuccess() {
            resetAll();
            reset();
            message.success("Success Create Order Draft!");
        },
    });

    const productFlatten = (() => {
        const packagesProduct = packages.map((pck) => pck.list_child).flat();
        return [...packagesProduct, ...products];
    })();

    const onChangeService = (checked: boolean) => {
        const isService = checked ? 1 : 0;
        setValue("is_service", isService);
        setState((prev) => ({ ...prev, is_service: isService }));
    };

    const onChangeCC = (checked: boolean) => {
        const isCC = checked ? 1 : 0;
        setValue("is_cc", isCC);
        setState((prev) => ({ ...prev, is_cc: isCC }));
    };

    const onAddCustomVoucher = (v: VoucherCustomSummary) => {
        setState((prev) => {
            const voucherCustom = [...prev.voucherCustom, { ...v, id: new Date().getTime() }];
            return { ...prev, voucherCustom }
        });
    }

    const onRemoveCustomVoucher = (v: VoucherCustomSummary) => {
        setState((prev) => ({
            ...prev, voucherCustom: voucherCustom.filter((vc) => vc.id !== v.id).map((vc) => {
                const { id, ...rest } = vc;
                return rest;
            })
        }));
    }

    const onDraftClick = () => {
        const data: Partial<CreateOrderReq> = {
            is_service: summaryPrice?.is_service,
            is_cc: summaryPrice?.is_cc,
            voucher: summaryPrice?.voucher,
            detail_product: summaryPrice?.product,
            voucher_id: summaryPrice?.voucher_id,
            voucher_matrix_id: summaryPrice?.voucher_matrix_id,
            service_order: summaryPrice?.service,
            customer_id: customer?.id,
            sales_id: sales?.id,
            payment_amount: summaryPriceMutation.data?.total_pembayaran,
            notes: "",
        }
        draftOrderMutation.mutate(data);
    }

    const getDiscount = ({ id, service }: { id?: number, service?: string }) => {
        const discounts = summaryPriceMutation.data?.list_discount?.filter((el) => {
            if (id) return el.product_id === id;
            return el.service_name === service;
        });
        return discounts?.reduce((sum, curr) => sum + curr.discount_price, 0)
    }

    React.useEffect(() => {
        setExtraComponent(<Button onClick={onDraftClick} loading={draftOrderMutation.isPending} type="primary" size="large" className="w-[100px]">
            Draft
        </Button>);

        return () => {
            setExtraComponent(null);
        }
    }, [draftOrderMutation.isPending]);

    if (!productFlatten.length && !services.length) return null;
    return (
        <div className="w-[500px] flex flex-col items-end gap-3">
            <div className=" h-fit flex flex-col gap-2 border border-gray-300 rounded p-3 sticky-10">
                <p className="text-gray-800 text-sm font-semibold">Ringkasan</p>
                <div className="flex flex-col gap-3 mt-5">
                    {productFlatten.map((p) => {
                        const discount = getDiscount({ id: p.product_id });
                        return <MainCardProduct.AsListView discount={discount} key={p.product_id} product={p} />
                    })}
                    {services.map((s) => {
                        const discount = getDiscount({ service: s.service_name });
                        return <MainCardProduct.AsListView discount={discount} key={s.id} product={{ product_name: s.service_name, product_price: Number(s.price), product_images: PlaceholderPng }} />
                    })}
                </div>
                {summaryPriceMutation.data?.total_price && (
                    <div className="text-start flex items-start mt-3">
                        <div className="flex-1 text-[14px]">Sub Total</div>
                        <p className="text-[14px] font-semibold">
                            {formatCurrency(summaryPriceMutation.data?.total_price)}
                        </p>
                    </div>
                )}

                <div className="flex flex-col gap-5 my-5">
                    {vouchers.map((voucher) => (
                        <div key={voucher.id} className="w-full cursor-pointer h-[100px] rounded-lg border-2 border-dashed border-gray-400">
                            <img src={voucher.image} alt={voucher.title} className="object-cover h-full w-full rounded-lg overflow-hidden" />
                        </div>
                    ))}
                    <ChooseVoucher>
                        {({ openModal }) => (
                            <button onClick={openModal} className="bg-gray-100 cursor-pointer text-gray-500 text-sm font-semibold border borders border-dashed border-gray-400 rounded-xl h-[100px] w-full flex items-center justify-center">
                                Pakai Voucher Lebih Murah
                            </button>
                        )}
                    </ChooseVoucher>
                    <CustomVoucher voucherCustoms={voucherCustom} onSubmit={onAddCustomVoucher} products={productFlatten} services={services}>
                        {({ openModal }) => (
                            <AccountValidationModal onSuccess={openModal}>
                                {({ openModal }) => (
                                    <Button onClick={openModal} disabled={voucherCustom.length >= 3} type="primary" className="!bg-primary/20 !text-primary !font-semibold w-full" size="large">
                                        Tambah custom voucher
                                    </Button>
                                )}
                            </AccountValidationModal>
                        )}
                    </CustomVoucher>
                </div>

                {children}

                <div className="w-full text-start flex items-start mt-3">
                    <p className="flex-1 text-[14px]">Service Charge</p>
                    <Switch checked={!!valuesForm.is_service} onChange={onChangeService} />
                </div>

                {summaryPriceMutation.data?.service_charge_name && (
                    <div className="w-full text-start flex items-start">
                        <p className="flex-1 w-full text-[12px]">
                            {summaryPriceMutation.data.service_charge_name}
                        </p>
                        <p className="text-[12px] font-semibold">
                            {formatCurrency(summaryPriceMutation.data.service_charge)}
                        </p>
                    </div>
                )}

                <div className="w-full text-start flex items-start mt-3">
                    <p className="flex-1 text-[14px]">Credit Card Charge</p>
                    <Switch checked={!!valuesForm.is_cc} onChange={onChangeCC} />
                </div>

                {summaryPriceMutation.data?.cc_charge_name && (
                    <div className="w-full text-start flex items-start">
                        <p className="flex-1 w-full text-[12px]">
                            {summaryPriceMutation.data.cc_charge_name}
                        </p>
                        <p className="text-[12px] font-semibold">
                            {formatCurrency(summaryPriceMutation.data.cc_charge)}
                        </p>
                    </div>
                )}

                {voucherCustom.length ? (
                    <div className="mt-4">
                        <p className="flex-1 text-[14px] mb-2">Custom Voucher</p>
                        <div className="flex flex-col gap-1">
                            {voucherCustom.map((v, i) => (
                                <div key={i} className="w-full flex items-center justify-between">
                                    <p className="text-gray-400 text-sm">
                                        {v.name} <span className="text-red-400 ml-2">({v.price ? 'Rp.' + formatNumberWithDots(v.price) : v.percentage + '%'})</span>
                                    </p>
                                    <button onClick={() => onRemoveCustomVoucher(v)} className="text-red-500 text-lg cursor-pointer">
                                        <CloseCircleOutlined />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}

                {summaryPriceMutation.data?.total_discount ? (
                    <div className="w-full text-start flex items-start mt-3">
                        <div className="flex-1 text-[12px]">
                            Total Discount
                        </div>
                        <p className="text-[14px] font-medium text-red-400">
                            {formatCurrency(summaryPriceMutation.data?.total_discount)}
                        </p>
                    </div>
                ) : null}

                {summaryPriceMutation.data?.total_price ? (
                    <div className="w-full text-start flex items-start mt-3">
                        <div className="flex-1 text-[14px] font-semibold">
                            Grand Total
                            <p className="text-[10px]">{`${summaryPriceMutation.data.total_item} Item`}</p>
                        </div>
                        <p className="text-[14px] font-semibold">
                            {formatCurrency(summaryPriceMutation.data?.grand_total)}
                        </p>
                    </div>
                ) : null}

                {summaryPriceMutation.data?.dp_amount ? (
                    <div className="w-full text-start flex items-start mt-3">
                        <div className="flex-1 text-[12px]">
                            Down Payment
                        </div>
                        <p className="text-[14px] font-medium text-red-400">
                            {formatCurrency(summaryPriceMutation.data?.dp_amount)}
                        </p>
                    </div>
                ) : null}

                {summaryPriceMutation.data?.sisa_pembayaran ? (
                    <div className="w-full text-start flex items-start mt-3">
                        <div className="flex-1 text-[14px] font-semibold">
                            Sisa Pembayaran
                        </div>
                        <p className="text-[14px] font-semibold">
                            {formatCurrency(summaryPriceMutation.data?.sisa_pembayaran)}
                        </p>
                    </div>
                ) : null}

                {paymentComponent}
            </div>
        </div>
    );
}
