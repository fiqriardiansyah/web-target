import { Button, Input } from "antd";
import { useSalesContext } from "../../hooks";
import { ProductPackageSelectionSales } from "./product-package-selection-sales";
import { SearchCustomerSales } from "./search-customer-sales";
import SearchSales from "./search-sales";
import { PacketAddition } from "./summary-sales";

export default function FilterSales() {
    const { setState, state: { services, customer } } = useSalesContext();

    const onServiceAdd = (service: ServiceSummary) => {
        setState((prev) => ({ ...prev, services: [...prev.services, { id: new Date().getTime(), ...service }] }));
    }

    const onChooseOrder = (order: PendingOrderList, customer: SearchCustomer) => {
        setState((prev) => ({
            ...prev,
            customer,
            voucherCustom: [],
            vouchers: [],
            services: [],
            packages: [],
            products: order.list.map((el) => ({
                product_id: el.product_id,
                product_price: Number(el.product_price),
                stock: el.stock,
                product_code: el.product_code1,
                product_name: el.product_name,
                product_images: el.product_images,
                is_pkg: el.is_pkg,
                qty: el.product_qty,
                brand_name: "",
                model_detail: "",
                product_category: "",
                product_code2: "",
                product_subcategory: "",
                store: 0
            }))
        }));
    }

    const onCreateNewOrder = (customer: SearchCustomer) => {
        setState((prev) => ({
            ...prev,
            customer,
            voucherCustom: [],
            vouchers: [],
            services: [],
            packages: [],
            products: [],
        }))
    }

    const onClearCustomer = () => {
        setState((prev) => ({ ...prev, customer: undefined, packages: [], products: [], voucherCustom: [], vouchers: [] }));
    }

    return (
        <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2">
                <p className="mb-1 text-sm">Nama Customer</p>
                <SearchCustomerSales onCreateNewOrder={onCreateNewOrder} onChooseOrder={onChooseOrder} title={<p className="font-semibold">Search Customer</p>}>
                    {(ctrl) => (
                        <Input.Search
                            allowClear
                            onClear={onClearCustomer}
                            value={customer ? customer?.name + " - " + customer?.phone_number : ''}
                            onSearch={ctrl.openModal}
                            onClick={ctrl.openModal}
                            placeholder="Pilih Customer"
                            size="large" />
                    )}
                </SearchCustomerSales>
            </div>
            <div className="col-span-2">
                <p className="mb-1 text-sm">Nama Sales</p>
                <SearchSales />
            </div>
            <div className="">
                <p className="mb-1 text-sm pointer-events-none opacity-0">.</p>
                <PacketAddition services={services} onSubmit={onServiceAdd}>
                    {({ openModal }) => (
                        <Button onClick={openModal} type="primary" size="large" className="w-full">
                            Tambah Paket
                        </Button>
                    )}
                </PacketAddition>
            </div>
            <div className="col-span-4">
                <p className="mb-1 text-sm">Pilih Produk</p>
                <ProductPackageSelectionSales.AsModal title={<p className="font-semibold">Cari Produk Atau Paket</p>}>
                    {(ctrl) => (
                        <Input.Search onSearch={ctrl.openModal} onClick={ctrl.openModal} className="w-full" size="large" />
                    )}
                </ProductPackageSelectionSales.AsModal>
            </div>
            <div className="">
                <p className="mb-1 text-sm pointer-events-none opacity-0">.</p>
                <ProductPackageSelectionSales.AsModal title={<p className="font-semibold">Cari Produk Atau Paket</p>}>
                    {(ctrl) => (
                        <Button onClick={ctrl.openModal} type="primary" size="large" className="w-full">
                            Cari Produk
                        </Button>
                    )}
                </ProductPackageSelectionSales.AsModal>
            </div>
        </div>
    )
}