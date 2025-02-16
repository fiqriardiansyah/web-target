import { useMutation, UseMutationResult } from "@tanstack/react-query";
import React from "react";
import { SalesContext } from ".";
import eventEmitter from "../config/event";
import { salesService } from "../services";

export type State = {
    sales?: SalesName;
    customer?: SearchCustomer;
    products: Product[];
    is_cc: number;
    is_service: number;
    packages: ProductPackage[];
    vouchers: Voucher[];
    services: ({ id: number } & ServiceSummary)[];
    voucherCustom: VoucherCustomSummary[];
}

export type SalesContextType = {
    state: State;
    setState: React.Dispatch<React.SetStateAction<State>>;
    summaryPriceMutation: UseMutationResult<SummaryResponse, Error, SummaryPrice, unknown>;
    summaryPrice?: SummaryPrice;
    resetAll: () => void;
}

const defaultState = { products: [], packages: [], vouchers: [], services: [], voucherCustom: [], is_cc: 0, is_service: 0 }

export const SalesProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, setState] = React.useState<State>(defaultState);

    const summaryPriceMutation = useMutation({
        mutationFn: async (data: SummaryPrice) => (await salesService.SummaryPrice(data)).data?.data,
    });

    const productFlatten = (() => {
        const packagesProduct = state.packages.map((pck) => pck.list_child).flat();
        return [...packagesProduct, ...state.products];
    })();

    const summaryPrice: SummaryPrice = {
        is_cc: state.is_cc, //
        is_service: state.is_service, //
        product: productFlatten.map((p) => ({ price: p.product_price, product_id: p.product_id, qty: p.qty }) as ProductSummary), //
        service: state?.services.map((s) => {
            const { id: _id, price, service_name } = s;
            return { price: Number(price), service_name }
        }),
        voucher: state.voucherCustom.map((vc) => {
            const { id: _id, ...rest } = vc;
            return rest;
        }),
        voucher_id: state.vouchers.map((v) => v.id),
        voucher_matrix_id: [],
        customer_id: state?.customer?.id,
    };

    React.useEffect(() => {
        if (!summaryPrice.customer_id) return;
        summaryPriceMutation.mutateAsync(summaryPrice);
    }, [state]);

    React.useEffect(() => {

        eventEmitter.on("PACKAGES_FROM_PRODUCT_PACKAGE", (data) => {
            const packages = data as ProductPackage[];
            setState((prev) => ({ ...prev, packages }));
        });

        eventEmitter.on("PRODUCTS_FROM_PRODUCT_PACKAGE", (data) => {
            const products = data as Product[];
            setState((prev) => ({ ...prev, products }))
        });

        eventEmitter.on("GET_PACKAGES", () => {
            eventEmitter.emit("RESPONSE_PACKAGES", state.packages);
        });

        eventEmitter.on("GET_PRODUCTS", () => {
            eventEmitter.emit("RESPONSE_PRODUCTS", state.products);
        });

    }, [state.packages, state.products]);

    const resetAll = () => {
        setState(defaultState)
    }

    return (
        <SalesContext.Provider value={{ state, setState, summaryPriceMutation, summaryPrice, resetAll }}>
            {children}
        </SalesContext.Provider>
    )
}