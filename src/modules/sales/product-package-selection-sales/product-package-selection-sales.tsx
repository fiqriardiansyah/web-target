import React from "react";
import { ModalCustom, ModalCustomProps } from "../../../components";
import eventEmitter from "../../../config/event";
import { ProductPackageProvider } from "../../../context";
import Filter from "./filter";
import FilterType from "./filter-type";
import Selections from "./selections";
import SummaryList from "./summary-list";

interface ProductPackageSelectionSalesProps extends ModalCustomProps {
    any?: unknown
}

const ProductPackageSelectionSalesBase = ({ closeModal }: { closeModal?: () => void }) => {
    return (
        <div className="w-full flex flex-col gap-5">
            <Filter />
            <div className="flex gap-5 w-full">
                <div className="flex flex-col gap-5 w-full">
                    <FilterType />
                    <Selections />
                </div>
                <SummaryList closeModal={closeModal} />
            </div>
        </div>
    )
}

const AsModal = ({ children, ...props }: ProductPackageSelectionSalesProps) => {
    const closeRef = React.useRef<HTMLButtonElement | null>(null);

    const modalOpenHandler = (open: boolean) => {
        if (open) {
            eventEmitter.emit("GET_PACKAGES");
            eventEmitter.emit("GET_PRODUCTS");
        }
    }

    return (
        <ProductPackageProvider>
            <ModalCustom width={1000} {...props} isModalOpenFn={modalOpenHandler} handlerInComponent={children} footer={null}>
                {(ctrl) => (
                    <>
                        <button ref={closeRef} type="button" className="hidden" onClick={ctrl.closeModal}>
                            close
                        </button>
                        <ProductPackageSelectionSalesBase closeModal={() => closeRef.current?.click()} />
                    </>
                )}
            </ModalCustom>
        </ProductPackageProvider>
    )
}

const AsPage = () => {
    return (
        <ProductPackageProvider>
            <ProductPackageSelectionSalesBase />
        </ProductPackageProvider>
    )
}


const ProductPackageSelectionSales = () => { }

ProductPackageSelectionSales.AsModal = AsModal;
ProductPackageSelectionSales.AsPage = AsPage;

export default ProductPackageSelectionSales;