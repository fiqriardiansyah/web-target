import React from "react";
import { GlobalContext } from ".";
import Cookies from "js-cookie";
import { ADDRESS_USER, COMPANY_USER, EMAIL_USER, NAME_USER, NPWP_USER, TOKEN_USER } from "../@constant/constant";

export type GlobalContextType = {
    login: AuthResponse,
    setLogin: React.Dispatch<React.SetStateAction<AuthResponse>>;
}

export const GlobalProvider = ({ children }: { children: React.ReactElement }) => {
    const [login, setLogin] = React.useState<Partial<AuthResponse> | null>({
        address: Cookies.get(ADDRESS_USER),
        company_name: Cookies.get(COMPANY_USER),
        email: Cookies.get(EMAIL_USER),
        name: Cookies.get(NAME_USER),
        npwp: Cookies.get(NPWP_USER),
        token: Cookies.get(TOKEN_USER),
    });

    return (
        <GlobalContext.Provider value={{ login, setLogin }}>
            {children}
        </GlobalContext.Provider>
    )
}