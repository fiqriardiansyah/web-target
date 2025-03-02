import React from "react";
import { ProductPackageContext } from "../context";
import { ProductPackageContextType } from "../context/product-package";

export function useProductPackageContext() {
    const context = React.useContext(ProductPackageContext) as ProductPackageContextType;
    if (!context || Object.keys(context).length === 0) {
        throw new Error('useProductPackageContext should be inside of ProductPackageProvider');
    }

    return context;
}