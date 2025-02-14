import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Space } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { accountValidationSchema, AccountValidationSchema } from "../../schema";
import { ControlledInput } from "../form";
import ModalCustom, { ModalCustomProps } from "./modal";

const AccountValidationModal = ({ children, ...props }: ModalCustomProps) => {
    const closeRef = React.useRef<HTMLButtonElement | null>(null);

    const { control, handleSubmit } = useForm<AccountValidationSchema>({
        mode: 'onChange',
        resolver: zodResolver(accountValidationSchema),
    });

    const onSubmit = (data: AccountValidationSchema) => {
        console.log(data);
    };

    return (
        <ModalCustom width={400} title={<p className="font-semibold text-lg">Validasi Akun</p>} {...props} handlerInComponent={children} footer={null}>
            {(ctrl) => (
                <>
                    <button ref={closeRef} type="button" className="hidden" onClick={ctrl.closeModal}>
                        close
                    </button>
                    <Form className="" layout="vertical" onFinish={handleSubmit(onSubmit)}>
                        <Space direction="vertical" className="w-full">
                            <ControlledInput label="Email" name="email" inputProps={{ prefix: <MailOutlined />, placeholder: 'Email', size: 'large' }} control={control} />
                            <ControlledInput label="Password" name="password" inputProps={{ prefix: <LockOutlined />, placeholder: 'Password', type: "password", size: 'large' }} control={control} />
                            <Button size="large" type="primary" htmlType="submit">
                                Validasi
                            </Button>
                        </Space>
                    </Form>
                </>
            )}
        </ModalCustom>
    )
}

export default AccountValidationModal;