import { CartSales, FilterSales } from "../../modules";
import { SummarySales } from "../../modules/sales/summary-sales";

export default function SalesPage() {

    return (
        <div className="container-custom flex gap-8 pb-10">
            <div className="w-full flex flex-col gap-10">
                <FilterSales />
                <CartSales />
            </div>
            <SummarySales />
        </div>
    )
}