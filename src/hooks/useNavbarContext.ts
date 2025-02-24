import React from "react";
import { NavbarContext, NavbarContextType } from "../context";

export const useNavbarContext = () => {
    const context = React.useContext(NavbarContext) as NavbarContextType;
    if (!context) throw new Error("useNavbar must be used within NavbarProvider");
    return context;
};