import { Button, Modal } from 'antd';
import Tagpng from '../../../asset/tag.png';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { formatCurrency } from '../../../utils';
import { useMutation } from '@tanstack/react-query';
import { salesService } from '../../../services';

const { confirm } = Modal;

export default function OrderCard({ order, refreshPendingOrder }: { order: PendingOrderList, refreshPendingOrder?: () => void }) {

    const deleteMutation = useMutation({
        mutationFn: async (orderId: number | string) => (await salesService.DeletePendingOrder({ order_id: orderId })).data?.data,
        mutationKey: [salesService.deletePendingOrder, order.order_id],
        onSuccess() {
            if (refreshPendingOrder)
                refreshPendingOrder();
        },
    })

    const showDeleteConfirm = () => {
        confirm({
            title: 'Hapus order?',
            icon: <ExclamationCircleFilled />,
            okText: 'Ya',
            okType: 'danger',
            cancelText: 'Batal',
            onOk() {
                deleteMutation.mutate(order.order_id);
            },
        });
    };

    return (
        <div className="flex gap-5">
            <div className="flex flex-col items-center gap-2">
                <img src={Tagpng} className='h-[50px]' alt="" />
                <p className='text-lg font-semibold'>{order?.dp_amount ? "DP" : "Draft"}</p>
            </div>
            <div className="flex-1 flex-col gap-1">
                {order?.order_no && <p className="font-bold">{order?.order_no}</p>}
                {(order?.ref_no || order?.inv_no) && <p className='bg-primary/10 px-2 py-1 rounded text-primary w-fit'>{order?.ref_no || order?.inv_no}</p>}
                <p className=''>{order.list?.length} Product</p>
                {order?.dp_amount && <p className="mt-2">DP {formatCurrency(order?.dp_amount)}</p>}
                {order?.sisa_pembayaran && <p className="font-bold">Sisa {formatCurrency(order?.sisa_pembayaran)}</p>}
            </div>
            <div className="flex flex-col gap-2 justify-center">
                {!order?.dp_amount ? (
                    <>
                        <Button type='primary' size='large' className='w-[150px]'>
                            Pilih Order
                        </Button>
                        <Button loading={deleteMutation.isPending} onClick={showDeleteConfirm} type='primary' danger size='large' className='w-[150px]'>
                            Hapus
                        </Button>
                    </>
                ) : (
                    <Button type='primary' size='large' className='w-[150px] !bg-primary/60 !shadow-lg'>
                        Bayar Order
                    </Button>
                )}
            </div>
        </div>
    )
}