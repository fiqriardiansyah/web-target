import { Button } from "antd";
import { MainCardProduct, PackageProduct } from "../../../components";
import { useProductPackageContext } from "../../../hooks";
import eventEmitter from "../../../config/event";

export default function SummaryList({ closeModal }: { closeModal?: () => void }) {

    const { state: { packages, products }, setState } = useProductPackageContext();

    const description = (() => {
        if (packages.length && products.length) {
            return `${products.length} Produk & ${packages.length} Paket`;
        }
        if (packages.length) return `${packages.length} Paket`;
        if (products.length) return `${products.length} Produk`;
        return null;
    })();

    const onClickProduct = (prd: Product) => {
        return () => {
            setState((prev) => {
                if (prev?.products.find((p) => p.product_id === prd.product_id)) {
                    return { ...prev, products: prev?.products.filter((p) => p.product_id !== prd.product_id) }
                }
                return { ...prev, products: [...prev.products, prd] }
            })
        }
    }

    const onClickPackage = (prd: ProductPackage) => {
        return () => {
            setState((prev) => {
                if (prev?.packages.find((p) => p.product_id === prd.product_id)) {
                    return { ...prev, packages: prev?.packages.filter((p) => p.product_id !== prd.product_id) }
                }
                return { ...prev, packages: [...prev.packages, prd] }
            })
        }
    }

    const onClickSubmit = () => {
        eventEmitter.emit("PACKAGES_FROM_PRODUCT_PACKAGE", packages);
        eventEmitter.emit("PRODUCTS_FROM_PRODUCT_PACKAGE", products);
        setState((prev) => ({ ...prev, products: [], packages: [] }));
        if (closeModal) closeModal();
    }

    return (
        <div className="w-[400px] border rounded border-gray-300  h-fit p-3">
            {description ? <p className="text-primary font-semibold text-end">
                Terpilih {description}
            </p> : <p className="text-gray-400 text-center">Tidak ada produk atau paket dipilih</p>}
            <div className="flex flex-col gap-5 mt-4">
                {packages.map((p) => <PackageProduct.AsListView onClick={onClickPackage(p)} key={p.product_id} productPackage={p} />)}
                {products.map((p) => <MainCardProduct.AsListView onClick={onClickProduct(p)} key={p.product_id} product={p} />)}
            </div>
            {(packages.length || products.length) ? (
                <Button onClick={onClickSubmit} size="large" type="primary" className="w-full mt-5">
                    Pilih Produk
                </Button>
            ) : null}
        </div>
    )
}