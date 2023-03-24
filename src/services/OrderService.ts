import http from "../http-common";
import IOrderData from "../types/Order";
import { AxiosRequestConfig } from "axios";

const getAll = (userId: string,options:AxiosRequestConfig) => {
    return http.get<Array<IOrderData>>(`/users/${userId}/orders`,options);
}

const get = (orderId: number,userId: string,options:AxiosRequestConfig) => {
    return http.get<IOrderData>(`/users/${userId}/orders/${orderId}`,options);
}
const create = (userId: string, order:IOrderData,options:AxiosRequestConfig) => {
    console.log(order)
    return http.post<IOrderData>(`/users/${userId}/orders`,order, options);
}

const getOrderPrice = (orderId: number,userId: string,options:AxiosRequestConfig) => {
    return http.get<number>(`/users/${userId}/orders/${orderId}/price`,options);
}

const OrderService = {
    getAll,
    get,
    create,
    getOrderPrice,
};

export default OrderService;