import axios from "axios";
import Cookies from "js-cookie";
import { ADDRESS_USER, COMPANY_USER, EMAIL_USER, NAME_USER, NPWP_USER, TOKEN_USER } from "../@constant/constant";
import { authService } from "../services";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;

axiosClient.defaults.timeout = 1000000;

axiosClient.defaults.withCredentials = true;

axiosClient.defaults.validateStatus = () => true;

axiosClient.interceptors.request.use(
    (req) => {
        req.headers.set("Access-Control-Allow-Origin", "*");
        req.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        req.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
        req.headers.set("Authorization", Cookies.get("token")!);
        return req;
    },
);

axiosClient.interceptors.response.use(
    (res) => {
        const { status, data, config } = res;
        if ((status === 401 || data?.status === 401) && config.url !== authService.checkAuth) {
            Cookies.remove(TOKEN_USER);
            Cookies.remove(NAME_USER);
            Cookies.remove(ADDRESS_USER);
            Cookies.remove(COMPANY_USER);
            Cookies.remove(NPWP_USER);
            Cookies.remove(EMAIL_USER);
            window.location.reload();
        }
        return res;
    },
    (error) => {
        if (error.response?.status === 401 && error.config?.url !== authService.checkAuth) {
            Cookies.remove(TOKEN_USER);
            Cookies.remove(NAME_USER);
            Cookies.remove(ADDRESS_USER);
            Cookies.remove(COMPANY_USER);
            Cookies.remove(NPWP_USER);
            Cookies.remove(EMAIL_USER);
            window.location.reload();
        }
    }
);

export default axiosClient;
