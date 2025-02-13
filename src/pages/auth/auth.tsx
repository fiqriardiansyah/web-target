import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Space } from "antd";
import { useForm } from "react-hook-form";
import { ControlledInput } from "../../components";
import { authSchema, AuthSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { authService } from "../../services";
import { useGlobalContext } from "../../hooks";

import Targetpng from '../../asset/target.png';

const AuthPage = () => {
    const navigate = useNavigate();
    const globalContext = useGlobalContext();

    const { control, handleSubmit } = useForm<AuthSchema>({
        mode: 'onChange',
        resolver: zodResolver(authSchema),
    });

    const authMutation = useMutation({
        mutationFn: async (data: AuthSchema) => (await authService.SignIn(data)).data?.data,
        onSuccess(data) {
            globalContext.removeUser();
            globalContext.saveUser(data);
            navigate('/', { replace: true });
        },
    })

    const onSubmit = (data: AuthSchema) => {
        authMutation.mutate(data)
    };

    if (globalContext.isLogin) {
        return <Navigate to="/" replace />
    }

    return (
        <div className=" w-full !h-screen overflow-y-hidden flex items-center justify-center flex-col">
            <Form className="w-[300px]" onFinish={handleSubmit(onSubmit)}>
                <img src={Targetpng} alt="" className="w-[200px]" />
                <p className="mb-10">Masukkan Password dan Email untuk login</p>
                <Space direction="vertical" className="w-full">
                    <ControlledInput name="email" inputProps={{ prefix: <MailOutlined />, placeholder: 'Email', size: 'large' }} control={control} />
                    <ControlledInput name="password" inputProps={{ prefix: <LockOutlined />, placeholder: 'Password', type: "password", size: 'large' }} control={control} />
                    <Button size="large" loading={authMutation.isPending} type="primary" htmlType="submit">
                        Masuk
                    </Button>
                </Space>
            </Form>
        </div>
    )
}

export default AuthPage;