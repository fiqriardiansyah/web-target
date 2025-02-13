import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navbar";

export default function Layout() {
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/' && <Navbar />}
            <div className="h-[20px]"></div>
            <Outlet />
        </>
    )
}