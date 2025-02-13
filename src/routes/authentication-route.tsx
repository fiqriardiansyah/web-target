import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext"

export default function AuthenticationRoute() {
    const location = useLocation();
    const globalContext = useGlobalContext();

    if (!globalContext.isLogin) {
        return <Navigate to="/auth" replace />
    }

    if (globalContext.isLogin && location.pathname === '/auth') {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}