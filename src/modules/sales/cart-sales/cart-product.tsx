import { DeleteOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React from 'react';
import TargetBgBlue from '../../../asset/target-bg-blue.png';
import { formatCurrency } from '../../../utils';
import CartEditPriceProduct from './cart-edit-price-product';

interface CartProductProps {
    product?: Product;
    onDelete?: (p?: Product) => void;
    asService?: boolean;
    onChangeQty?: (qty: number) => void;
    onChangePrice?: (price: number) => void;
}

export default function CartProduct({ product, onChangePrice, onDelete, onChangeQty }: CartProductProps) {
    const [qty, setQty] = React.useState(1);

    const image = typeof product?.product_images === "string"
        ? product?.product_images
        : product?.product_images?.length
            ? product?.product_images[0]
            : TargetBgBlue;

    React.useEffect(() => {
        if (onChangeQty) onChangeQty(qty);
    }, [qty]);

    const onChangeQtyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace(/\D/g, "");
        const qty = parseInt(newValue === '' ? '0' : newValue);
        if (qty >= (product?.stock || 1)) {
            setQty((product?.stock || 1))
            return;
        };
        setQty(qty);
    };

    const onChangePriceInput = (price: number) => {
        if (onChangePrice) onChangePrice(price);
    }

    const increaseQty = () => setQty((prev) => prev >= (product?.stock || 1) ? prev : prev + 1);
    const decreaseQty = () => setQty((prev) => prev <= 1 ? 1 : prev - 1);

    const onDeleteClick = () => {
        if (onDelete) onDelete(product)
    }

    return (
        <div className="w-full flex justify-between gap-8">
            <div className="flex gap-5">
                <img src={image} alt={product?.product_name} className="w-[80px] h-[70px] object-cover rounded bg-gray-200" />
                <div className="flex flex-col">
                    <p className='text-sm'>{product?.product_name}</p>
                    <div className="flex items-center gap-4">
                        <p className="font-semibold text-sm">{product?.product_code || product?.product_code2}</p>
                        {product?.is_pkg && <p className="bg-primary/60 text-white text-xs font-semibold px-3 py-1 rounded-md">Package WO</p>}
                    </div>
                    <div className="font-semibold flex gap-3 mt-2">
                        {formatCurrency(product?.product_price)}
                        <CartEditPriceProduct
                            onSubmit={onChangePriceInput}
                            product={product}
                            title={
                                <p className='font-semibold'>
                                    Ubah Harga Produk <br />
                                    <span className='text-red-400 text-[12px] font-light'>Harga terbaru harus lebih besar dari harga sebelumnya</span>
                                </p>} >
                            {({ openModal }) => (
                                <button onClick={openModal} className='text-primary cursor-pointer' title='Ubah'>
                                    <EditOutlined />
                                </button>
                            )}
                        </CartEditPriceProduct>
                    </div>
                </div>
            </div>
            <div className="flex gap-1 flex-col">
                <p className='font-medium text-sm'>Stock: {product?.stock}</p>
                <div className="flex gap-5">
                    <Space.Compact style={{ width: '100%' }}>
                        <Button title='Kurang' onClick={decreaseQty} size="large" className='!bg-primary/80' icon={<MinusOutlined />} type="primary" />
                        <Input
                            value={qty}
                            onChange={onChangeQtyInput}
                            onKeyDown={(e) => {
                                if (!/^\d$/.test(e.key) && e.key !== "Backspace") {
                                    e.preventDefault();
                                }
                            }}
                            size='large'
                            className='!text-center font-bold bg-primary/30 !w-[80px]' />
                        <Button title="Tambah" onClick={increaseQty} size="large" className='!bg-primary/80' icon={<PlusOutlined />} type="primary" />
                    </Space.Compact>
                    <button onClick={onDeleteClick} className='text-red-500 text-2xl cursor-pointer' title='Hapus'>
                        <DeleteOutlined />
                    </button>
                </div>
            </div>
        </div>
    )
}