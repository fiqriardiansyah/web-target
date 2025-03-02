import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Space } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { ControlledInputNumber, ModalCustom, ModalCustomProps } from "../../components";
import { dpSchema, DPSchema } from "../../schema";
import { formatNumberWithDots, parseNumberFromDots } from "../../utils";

interface CustomVoucherProps extends ModalCustomProps {
    onSubmit?: (dt: DPSchema) => void;
    maxDp?: number;
}

const CustomVoucher = ({ maxDp = 0, onSubmit, children, ...props }: CustomVoucherProps) => {
    const closeRef = React.useRef<HTMLButtonElement | null>(null);

    const { control, handleSubmit } = useForm<DPSchema>({
        mode: 'onChange',
        resolver: zodResolver(dpSchema.refine((data) => parseNumberFromDots(data.dp) < maxDp, {
            message: `Down payment (DP) tidak boleh sama atau lebih dari ${formatNumberWithDots(maxDp)}`,
            path: ["dp"]
        })),
    });

    const onSubmitForm = (data: DPSchema) => {
        if (onSubmit) {
            onSubmit(data);
        }
        closeRef.current?.click();
    };

    return (
        <ModalCustom width={500} title={<p className="font-semibold text-lg">Down Payment</p>} {...props} handlerInComponent={children} footer={null}>
            {(ctrl) => (
                <>
                    <button ref={closeRef} type="button" className="hidden" onClick={ctrl.closeModal}>
                        close
                    </button>
                    <div className="flex flex-col gap-4">
                        <Form layout="vertical" className="!pt-3" onFinish={handleSubmit(onSubmitForm)}>
                            <Space direction="vertical" className="w-full">
                                <ControlledInputNumber
                                    label="Nominal Down Payment"
                                    name="dp"
                                    inputProps={{ size: 'large', placeholder: 'Masukkan Nominal Down Payment', className: '!w-full' }}
                                    control={control} />
                                <Button size="large" type="primary" htmlType="submit" className="w-full mt-10">
                                    Simpan
                                </Button>
                            </Space>
                        </Form>
                    </div>
                </>
            )}
        </ModalCustom>
    )
}

export default CustomVoucher;