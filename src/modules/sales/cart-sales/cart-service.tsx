import { DeleteOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { ServiceSchema } from '../../../schema';
import { formatCurrency } from '../../../utils';

interface CartServiceProps {
    service?: ServiceSchema;
    onDelete?: (s?: ServiceSchema) => void;
}

export default function CartService({ service, onDelete }: CartServiceProps) {

    const onDeleteClick = () => {
        if (onDelete) onDelete(service)
    }

    return (
        <div className="w-full flex justify-between gap-8">
            <div className="flex flex-col">
                <p className='text-sm'>{service?.service_name}</p>
                <div className="font-semibold flex gap-3 mt-2">
                    {formatCurrency(Number(service?.price))}
                </div>
            </div>
            <div className="flex gap-5">
                <Input value={1} className='!text-center font-bold bg-primary/30 !w-[50px]' disabled />
                <button onClick={onDeleteClick} className='text-red-500 text-2xl cursor-pointer' title='Hapus'>
                    <DeleteOutlined />
                </button>
            </div>
        </div>
    )
}