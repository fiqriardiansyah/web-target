import React from "react";
import { ProductPackageContext } from ".";
import eventEmitter from "../config/event";

export type State = { store?: boolean; query?: string; type?: "unit" | "package"; products: Product[]; packages: ProductPackage[] }

export type ProductPackageContextType = {
    state: State;
    setState: React.Dispatch<React.SetStateAction<State>>;
}

export const ProductPackageProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, setState] = React.useState<State>({ type: "unit", query: '', store: false, products: [], packages: [] });

    React.useEffect(() => {
        eventEmitter.on("RESPONSE_PACKAGES", (data) => {
            const packages = data as ProductPackage[];
            setState((prev) => ({ ...prev, packages }))
        });
        eventEmitter.on("RESPONSE_PRODUCTS", (data) => {
            const products = data as Product[];
            setState((prev) => ({ ...prev, products }))
        });
    }, [])

    return (
        <ProductPackageContext.Provider value={{ state, setState }}>
            {children}
        </ProductPackageContext.Provider>
    )
}