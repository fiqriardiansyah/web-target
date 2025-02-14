import { useSalesContext } from "../../../hooks";
import CartPackages from "./cart-packages";
import CartProduct from "./cart-product";
import CartService from "./cart-service";

export default function CartSales() {
    const salesContext = useSalesContext();

    const onProductDelete = (p?: Product) => {
        if (!p) return;
        salesContext.setState((prev) => ({ ...prev, products: prev.products.filter((prd) => prd.product_id !== p.product_id) }))
    }

    const onPackageProductDelete = (id: number, p?: Product) => {
        if (!p) return;
        salesContext.setState((prev) => {
            const packages = prev.packages.map((pck) => {
                if (pck.product_id !== id) return pck;
                return {
                    ...pck,
                    list_child: pck.list_child.filter((prd) => prd.product_id !== p.product_id),
                }
            }).filter((pck) => pck.list_child.length);
            return {
                ...prev,
                packages
            }
        })
    }

    const onServiceDelete = () => {
        salesContext.setState((prev) => ({ ...prev, service: undefined }));
    }

    return (
        <div className="flex flex-col gap-8">
            {salesContext.state?.packages?.map((p) => (
                <CartPackages onDelete={onPackageProductDelete} key={p.product_id} productPackage={p} />
            ))}
            {salesContext.state?.products.map((p) => (
                <CartProduct onDelete={onProductDelete} key={p.product_id} product={p} />
            ))}
            {salesContext.state.service && <CartService service={salesContext.state.service} onDelete={onServiceDelete} />}
        </div>
    )
}