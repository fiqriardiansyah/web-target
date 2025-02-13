import React from "react";
import { SalesContext } from ".";
import eventEmitter from "../config/event";

export type State = { products: Product[]; packages: ProductPackage[] }

export type SalesContextType = {
    state: State;
    setState: React.Dispatch<React.SetStateAction<State>>;
}

export const SalesProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, setState] = React.useState<State>({ products: [], packages: [] });

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

    return (
        <SalesContext.Provider value={{ state, setState }}>
            {children}
        </SalesContext.Provider>
    )
}