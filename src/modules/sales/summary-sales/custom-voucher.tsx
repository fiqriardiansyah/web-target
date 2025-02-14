import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Space } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { ControlledInput, MainCardProduct, ModalCustom, ModalCustomProps } from "../../../components";
import { customVoucherSchema, CustomVoucherSchema, ServiceSchema } from "../../../schema";
import { formatNumberWithDots, parseNumberFromDots } from "../../../utils";

interface CustomVoucherProps extends ModalCustomProps {
    products?: Partial<Product>[];
    services?: ({ id: number } & ServiceSchema)[];
    onSubmit?: (v: VoucherCustomSummary) => void;
}

const CustomVoucher = ({ onSubmit, products = [], services = [], children, ...props }: CustomVoucherProps) => {

    const closeRef = React.useRef<HTMLButtonElement | null>(null);
    const [typeCut, setTypeCut] = React.useState<"percentage" | "price">("percentage");
    const [selectedProduct, setSelectedProduct] = React.useState<number[]>([]);
    const [selectedService, setSelectedService] = React.useState<number[]>([]);

    const { control, handleSubmit, watch, setValue, reset } = useForm<CustomVoucherSchema>({
        mode: 'onChange',
        resolver: zodResolver(customVoucherSchema),
    });

    const percentage = watch("percentage");
    const price = watch("price");
    const minPrice = Math.min(...products.map((p) => Number(p.product_price)), ...services.map((s) => Number(s.price)));

    React.useEffect(() => {
        const percent = parseNumberFromDots(percentage);
        if (percent >= 100) {
            setValue("percentage", "100");
        }
    }, [percentage]);

    React.useEffect(() => {
        const priceNum = parseNumberFromDots(price);
        if (priceNum >= minPrice) {
            setValue("price", formatNumberWithDots(minPrice));
        }

    }, [selectedProduct, price])

    React.useEffect(() => {
        setValue("percentage", "0");
        setValue("price", "0");
    }, [typeCut])

    const onClickProduct = (product?: Partial<Product>) => {
        if (!product) return;
        if (selectedProduct.includes(product.product_id as number)) {
            setSelectedProduct((prev) => prev.filter((id) => id !== product.product_id));
            return;
        }
        setSelectedProduct((prev) => [...prev, product.product_id as number]);
    }

    const onClickService = (service?: Partial<Product>) => {
        if (!service) return;
        if (selectedService.includes(service.product_id as number)) {
            setSelectedService((prev) => prev.filter((id) => id !== service.product_id));
            return;
        }
        setSelectedService((prev) => [...prev, service.product_id as number]);
    }

    const onSubmitForm = (data: CustomVoucherSchema) => {
        console.log(data);
        const customVoucher: VoucherCustomSummary = {
            name: data.name,
            price: parseNumberFromDots(data.price),
            percentage: parseNumberFromDots(data.percentage),
            product: products.map((p) => ({ id: p.product_id, price: p.product_price, qty: p.qty })).filter((p) => selectedProduct.includes(p.id!)) as ProductVoucher[],
            service: services.filter((s) => selectedService.includes(s.id)).map((s) => ({ name: s.service_name, price: Number(s.price) }))
        };
        if (onSubmit) onSubmit(customVoucher);
        closeRef.current?.click();
        reset();
        setSelectedProduct([]);
        setSelectedService([]);
    };

    const onClickTypeCut = (type: "percentage" | "price") => {
        return () => {
            setTypeCut(type);
        }
    }

    return (
        <ModalCustom width={500} title={<p className="font-semibold text-lg">Tambah Custom Voucher</p>} {...props} handlerInComponent={children} footer={null}>
            {(ctrl) => (
                <>
                    <button ref={closeRef} type="button" className="hidden" onClick={ctrl.closeModal}>
                        close
                    </button>
                    <div className="flex flex-col gap-4">
                        <Form className="!pt-3" onFinish={handleSubmit(onSubmitForm)}>
                            <Space direction="vertical" className="w-full">
                                <p className="font-semibold">Nama Voucher</p>
                                <ControlledInput name="name" inputProps={{ size: 'large', placeholder: 'Contoh: Voucher pembulatan', className: '!w-full' }} control={control} />
                                <p className="font-semibold">Potongan Nomimal</p>
                                <div className="grid grid-cols-5 gap-5">
                                    <div className="col-span-3">
                                        {typeCut === "price" ?
                                            <div className="">
                                                <ControlledInput name="price" inputProps={{ size: 'large', placeholder: 'Masukkan nominal potongan', className: '!w-full', type: 'number' }} control={control} />
                                                <p className="text-[12px] italic">Maksimal potongan: {formatNumberWithDots(minPrice)}</p>
                                            </div>
                                            : <ControlledInput name="percentage" inputProps={{ size: 'large', placeholder: 'Masukkan nominal potongan', className: '!w-full', type: 'number' }} control={control} />
                                        }
                                    </div>
                                    <Button className={`!text-xl ${typeCut === "percentage" ? "" : "grayscale-100"}`} onClick={onClickTypeCut("percentage")} size="large" type="primary">
                                        %
                                    </Button>
                                    <Button className={`!text-xl ${typeCut === "price" ? "" : "grayscale-100"}`} onClick={onClickTypeCut("price")} size="large" type="primary">
                                        Rp
                                    </Button>
                                </div>
                                <div className="my-5 grid grid-cols-3 gap-4">
                                    {products?.map((p) => (
                                        <div className="relative">
                                            {selectedProduct.find((id) => id === p.product_id) && (
                                                <div className="bg-black/30 w-full rounded h-full absolute top-0 left-0 z-10 pointer-events-none flex items-center justify-center">
                                                    <div className="py-1 text-sm px-5 rounded bg-black/60 text-white font-semibold">
                                                        Terpilih
                                                    </div>
                                                </div>
                                            )}
                                            <MainCardProduct.AsMiniCard onClick={onClickProduct} key={p.product_id} product={p} />
                                        </div>
                                    ))}
                                    {services?.map((p) => (
                                        <div className="relative">
                                            {selectedService.find((id) => id === p.id) && (
                                                <div className="bg-black/30 w-full rounded h-full absolute top-0 left-0 z-10 pointer-events-none flex items-center justify-center">
                                                    <div className="py-1 text-sm px-5 rounded bg-black/60 text-white font-semibold">
                                                        Terpilih
                                                    </div>
                                                </div>
                                            )}
                                            <MainCardProduct.AsMiniCard onClick={onClickService} key={p.id} product={{ product_id: p.id, product_name: p.service_name, product_price: Number(p.price) }} />
                                        </div>
                                    ))}
                                </div>
                                <Button disabled={!selectedProduct.length} size="large" type="primary" htmlType="submit" className="w-full">
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