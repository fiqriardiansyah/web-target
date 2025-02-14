import CartProduct from "./cart-product";

interface CartPackagesProps {
    productPackage: ProductPackage;
    onDelete?: (id: number, p?: Product) => void;
    onChangeQty?: (d: { qty: number; packageId: number; productId: number }) => void;
    onChangePrice?: (d: { price: number; packageId: number; productId: number }) => void;
}

export default function CartPackages({ productPackage, onDelete, onChangeQty, onChangePrice }: CartPackagesProps) {

    const onChangeQtyProduct = (id: number, qty: number) => {
        if (onChangeQty) onChangeQty({ packageId: productPackage.product_id, qty, productId: id });
    }

    const onChangePriceProduct = (id: number, price: number) => {
        if (onChangePrice) onChangePrice({ packageId: productPackage.product_id, price, productId: id });
    }

    return (
        <div className="border rounded border-primary p-3 flex flex-col gap-4">
            <p className="text-primary uppercase font-semibold">{productPackage.product_name}</p>
            {productPackage.list_child.map((p) => (
                <CartProduct
                    onChangePrice={(v) => onChangePriceProduct(p.product_id, v)}
                    onChangeQty={(q) => onChangeQtyProduct(p.product_id, q)}
                    onDelete={() => onDelete ? onDelete(productPackage.product_id, p) : undefined}
                    key={p.product_id}
                    product={p} />
            ))}
        </div>
    )
}