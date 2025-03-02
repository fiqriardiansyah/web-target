import React from "react";
import { MetaReceiptContext } from "../context";
import { MetaReceiptContextType } from "../context/meta-receipt";
import { HeaderFooterSchema } from "../schema/setting/header-footer.schema";
import Cookies from "js-cookie";

export function useMetaReceiptContext() {

    const context = React.useContext(MetaReceiptContext) as MetaReceiptContextType;
    if (!context || Object.keys(context).length === 0) {
        throw new Error('useMetaReceiptContext should be inside of MetaReceiptProvider');
    }

    const saveHeaderFooterReceipt = (data: HeaderFooterSchema) => {
        Cookies.set("headerFooter", JSON.stringify(data));
        context.setState((prev) => ({
            ...prev,
            headerFooter: data,
        }))
    }

    return { saveHeaderFooterReceipt, ...context };
}