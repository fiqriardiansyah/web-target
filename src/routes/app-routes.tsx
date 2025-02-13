import { BrowserRouter, Route, Routes } from "react-router";
import AuthenticationRoute from "./authentication-route";
// pages
import { AuthPage, HomePage, SalesPage } from "../pages";
import { Layout } from "../components";
import { SalesProvider } from "../context/sales";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route element={<Layout />}>
                    <Route element={<AuthenticationRoute />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/sales" element={
                            <SalesProvider>
                                <SalesPage />
                            </SalesProvider>
                        } />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}