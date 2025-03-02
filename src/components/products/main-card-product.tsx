import { formatCurrency, formatNumberWithDots } from "../../utils";
import Placeholder from '../../asset/placeholder.png'

interface MainCardProductProps {
    product?: Partial<Product>;
    onClick?: (p?: Partial<Product>) => void;
    discount?: number;
}

function AsCard({ product, onClick }: MainCardProductProps) {
    const image = typeof product?.product_images === "string"
        ? product?.product_images
        : product?.product_images?.length
            ? product?.product_images[0]
            : Placeholder

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

function AsListView({ product, onClick, discount = undefined }: MainCardProductProps) {
    const image = typeof product?.product_images === "string"
        ? product?.product_images
        : product?.product_images?.length
            ? product?.product_images[0]
            : Placeholder

    const onClickProduct = () => {
        if (onClick) onClick(product);
    }

    return (
        <button onClick={onClickProduct} title={onClick ? "Klik untuk hapus" : ""} className="text-start">
            <div className="w-full  cursor-pointer flex items-start">
                <img src={image} alt={product?.product_name} className="w-[70px] h-[50px] object-cover bg-gray-100 mr-2" />
                <div className="flex-1">
                    <div className="flex gap-1">
                        <div className="flex-1 text-[9px]">
                            {product?.product_name}
                        </div>
                        <p className="font-bold text-[12px] ml-2">{formatCurrency(product?.product_price)}</p>
                    </div>
                    {discount ? (
                        <div className="w-full flex mt-2 items-center justify-between">
                            <p className="text-red-400 text-[10px]">Discount</p>
                            <p className="text-red-400 text-[10px]">Rp. {formatNumberWithDots(discount)}</p>
                        </div>
                    ) : null}
                </div>
            </div>

        </button>
    )
}

function AsMiniCard({ product, onClick }: MainCardProductProps) {
    const image = typeof product?.product_images === "string"
        ? product?.product_images
        : product?.product_images?.length
            ? product?.product_images[0]
            : Placeholder

    const onClickProduct = () => {
        if (onClick) onClick(product);
    }

    return (
        <button onClick={onClickProduct} type="button" className="w-full h-full bg-white hover:shadow-lg shadow rounded-lg overflow-hidden bg-gray-200 text-start flex flex-col cursor-pointer">
            <img src={image} alt={product?.product_name} className="w-full h-[70px] object-cover bg-gray-100" />
            <div className="p-2">
                <h3 className="text-blue-500 font-semibold text-[10px]">{product?.product_code}</h3>
                <p className="text-[12px] text-gray-900 mt-2">{formatCurrency(product?.product_price)}</p>
                <p className="text-gray-700 text-[10px]">{product?.product_name}</p>
            </div>
        </button>
    )
}

function Simple({ product, discount }: MainCardProductProps & { discount?: number }) {
    const image = typeof product?.product_images === "string"
        ? product?.product_images
        : product?.product_images?.length
            ? product?.product_images[0]
            : Placeholder

    return (
        <div className="w-full cursor-pointer flex items-start">
            <img src={image} alt={product?.product_name} className="w-[70px] h-[50px] object-cover rounded bg-gray-100 mr-2" />
            <div className="flex flex-col gap-2">
                {product?.product_name}
                <p className="font-bold text-[12px]">
                    {formatCurrency(product?.product_price)}
                    {discount && <span className="text-red-400 ml-4">({formatCurrency(discount)})</span>}
                </p>
            </div>
        </div>
    )
}


const MainCardProduct = () => { }

MainCardProduct.AsCard = AsCard;

MainCardProduct.AsListView = AsListView;

MainCardProduct.AsMiniCard = AsMiniCard;

MainCardProduct.Simple = Simple;

export default MainCardProduct;