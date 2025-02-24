import React from 'react';
import { NavbarContext } from '.';

export type NavbarContextType = {
    extraComponent: React.ReactNode;
    setExtraComponent: (component: unknown) => void;
}

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [extraComponent, setExtraComponent] = React.useState<React.ReactNode>(null);
    return (
        <NavbarContext.Provider value={{ extraComponent, setExtraComponent }}>
            {children}
        </NavbarContext.Provider>
    );
};