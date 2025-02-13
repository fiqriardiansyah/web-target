import React from "react";
import { ProductPackageContext } from "../context";
import { ProductPackageContextType } from "../context/product-package";

export function useProductPackageContext() {
    const context = React.useContext(ProductPackageContext) as ProductPackageContextType;
    if (!context) {
        throw new Error('useProductPackageContext should be inside of ProductPackageProvider');
    }

    return context;
}