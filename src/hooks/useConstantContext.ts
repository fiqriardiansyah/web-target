import React from "react";
import { ConstantContext, ConstantContextType } from "../context";

export function useConstantContext() {

    const context = React.useContext(ConstantContext) as ConstantContextType;
    if (!context || Object.keys(context).length === 0) {
        throw new Error('useConstantContext should be inside of ConstantProvider');
    }

    return context
}