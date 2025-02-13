import { DeleteOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React from 'react';
import TargetBgBlue from '../../../asset/target-bg-blue.png';
import { formatCurrency } from '../../../utils';

interface CartProductProps {
    product?: Product;
    onDelete?: (p?: Product) => void;
}

export default function CartProduct({ product, onDelete }: CartProductProps) {
    const [qty, setQty] = React.useState(1);

    const image = typeof product?.product_images === "string"
        ? product?.product_images
        : product?.product_images?.length
            ? product?.product_images[0]
            : TargetBgBlue

    const onChangeQty = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace(/\D/g, "");
        const qty = parseInt(newValue === '' ? '0' : newValue);
        if (qty >= (product?.stock || 1)) {
            setQty((product?.stock || 1))
            return;
        };
        setQty(qty);
    };

    const increaseQty = () => setQty((prev) => prev >= (product?.stock || 1) ? prev : prev + 1);
    const decreaseQty = () => setQty((prev) => !prev ? 0 : prev - 1);

    const onDeleteClick = () => {
        if (onDelete) onDelete(product)
    }

    return (
        <div className="w-full flex justify-between gap-8">
            <div className="flex gap-5">
                <img src={image} alt={product?.product_name} className="w-[80px] h-[70px] object-cover rounded bg-gray-200" />
                <div className="flex flex-col">
                    <p className='text-sm'>{product?.product_name}</p>
                    <p className="font-semibold text-sm">{product?.product_code || product?.product_code2}</p>
                    <div className="font-semibold flex gap-3 mt-2">
                        {formatCurrency(product?.product_price)}
                        <button className='text-primary cursor-pointer' title='Ubah'>
                            <EditOutlined />
                        </button>
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
                            onChange={onChangeQty}
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