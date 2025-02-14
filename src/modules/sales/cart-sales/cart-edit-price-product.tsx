import React from "react";
import { ControlledInput, MainCardProduct, ModalCustom, ModalCustomProps } from "../../../components";
import { Button, Form, Space } from "antd";
import { useForm } from "react-hook-form";
import { editPriceSchema, EditPriceSchema } from "../../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseNumberFromDots } from "../../../utils";

interface CartEditPriceProductProps extends ModalCustomProps {
    product?: Product;
    onSubmit?: (price: number) => void;
}

const CartEditPriceProduct = ({ product, onSubmit, children, ...props }: CartEditPriceProductProps) => {
    const closeRef = React.useRef<HTMLButtonElement | null>(null);

    const { control, handleSubmit, reset, setError } = useForm<EditPriceSchema>({
        mode: 'onChange',
        resolver: zodResolver(editPriceSchema),
    });

    const onSubmitForm = (data: EditPriceSchema) => {
        const price = parseNumberFromDots(data.price);
        if (price <= (product?.product_price || 0)) {
            setError("price", { message: 'Harga terbaru harus lebih besar dari harga sebelumnya' })
            return;
        }
        if (onSubmit) onSubmit(price);
        closeRef.current?.click();
        reset();
    }

    return (
        <ModalCustom width={500} {...props} handlerInComponent={children} footer={null}>
            {(ctrl) => (
                <>
                    <button ref={closeRef} type="button" className="hidden" onClick={ctrl.closeModal}>
                        close
                    </button>
                    <div className="flex flex-col gap-4 mt-8">
                        <MainCardProduct.Simple product={product} />
                        <Form className="!pt-3" onFinish={handleSubmit(onSubmitForm)}>
                            <Space direction="vertical" className="w-full">
                                <p className="font-semibold">Harga Terbaru (Rp)</p>
                                <ControlledInput name="price" inputProps={{ size: 'large', className: '!w-full', type: 'number' }} control={control} />
                                <Button size="large" type="primary" htmlType="submit" className="w-full">
                                    Ubah harga
                                </Button>
                            </Space>
                        </Form>
                    </div>
                </>
            )}
        </ModalCustom>
    )
}

export default CartEditPriceProduct;