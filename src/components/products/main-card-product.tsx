import { formatCurrency } from "../../utils";
import TargetBgBlue from '../../asset/target-bg-blue.png';

interface MainCardProductProps {
    product?: Product;
    onClick?: (p?: Product) => void;
}

function AsCard({ product, onClick }: MainCardProductProps) {
    const image = typeof product?.product_images === "string"
        ? product?.product_images
        : product?.product_images?.length
            ? product?.product_images[0]
            : TargetBgBlue

    const onClickProduct = () => {
        if (onClick) onClick(product);
    }

    return (
        <button onClick={onClickProduct} className="w-full h-full bg-white hover:shadow-lg shadow rounded-lg overflow-hidden bg-gray-200 text-start flex flex-col cursor-pointer">
            <img src={image} alt={product?.product_name} className="w-full h-32 object-cover bg-gray-100" />
            <div className="p-4">
                <h3 className="text-blue-500 font-semibold text-sm">{product?.product_code}</h3>
                <p className="text-gray-700 text-sm">{product?.product_name}</p>

                <p className="text-lg font-bold text-gray-900 mt-2">{formatCurrency(product?.product_price)}</p>

                <div className="mt-3 flex justify-between items-center">
                    {product?.is_pkg && <div className="bg-primary/60 text-white text-xs font-semibold px-3 py-1 rounded-md">Package WO</div>}
                    <div className="text-gray-600 text-xs">
                        <p>In Store : <span className="font-semibold">{product?.store}</span></p>
                        <p>All Stock : <span className="font-semibold">{product?.stock}</span></p>
                    </div>
                </div>
            </div>
        </button>
    )
}

function AsListView({ product, onClick }: MainCardProductProps) {
    const image = typeof product?.product_images === "string"
        ? product?.product_images
        : product?.product_images?.length
            ? product?.product_images[0]
            : TargetBgBlue

    const onClickProduct = () => {
        if (onClick) onClick(product);
    }

    return (
        <button onClick={onClickProduct} title="Klik untuk hapus" className="w-full text-start cursor-pointer flex items-start">
            <img src={image} alt={product?.product_name} className="w-[70px] h-[50px] object-cover bg-gray-100 mr-2" />
            <div className="flex-1 text-[9px]">
                {product?.product_name}
            </div>
            <p className="font-bold text-[12px]">{formatCurrency(product?.product_price)}</p>
        </button>
    )
}

const MainCardProduct = () => { }

MainCardProduct.AsCard = AsCard;

MainCardProduct.AsListView = AsListView;

export default MainCardProduct;