import { Button, Switch } from "antd";
import { MainCardProduct } from "../../../components";
import { useSalesContext } from "../../../hooks";
import { useMutation } from "@tanstack/react-query";
import salesService from "../../../services/sales/sales";
import { summaryPriceSchema, SummaryPriceSchema } from "../../../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCurrency } from "../../../utils";

export default function SummarySales() {
    const salesContext = useSalesContext();

    const { setValue, getValues } = useForm<SummaryPriceSchema>({
        mode: "onChange",
        resolver: zodResolver(summaryPriceSchema),
    });

    const productFlatten = (() => {
        const packagesProduct = salesContext.state.packages
            .map((pck) => pck.list_child)
            .flat();
        return [...packagesProduct, ...salesContext.state.products];
    })();

    const summaryPriceMutation = useMutation({
        mutationFn: async (data: SummaryPrice) =>
            (await salesService.SummaryPrice(data)).data?.data,
        onSuccess(data) {
            console.log(`${data}`);
        },
    });

    if (!productFlatten.length) return null;

    const productSummary =
        productFlatten.map(
            (val) =>
            ({
                price: val.product_price,
                product_id: val.product_id,
                qty: 1,
            } as ProductSummary)
        ) || [];

    const onChangeService = (checked: boolean) => {
        const isService = checked ? 1 : 0;
        setValue("is_service", isService);

        const data: SummaryPrice = {
            is_service: isService,
            product: productSummary,
            service: getValues("service") || [],
            voucher: getValues("voucher") || [],
            is_cc: getValues("is_cc") || 0,
            voucher_id: getValues("voucher_id") || [],
            voucher_matrix_id: getValues("voucher_matrix_id") || [],
            customer_id: getValues("customer_id") || 150,
        };
        summaryPriceMutation.mutate(data);
    };

    const onChangeCC = (checked: boolean) => {
        const isCC = checked ? 1 : 0;
        setValue("is_cc", isCC);

        const data: SummaryPrice = {
            is_service: getValues("is_service") || 0,
            product: productSummary,
            service: getValues("service") || [],
            voucher: getValues("voucher") || [],
            is_cc: isCC,
            voucher_id: getValues("voucher_id") || [],
            voucher_matrix_id: getValues("voucher_matrix_id") || [],
            customer_id: getValues("customer_id") || 150,
        };
        summaryPriceMutation.mutate(data);
    };

    return (
        <div className="w-[500px] h-fit flex flex-col gap-2 border border-gray-300 rounded p-3">
            <p className="text-gray-800 text-sm font-semibold">Ringkasan</p>
            <div className="flex flex-col gap-3 mt-5">
                {productFlatten.map((p) => (
                    <MainCardProduct.AsListView key={p.product_id} product={p} />
                ))}
            </div>
            {summaryPriceMutation.data?.total_price && (
                <div className="text-start flex items-start mt-3">
                    <div className="flex-1 text-[14px]">Sub Total</div>
                    <p className="text-[14px] font-semibold">
                        {formatCurrency(summaryPriceMutation.data?.total_price)}
                    </p>
                </div>
            )}

            <div className="w-full text-start flex items-start mt-3">
                <p className="flex-1 text-[14px]">Service Charge</p>
                <Switch onChange={onChangeService} />
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
                <Switch onChange={onChangeCC} />
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

            {summaryPriceMutation.data?.total_price && (
                <div className="w-full text-start flex items-start mt-3">
                    <div className="flex-1 text-[14px]">
                        Grand Total
                        <p className="text-[10px]">{`${summaryPriceMutation.data.total_item} Item`}</p>
                    </div>
                    <p className="text-[14px] font-semibold">
                        {formatCurrency(summaryPriceMutation.data?.grand_total)}
                    </p>
                </div>
            )}

            <Button type="primary" size="large" className="mt-20">
                Bayar
            </Button>
        </div>
    );
}
