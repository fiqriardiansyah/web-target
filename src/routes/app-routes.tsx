import { Route, Routes } from "react-router";
import AuthenticationRoute from "./authentication-route";
// pages
import { Layout } from "../components";
import {
    AuthPage, HomePage, MetaReceiptPage, ReportPage, SalesPage, SettingPage, TransactionDetailPage, TransactionPage
} from "../pages";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<Layout />}>
                <Route element={<AuthenticationRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sales" element={<SalesPage />} />
                    <Route path="/setting">
                        <Route index path="" element={<SettingPage />} />
                        <Route path="meta-receipt" element={<MetaReceiptPage />} />
                    </Route>
                    <Route path="/transaction">
                        <Route path="" index element={<TransactionPage />} />
                        <Route path=":id" element={<TransactionDetailPage />} />
                    </Route>
                    <Route path="/report" element={<ReportPage />} />
                </Route>
            </Route>
        </Routes>

    )
}