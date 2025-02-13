import MainCardProduct from "./main-card-product";

interface PackageProductProps {
    productPackage?: ProductPackage;
    onClick?: (p?: ProductPackage) => void;
}

const AsListView = ({ productPackage, onClick }: PackageProductProps) => {
    const onClickProduct = () => {
        if (onClick) onClick(productPackage);
    }

    return <button onClick={onClickProduct} title="Klik untuk hapus" className="text-start w-full flex flex-col gap-4 border border-primary rounded p-2">
        <p className="text-primary uppercase font-semibold">{productPackage?.product_name}</p>
        {productPackage?.list_child.map((product) => (
            <MainCardProduct.AsListView key={product.product_id} product={product} />
        ))}
    </button>
}

const AsCard = ({ productPackage, onClick }: PackageProductProps) => {
    const onClickProduct = () => {
        if (onClick) onClick(productPackage);
    }

    return <button onClick={onClickProduct} className="flex w-full flex-col gap-3 bg-gray-100 p-3 rounded shadow-lg text-start cursor-pointer">
        <p className="text-primary uppercase font-semibold">{productPackage?.product_name}</p>
        <div className="grid grid-cols-3 gap-3">
            {productPackage?.list_child?.map((product) => (
                <MainCardProduct.AsCard key={product.product_id} product={product} />
            ))}
        </div>
    </button>
}

const PackageProduct = () => { }

PackageProduct.AsCard = AsCard;

PackageProduct.AsListView = AsListView;

export default PackageProduct;