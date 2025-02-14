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

    const onServiceDelete = (service?: { id: number } & ServiceSummary) => {
        salesContext.setState((prev) => ({ ...prev, services: prev.services.filter((s) => s.id !== service?.id) }));
    }

    const onProductQtyChange = (id: number, qty: number) => {
        salesContext.setState((prev) => ({
            ...prev,
            products: prev.products.map((p) => {
                if (p.product_id !== id) return p;
                return {
                    ...p,
                    qty
                }
            })
        }));
    }

    const onPackageProductQtyChange = ({ packageId, productId, qty }: { productId: number, qty: number, packageId: number }) => {
        salesContext.setState((prev) => ({
            ...prev,
            packages: prev.packages.map((pck) => {
                if (pck.product_id !== packageId) return pck;
                return {
                    ...pck,
                    list_child: pck.list_child.map((p) => {
                        if (p.product_id !== productId) return p;
                        return {
                            ...p,
                            qty
                        }
                    })
                }
            })
        }));
    }


    const onProductPriceChange = (id: number, price: number) => {
        salesContext.setState((prev) => ({
            ...prev,
            products: prev.products.map((p) => {
                if (p.product_id !== id) return p;
                return {
                    ...p,
                    product_price: price
                }
            })
        }));
    }

    const onPackageProductPriceChange = ({ packageId, productId, price }: { productId: number, price: number, packageId: number }) => {
        salesContext.setState((prev) => ({
            ...prev,
            packages: prev.packages.map((pck) => {
                if (pck.product_id !== packageId) return pck;
                return {
                    ...pck,
                    list_child: pck.list_child.map((p) => {
                        if (p.product_id !== productId) return p;
                        return {
                            ...p,
                            product_price: price,
                        }
                    })
                }
            })
        }));
    }

    return (
        <div className="flex flex-col gap-8">
            {salesContext.state?.packages?.map((p) => (
                <CartPackages
                    onChangePrice={onPackageProductPriceChange}
                    onChangeQty={onPackageProductQtyChange}
                    onDelete={onPackageProductDelete}
                    key={p.product_id}
                    productPackage={p} />
            ))}
            {salesContext.state?.products.map((p) => (
                <CartProduct
                    onChangePrice={(v) => onProductPriceChange(p.product_id, v)}
                    onChangeQty={(q) => onProductQtyChange(p.product_id, q)}
                    onDelete={onProductDelete}
                    key={p.product_id}
                    product={p} />
            ))}
            {salesContext.state.services?.map((s) => (
                <CartService key={s.id} service={s} onDelete={onServiceDelete} />
            ))}
        </div>
    )
}