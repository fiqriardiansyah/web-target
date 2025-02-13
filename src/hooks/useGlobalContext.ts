import React from "react";
import Cookies from "js-cookie";
import { GlobalContextType, GlobalContext } from "../context";
import { ADDRESS_USER, COMPANY_USER, EMAIL_USER, NAME_USER, NPWP_USER, TOKEN_USER } from "../@constant/constant";

export function useGlobalContext() {
    const context = React.useContext(GlobalContext) as GlobalContextType;
    if (!context) {
        throw new Error('useGlobalContext should be inside of GlobalProvider');
    }

    const saveUser = (auth: AuthResponse) => {
        Cookies.set(TOKEN_USER, auth?.token);
        Cookies.set(NAME_USER, auth?.name);
        Cookies.set(ADDRESS_USER, auth?.address);
        Cookies.set(COMPANY_USER, auth?.company_name);
        Cookies.set(NPWP_USER, auth?.npwp);
        Cookies.set(EMAIL_USER, auth?.email);
        context.setLogin(auth);
    };

    const removeUser = () => {
        Cookies.remove(TOKEN_USER);
        Cookies.remove(NAME_USER);
        Cookies.remove(ADDRESS_USER);
        Cookies.remove(COMPANY_USER);
        Cookies.remove(NPWP_USER);
        Cookies.remove(EMAIL_USER);
    }

    const isLogin = !!context.login?.token

    return { ...context, saveUser, removeUser, isLogin };
}