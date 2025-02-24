import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNavbarContext } from "../../hooks";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import dayjs from "dayjs";
import SettingPng from '../../asset/setting.png';
import { ButtonPrint, Loading, MainCardProduct, StateRender } from "../../components";
import transactionService from "../../services/transaction/transaction";
import { formatCurrency } from "../../utils";

import { ModalCancelNote } from "../../modules";

export default function TransactionDetail() {
    const navigate = useNavigate();
    const { setExtraComponent } = useNavbarContext();
    const { id } = useParams<{ id: string }>();

    const detailQuery = useQuery({
        queryFn: async () => (await transactionService.DetailTransaction(id!)).data?.data,
        enabled: !!id,
        queryKey: [id],
    });

    const cancelMutation = useMutation({
        mutationFn: async (note: string) => (await transactionService.CancelationTransaction({ id: id!, note })).data,
        onSettled: () => detailQuery.refetch(),
    });

    // const uploadReceiptMutation = useMutation({
    //     mutationFn: async (dt: UploadReceipt) => (await transactionService.UploadReceipt(dt)).data?.data,
    //     onSettled: () => detailQuery.refetch(),
    // })

    React.useEffect(() => {
        setExtraComponent(() => (
            <button onClick={() => navigate('/setting')} className="cursor-pointer" title="Setting">
                <img src={SettingPng} className="w-7" alt="" />
            </button>
        ));

        return () => {
            setExtraComponent(undefined);
        }
    }, []);

    return (
        <div className="container-custom pb-10">
            <StateRender data={!!detailQuery.data} isError={detailQuery.isError} isLoading={detailQuery.isPending}>
                <StateRender.Data>
                    <div className="flex flex-col gap-10">
                        <div className="flex gap-10">
                            <div className="flex-1 flex-col flex gap-5">
                                {detailQuery.data?.dp_no && (
                                    <div className="">
                                        <div className="font-bold">Nomor DP</div>
                                        <div>{detailQuery.data?.dp_no}</div>
                                    </div>
                                )}
                                {detailQuery.data?.inv_no && (
                                    <div className="">
                                        <div className="font-bold">Nomor Invoice</div>
                                        <div>{detailQuery.data?.inv_no}</div>
                                    </div>
                                )}
                                {detailQuery.data?.customer_name && (
                                    <div className="">
                                        <div className="font-bold">Nama Customer</div>
                                        <div>{detailQuery.data?.customer_name}</div>
                                    </div>
                                )}
                                {detailQuery.data?.sales_name && (
                                    <div className="">
                                        <div className="font-bold">Nama Sales</div>
                                        <div>{detailQuery.data?.sales_name}</div>
                                    </div>
                                )}
                                {detailQuery.data?.payment_channel_name && (
                                    <div className="">
                                        <div className="font-bold">Payment Method</div>
                                        <div>{detailQuery.data?.payment_channel_name}</div>
                                    </div>
                                )}
                                {detailQuery.data?.total_product_price ? (
                                    <div className="">
                                        <div className="font-bold">Sub Total</div>
                                        <div>{formatCurrency(detailQuery.data?.total_product_price)}</div>
                                    </div>
                                ) : null}
                                {detailQuery.data?.total_discount ? (
                                    <div className="">
                                        <div className="font-bold">Total Discount</div>
                                        <div className="text-red-400">{formatCurrency(detailQuery.data?.total_discount)}</div>
                                    </div>
                                ) : null}
                                {detailQuery.data?.grand_total ? (
                                    <div className="">
                                        <div className="font-bold">Grand Total</div>
                                        <div>{formatCurrency(detailQuery.data?.grand_total)}</div>
                                    </div>
                                ) : null}
                                {detailQuery.data?.dp_amount ? (
                                    <div className="">
                                        <div className="font-bold">Down Payment</div>
                                        <div>{formatCurrency(detailQuery.data?.dp_amount)}</div>
                                    </div>
                                ) : null}
                                {detailQuery.data?.total_pelunasan ? (
                                    <div className="">
                                        <div className="font-bold">Total Pelunasan</div>
                                        <div>{formatCurrency(detailQuery.data?.total_pelunasan)}</div>
                                    </div>
                                ) : null}
                            </div>
                            <div className="flex-1 flex-col flex gap-5">
                                {detailQuery.data?.ref_no && (<div className="">
                                    <div className="font-bold">Nomor Referensi</div>
                                    <div>{detailQuery.data?.ref_no}</div>
                                </div>)}
                                {detailQuery.data?.created_at && (
                                    <div className="">
                                        <div className="font-bold">Tanggal Transaksi</div>
                                        <div>{dayjs(detailQuery.data?.created_at).format("DD MMM YYYY, HH:ss")}</div>
                                    </div>
                                )}
                                {detailQuery.data?.image && (
                                    <div className="">
                                        <div className="font-bold">Foto Bukti Pembayaran</div>
                                        <img src={detailQuery.data.image} alt="" className="h-[250px]" />
                                    </div>
                                )}

                                <Button loading={detailQuery.isPending} type="primary" className="w-[300px]" size="large">
                                    Upload Bukti Pembayaran
                                </Button>
                                <ButtonPrint text="Print Struk Transaksi" />
                                {detailQuery.data?.is_cancellation_req ? (
                                    <div className="bg-red-600/40 text-white flex items-center justify-center py-3 w-[300px] rounded-lg font-semibold">
                                        CANCELED
                                    </div>
                                ) : (
                                    <ModalCancelNote onSubmit={(note) => cancelMutation.mutate(note.note)}>
                                        {({ openModal }) => (
                                            <Button
                                                loading={cancelMutation.isPending || detailQuery.isPending}
                                                onClick={openModal} danger type="primary" className="w-[300px]" size="large">
                                                Batalkan Transaksi
                                            </Button>
                                        )}
                                    </ModalCancelNote>
                                )}
                                {detailQuery.data?.is_cancellation_req ? (
                                    <div className="">
                                        <div className="font-bold">Alasan Pembatalan</div>
                                        <div>{detailQuery.data?.cancel_note}</div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            {detailQuery.data?.list_detail_order?.map((p) => (
                                <div className="flex items-center justify-between bg-gray-100 hover:shadow shadow-lg p-3">
                                    <MainCardProduct.Simple product={{
                                        product_name: p.product_name,
                                        product_price: p.price,
                                    }} />
                                    <div className="bg-gray-300 text-gray-900 w-8 h-8 flex items-center justify-center rounded">{p.qty}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </StateRender.Data>
                <StateRender.Loading>
                    <Loading />
                </StateRender.Loading>
            </StateRender>
        </div>
    )
}