import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider, MetaReceiptProvider, NavbarProvider } from "./context";

const queryClient = new QueryClient();

const App = ({ children }: { children: React.ReactElement }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalProvider>
                <NavbarProvider>
                    <MetaReceiptProvider>
                        <BrowserRouter>
                            {children}
                        </BrowserRouter>
                    </MetaReceiptProvider>
                </NavbarProvider>
            </GlobalProvider>
        </QueryClientProvider>
    )
}

export default App;