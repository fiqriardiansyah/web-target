interface GetMethodParams<T = unknown> {
    url: string;
    config?: AxiosRequestConfig<T>;
}

interface PostMethodParams<T = unknown> {
    url: string;
    data?: unknown;
    config?: AxiosRequestConfig<T>;
}

interface PutMethodParams<T = unknown> {
    url: string;
    data?: unknown;
    config?: AxiosRequestConfig<T>;
}

interface DeleteMethodParams<T = unknown> {
    url: string;
    config?: AxiosRequestConfig<T>;
}
