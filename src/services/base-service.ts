import { AxiosResponse } from "axios";
import client from "../config/axios";
import { message, notification } from "antd";
import { DEFAULT_ERROR_MESSAGE, INTERNAL_SERVER_ERROR, UNAUTHORIZED, UNAUTHORIZED_MESSAGE } from "../@constant/constant";

type AxiosReponseCustom<T = unknown> = Promise<AxiosResponse<BaseResponse<T>, unknown>>;

type Request<T> = (method: {
    get: (data: GetMethodParams) => AxiosReponseCustom<T>,
    post: (data: PostMethodParams) => AxiosReponseCustom<T>,
    put: (data: PutMethodParams) => AxiosReponseCustom<T>,
    deleteMethod: (data: DeleteMethodParams) => AxiosReponseCustom<T>,
}) => AxiosReponseCustom<T>

class BaseService {

    private get<T>(data: GetMethodParams): AxiosReponseCustom<T> {
        return client.get(data.url, data?.config);
    }

    private post<T>(data: PostMethodParams): AxiosReponseCustom<T> {
        return client.post(data.url, data?.data, data?.config);
    }

    private put<T>(data: PutMethodParams): AxiosReponseCustom<T> {
        return client.put(data.url, data?.data, data?.config);
    }

    private delete<T>(data: DeleteMethodParams): AxiosReponseCustom<T> {
        return client.delete(data.url, data?.config);
    }

    protected async ProxyRequest<T>(request: Request<T>): AxiosReponseCustom<T> {
        try {
            const req = await request({ get: this.get, post: this.post, put: this.put, deleteMethod: this.delete });
            const status = req.data?.status;
            if (status !== 200) {
                const msg = (() => {
                    if (req.data?.message) return req.data?.message;
                    if (status === 500) return INTERNAL_SERVER_ERROR;
                    if (status === 401) return UNAUTHORIZED;
                    return DEFAULT_ERROR_MESSAGE;
                })();
                throw new Error(msg);
            }
            return req;
        } catch (error: unknown) {
            const msg = (error as Error)?.message || DEFAULT_ERROR_MESSAGE;
            if (msg === DEFAULT_ERROR_MESSAGE || msg === INTERNAL_SERVER_ERROR) {
                message.error({ key: msg, content: msg });
            } else {
                notification.error({
                    message: msg === UNAUTHORIZED ? UNAUTHORIZED : "Error",
                    description: msg === UNAUTHORIZED ? UNAUTHORIZED_MESSAGE : msg,
                    key: msg,
                });
            }
            throw new Error(msg);
        }
    }

    protected async ProxyRequestNoAxios<T>(request: () => Promise<T>): Promise<T> {
        try {
            const req = await request();
            return req;
        } catch (error: unknown) {
            const msg = (error as Error)?.message || DEFAULT_ERROR_MESSAGE;
            if (msg === DEFAULT_ERROR_MESSAGE || msg === INTERNAL_SERVER_ERROR) {
                message.error({ key: msg, content: msg });
            } else {
                notification.error({
                    message: msg === UNAUTHORIZED ? UNAUTHORIZED : "Error",
                    description: msg === UNAUTHORIZED ? UNAUTHORIZED_MESSAGE : msg,
                    key: msg,
                });
            }
            throw new Error(msg);
        }
    }
}

export default BaseService;
