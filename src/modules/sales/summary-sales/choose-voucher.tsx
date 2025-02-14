import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import React from "react";
import { ModalCustom, ModalCustomProps } from "../../../components";
import { useSalesContext } from "../../../hooks";
import { salesService } from "../../../services";

const ChooseVoucher = ({ children, ...props }: ModalCustomProps) => {
    const { setState, state: { vouchers } } = useSalesContext();

    const closeRef = React.useRef<HTMLButtonElement | null>(null);

    const [page] = React.useState(1);

    const voucherMutate = useQuery({
        queryFn: async () => (await salesService.Voucher({ page })).data?.data,
        queryKey: [page]
    });

    const onClickVoucher = (voucher: Voucher) => {
        return () => {
            setState((prev) => {
                const isVoucherExist = prev.vouchers.find((v) => v.id === voucher.id);
                if (isVoucherExist) {
                    return {
                        ...prev,
                        vouchers: prev.vouchers.filter((v) => v.id !== voucher.id),
                    }
                }

                if (prev.vouchers.length >= 5) return prev;

                return {
                    ...prev,
                    vouchers: [...prev.vouchers, voucher]
                }
            })
        }
    }

    const resetVouchers = () => {
        setState((prev) => ({ ...prev, vouchers: [] }))
    }

    return (
        <ModalCustom width={400} title={<p className="font-semibold text-lg">Voucher</p>} {...props} handlerInComponent={children} footer={null}>
            {(ctrl) => (
                <>
                    <button ref={closeRef} type="button" className="hidden" onClick={ctrl.closeModal}>
                        close
                    </button>
                    <div className="flex flex-col gap-4">
                        {voucherMutate.data?.list?.map((voucher) => (
                            <div className="relative w-full" key={voucher.id}>
                                {vouchers.find((v) => v.id === voucher.id) && (
                                    <div className="bg-black/30 w-full rounded h-full absolute top-0 left-0 z-10 pointer-events-none flex items-center justify-center">
                                        <div className="py-1 text-lg px-5 rounded bg-black/60 text-white font-semibold">
                                            Terpilih
                                        </div>
                                    </div>
                                )}
                                <p className="text-sm font-semibold mb-2">{voucher.title}</p>
                                <button onClick={onClickVoucher(voucher)} key={voucher.id} className="w-full cursor-pointer h-[100px] rounded-lg border-2 border-dashed border-gray-400">
                                    <img src={voucher.image} alt={voucher.title} className="object-cover h-full w-full rounded-lg overflow-hidden" />
                                </button>
                            </div>
                        ))}
                        <Button onClick={resetVouchers} type="primary" danger className="mt-10" size="large">
                            Atur Ulang
                        </Button>
                    </div>
                </>
            )}
        </ModalCustom>
    )
}

export default ChooseVoucher;