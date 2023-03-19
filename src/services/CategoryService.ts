import http from "../http-common";
import ICategoryData from "../types/Category";
import { AxiosRequestConfig } from "axios";

const options: AxiosRequestConfig = {
    headers: {
      'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
      // 'Auth-Token': this.config.access_token,
    },
  };

const getAll = () => {
    return http.get<Array<ICategoryData>>("/categories");
}

const get = (id: number) => {
    return http.get<ICategoryData>(`/categories/${id}`);
}

const CatgeoryService = {
    getAll,
    get,
};

export default CatgeoryService;