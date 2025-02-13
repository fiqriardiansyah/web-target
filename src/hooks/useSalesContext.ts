import React from "react";
import { SalesContext } from "../context";
import { SalesContextType } from "../context/sales";

export function useSalesContext() {
    const context = React.useContext(SalesContext) as SalesContextType;
    if (!context) {
        throw new Error('useSalesContext should be inside of SalesProvider');
    }

    return context;
}