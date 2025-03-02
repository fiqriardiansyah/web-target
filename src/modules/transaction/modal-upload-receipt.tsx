import { Button } from "antd";
import React, { ChangeEvent } from "react";
import { ModalCustom, ModalCustomProps } from "../../components";
import { convertFileToBase64 } from "../../utils";

interface ModalUploadReceiptProps extends ModalCustomProps {
    onSubmit?: (base64: string) => void;
}

const ModalUploadReceipt = ({ onSubmit, children, ...props }: ModalUploadReceiptProps) => {
    const closeRef = React.useRef<HTMLButtonElement | null>(null);

    const [base64, setBase64] = React.useState('');

    const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        const image = e.target.files[0];
        const base64Image = await convertFileToBase64(image);
        setBase64(base64Image);
    }

    const onClickDelete = () => {
        setBase64('');
    }

    const onUpload = () => {
        if (onSubmit) {
            onSubmit(base64);
        }
        if (closeRef.current) {
            closeRef.current.click();
        }
        setTimeout(() => {
            setBase64('');
        }, 300)
    }

    return (
        <ModalCustom
            width={500}
            title={<p className="font-semibold text-lg">Upload Bukti Pembayaran</p>}
            {...props}
            handlerInComponent={children}
            footer={null}>
            {(ctrl) => (
                <>
                    <button ref={closeRef} type="button" className="hidden" onClick={ctrl.closeModal}>
                        close
                    </button>
                    <div className="flex flex-col gap-4 mt-10">
                        {!base64 && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onChangeImage}
                                className="w-full bg-primary/30 p-10 rounded-lg text-center flex items-center justify-center text-xl cursor-pointer hover:shadow shadow-xl" />
                        )}
                        {base64 && <img src={base64} alt="" className="w-full max-h-[500px] object-cover" />}
                        <div className="w-full flex gap-5 mt-10">
                            {base64 && (
                                <Button onClick={onClickDelete} className="flex-1" size="large" type="text" danger>
                                    HAPUS
                                </Button>
                            )}
                            <Button onClick={onUpload} className="flex-1" size="large" type="primary">
                                UPLOAD
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </ModalCustom>
    )
}

export default ModalUploadReceipt;