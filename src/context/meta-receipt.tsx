import Cookies from "js-cookie";
import React from "react";
import { MetaReceiptContext } from ".";
import { useGlobalContext } from "../hooks";
import { HeaderFooterSchema } from "../schema/setting/header-footer.schema";

type State = {
    headerFooter?: HeaderFooterSchema;
}

export type MetaReceiptContextType = {
    state: State;
    setState: React.Dispatch<React.SetStateAction<State>>;
}

export const MetaReceiptProvider = ({ children }: { children: React.ReactElement }) => {
    const globalContext = useGlobalContext();

    const cookieHeaderFooter = JSON.parse(Cookies.get("headerFooter") || "{}") as HeaderFooterSchema

    const [state, setState] = React.useState<State>({
        headerFooter: {
            companyName: cookieHeaderFooter?.companyName || globalContext.login.company_name,
            companyNPWP: cookieHeaderFooter?.companyNPWP || globalContext.login.npwp,
            companyAddress: cookieHeaderFooter?.companyAddress || globalContext.login.address,
            footerText: cookieHeaderFooter?.footerText || "JSL ACCESSORIES - BANGGA BUATAN INDONESIA",
        },
    });

    return (
        <MetaReceiptContext.Provider value={{ state, setState }}>
            {children}
        </MetaReceiptContext.Provider>
    )
}