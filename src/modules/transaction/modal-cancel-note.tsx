import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { ControlledInputTextArea, ModalCustom, ModalCustomProps } from "../../components";
import { cancelNoteSchema, CancelNoteSchema } from "../../schema";

interface ModalCancelNoteProps extends ModalCustomProps {
    onSubmit?: (dt: CancelNoteSchema) => void;
}

const ModalCancelNote = ({ onSubmit, children, ...props }: ModalCancelNoteProps) => {
    const closeRef = React.useRef<HTMLButtonElement | null>(null);

    const { control, handleSubmit } = useForm<CancelNoteSchema>({
        mode: 'onChange',
        resolver: zodResolver(cancelNoteSchema),
    });

    const onSubmitForm = (data: CancelNoteSchema) => {
        if (onSubmit) onSubmit(data);
        closeRef.current?.click();
    };

    return (
        <ModalCustom width={500} title={<p className="font-semibold text-lg">Konfirmasi Pembatalan</p>} {...props} handlerInComponent={children} footer={null}>
            {(ctrl) => (
                <>
                    <button ref={closeRef} type="button" className="hidden" onClick={ctrl.closeModal}>
                        close
                    </button>
                    <Form layout="vertical" onFinish={handleSubmit(onSubmitForm)}>
                        <ControlledInputTextArea label="Alasan Pembatalan" control={control} name="note" inputProps={{ placeholder: "Masukkan alasan pembatalan", rows: 4 }} />
                        <Button className="w-full mt-10" size="large" type="primary" htmlType="submit">
                            KIRIM
                        </Button>
                    </Form>
                </>
            )}
        </ModalCustom>
    )
}

export default ModalCancelNote;