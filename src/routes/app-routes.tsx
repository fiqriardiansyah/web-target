import { Route, Routes } from "react-router";
import AuthenticationRoute from "./authentication-route";
// pages
import { Layout } from "../components";
import { AuthPage, HomePage, SalesPage } from "../pages";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<Layout />}>
                <Route element={<AuthenticationRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sales" element={<SalesPage />} />
                </Route>
            </Route>
        </Routes>

    )
}