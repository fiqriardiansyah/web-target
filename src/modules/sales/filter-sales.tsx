import { Button, Input } from "antd";
import { ProductPackageSelectionSales } from "./product-package-selection-sales";
import { SearchCustomerSales } from "./search-customer-sales";
import SearchSales from "./search-sales";
import { PacketAddition } from "./summary-sales";
import { useSalesContext } from "../../hooks";
import { ServiceSchema } from "../../schema";

export default function FilterSales() {
    const { setState } = useSalesContext();

    const onServiceAdd = (service: ServiceSchema) => {
        setState((prev) => ({ ...prev, services: [...prev.services, { id: new Date().getTime(), ...service }] }));
    }

    return (
        <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2">
                <p className="mb-1 text-sm">Nama Customer</p>
                <SearchCustomerSales title={<p className="font-semibold">Search Customer</p>}>
                    {(ctrl) => (
                        <Input.Search onSearch={ctrl.openModal} onClick={ctrl.openModal} placeholder="Pilih Customer" size="large" />
                    )}
                </SearchCustomerSales>
            </div>
            <div className="col-span-2">
                <p className="mb-1 text-sm">Nama Sales</p>
                <SearchSales />
            </div>
            <div className="">
                <p className="mb-1 text-sm pointer-events-none opacity-0">.</p>
                <PacketAddition onSubmit={onServiceAdd}>
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