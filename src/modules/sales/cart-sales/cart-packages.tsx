import CartProduct from "./cart-product";

interface CartPackagesProps {
    productPackage: ProductPackage;
    onDelete?: (id: number, p?: Product) => void;
}

export default function CartPackages({ productPackage, onDelete }: CartPackagesProps) {
    return (
        <div className="border rounded border-primary p-3 flex flex-col gap-4">
            <p className="text-primary uppercase font-semibold">{productPackage.product_name}</p>
            {productPackage.list_child.map((p) => (
                <CartProduct onDelete={() => onDelete ? onDelete(productPackage.product_id, p) : undefined} key={p.product_id} product={p} />
            ))}
        </div>
    )
}