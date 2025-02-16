import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context";

const queryClient = new QueryClient();

const App = ({ children }: { children: React.ReactElement }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalProvider>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </GlobalProvider>
        </QueryClientProvider>
    )
}

export default App;