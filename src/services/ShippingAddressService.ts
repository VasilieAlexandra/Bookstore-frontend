import { AxiosRequestConfig } from "axios";
import http from "../http-common";
import IAddressData from "../types/ShippingAddress";



const getAll = (userId:String,options: AxiosRequestConfig) => {
  return http.get<Array<IAddressData>>(`/users/${userId}/addresses`,options);
};

const get = (userId:String, id: number,options: AxiosRequestConfig) => {
  return http.get<IAddressData>(`/users/${userId}/addresses/${id}`,options);
};

const create = (userId:String | undefined, data: IAddressData,options: AxiosRequestConfig) => {
  return http.post<IAddressData>(`/users/${userId}/addresses`, data,options);
};

const update = (userId:String, data: IAddressData,options: AxiosRequestConfig) => {
  return http.put<any>(`/users/${userId}/addresses`, data,options);
};

const remove = (userId:String, id: number,options: AxiosRequestConfig) => {
  return http.delete<any>(`/users/${userId}/addresses/${id}`,options);
};



const AddressService = {
  getAll,
  get,
  create,
  update,
  remove,
  };

export default AddressService;