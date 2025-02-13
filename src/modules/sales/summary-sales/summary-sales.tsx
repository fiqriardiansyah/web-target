import { Button } from "antd";
import { MainCardProduct } from "../../../components";
import { useSalesContext } from "../../../hooks";

export default function SummarySales() {

    const salesContext = useSalesContext();

    const productFlatten = (() => {
        const packagesProduct = salesContext.state.packages.map((pck) => pck.list_child).flat();
        return [...packagesProduct, ...salesContext.state.products];
    })();

    if (!productFlatten.length) return null;

    return (
        <div className="w-[350px] h-fit flex flex-col gap-5 border border-gray-300 rounded p-3">
            <p className="text-gray-800 text-sm font-semibold">Ringkasan</p>
            <div className="flex flex-col gap-3 mt-5">
                {productFlatten.map((p) => (
                    <MainCardProduct.AsListView key={p.product_id} product={p} />
                ))}
            </div>
            <Button type="primary" size="large" className="mt-20">
                Bayar
            </Button>
        </div>
    )
}