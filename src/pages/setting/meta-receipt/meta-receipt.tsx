import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import { useForm } from "react-hook-form";
import { ControlledInput } from "../../../components";
import { useMetaReceiptContext } from "../../../hooks";
import { headerFooterSchema, HeaderFooterSchema } from "../../../schema";

export default function MetaReceipt() {
    const metaReceiptContext = useMetaReceiptContext();
    const { saveHeaderFooterReceipt } = useMetaReceiptContext();

    const { control, handleSubmit } = useForm<HeaderFooterSchema>({
        mode: 'onChange',
        defaultValues: {
            companyAddress: metaReceiptContext.state.headerFooter?.companyAddress,
            companyName: metaReceiptContext.state.headerFooter?.companyName,
            companyNPWP: metaReceiptContext.state.headerFooter?.companyNPWP,
            footerText: metaReceiptContext.state.headerFooter?.footerText,
        },
        resolver: zodResolver(headerFooterSchema),
    });

    const onSubmit = (data: HeaderFooterSchema) => {
        message.success("Berhasil disimpan");
        saveHeaderFooterReceipt(data);
    };

    return (
        <div className="container-custom">
            <Form layout="vertical" className="w-full grid grid-cols-2 gap-x-10" onFinish={handleSubmit(onSubmit)}>
                <h1 className="text-2xl font-bold mb-10">Header Struk</h1>
                <h1 className="text-2xl font-bold mb-10">Footer Struk</h1>
                <ControlledInput
                    label="Nama Perusahaan"
                    name="companyName"
                    inputProps={{ placeholder: 'Masukkan Nama Perusahaan', size: 'large' }}
                    control={control} />
                <ControlledInput
                    label="Footer Struk"
                    name="footerText"
                    inputProps={{ placeholder: 'Masukkan Footer Struk', size: 'large' }}
                    control={control} />
                <ControlledInput
                    label="Alamat Perusahaan"
                    name="companyAddress"
                    inputProps={{ placeholder: 'Masukkan Alamat Perusahaan', size: 'large' }}
                    control={control} />
                <p></p>
                <ControlledInput
                    label="NPWP Perusahaan"
                    name="companyNPWP"
                    inputProps={{ placeholder: 'Masukkan NPWP Perusahaan', size: 'large' }}
                    control={control} />
                <p></p>
                <Button type="primary" className="w-full mt-7" size="large" htmlType="submit">
                    SIMPAN
                </Button>
            </Form>
        </div>
    )
}