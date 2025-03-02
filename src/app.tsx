import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { GlobalProvider, MetaReceiptProvider, NavbarProvider } from "./context";
import { ErrorFallback } from "./components";
import { ConstantProvider } from "./context/constant";

const queryClient = new QueryClient();

const App = ({ children }: { children: React.ReactElement }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <GlobalProvider>
                    <ConstantProvider>
                        <NavbarProvider>
                            <MetaReceiptProvider>
                                <BrowserRouter>
                                    {children}
                                </BrowserRouter>
                            </MetaReceiptProvider>
                        </NavbarProvider>
                    </ConstantProvider>
                </GlobalProvider>
            </ErrorBoundary>
        </QueryClientProvider>
    )
}

export default App;