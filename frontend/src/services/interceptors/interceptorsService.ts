import { AxiosResponse } from 'axios';
import { InternalAxiosRequestConfig } from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
    return response;
};

export const requestInterceptor = async (request: InternalAxiosRequestConfig) => {
    return request;
};