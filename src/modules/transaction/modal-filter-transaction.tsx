import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { ControlledDate, ModalCustom, ModalCustomProps } from "../../components";
import { filterTransactionSchema, FilterTransactionSchema } from "../../schema";

interface ModalFilterTransactionProps extends ModalCustomProps {
    onSubmit?: (dt: FilterTransactionSchema) => void;
}

const ModalFilterTransaction = ({ onSubmit, children, ...props }: ModalFilterTransactionProps) => {
    const closeRef = React.useRef<HTMLButtonElement | null>(null);

    const { control, handleSubmit } = useForm<FilterTransactionSchema>({
        mode: 'onChange',
        resolver: zodResolver(filterTransactionSchema),
    });

    const onSubmitForm = (data: FilterTransactionSchema) => {
        if (onSubmit) onSubmit(data);
        closeRef.current?.click();
    };

    return (
        <ModalCustom width={500} title={<p className="font-semibold text-lg">Filter</p>} {...props} handlerInComponent={children} footer={null}>
            {(ctrl) => (
                <>
                    <button ref={closeRef} type="button" className="hidden" onClick={ctrl.closeModal}>
                        close
                    </button>
                    <Form layout="vertical" onFinish={handleSubmit(onSubmitForm)}>
                        <div className="flex items-start gap-3 w-full my-4">
                            <ControlledDate label="Start Date" name="startDate" inputProps={{ placeholder: 'Pilih tanggal mulai', size: 'large' }} control={control} />
                            <ControlledDate label="End Date" name="endDate" inputProps={{ placeholder: 'Pilih tanggal akhir', size: 'large' }} control={control} />
                        </div>
                        <Button className="w-full mt-10" size="large" type="primary" htmlType="submit">
                            Tampilkan
                        </Button>
                    </Form>
                </>
            )}
        </ModalCustom>
    )
}

export default ModalFilterTransaction;