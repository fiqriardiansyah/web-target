import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Space } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { ControlledInput, ModalCustom, ModalCustomProps } from "../../../components";
import { serviceSchema, ServiceSchema } from "../../../schema";
import { parseNumberFromDots } from "../../../utils";

interface PackageAdditionProps extends ModalCustomProps {
    onSubmit?: (service: ServiceSchema) => void;
}

export default function PacketAddition({ onSubmit, children, ...props }: PackageAdditionProps) {
    const closeRef = React.useRef<HTMLButtonElement | null>(null);

    const { control, handleSubmit, reset } = useForm<ServiceSchema>({
        mode: 'onChange',
        resolver: zodResolver(serviceSchema),
    });

    const onSubmitForm = (data: ServiceSchema) => {
        const price = parseNumberFromDots(data.price);
        if (onSubmit) onSubmit({ ...data, price: price.toString() });
        closeRef.current?.click();
        reset();
    };

    return (
        <ModalCustom width={400} title={<p className="font-semibold text-lg">Tambah Paket</p>} {...props} handlerInComponent={children} footer={null}>
            {(ctrl) => (
                <>
                    <button ref={closeRef} type="button" className="hidden" onClick={ctrl.closeModal}>
                        close
                    </button>
                    <Form className="!pt-3" onFinish={handleSubmit(onSubmitForm)}>
                        <Space direction="vertical" className="w-full">
                            <p className="font-semibold">Nama Paket</p>
                            <ControlledInput name="service_name" inputProps={{ size: 'large', className: '!w-full' }} control={control} />
                            <p className="font-semibold">Harga Paket</p>
                            <ControlledInput name="price" inputProps={{ size: 'large', className: '!w-full', type: 'number' }} control={control} />
                            <Button size="large" type="primary" htmlType="submit" className="w-full">
                                Simpan
                            </Button>
                        </Space>
                    </Form>
                </>
            )}
        </ModalCustom>
    )
}