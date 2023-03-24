import http from "../http-common";
import ICategoryData from "../types/Category";
import { AxiosRequestConfig } from "axios";
import IBookData from "../types/Book";

const getAll = () => {
    return http.get<Array<ICategoryData>>("/categories");
}
const getAllExclude = (id: number, options: AxiosRequestConfig) => {
    return http.get<Array<ICategoryData>>(`/categories/${id}/exclude`, options);
}

const get = (id: number) => {
    return http.get<ICategoryData>(`/categories/${id}`);
}
const getBooksByCategory = (id: number) => {
    return http.get<Array<IBookData>>(`/categories/${id}/books`);
}

const CatgeoryService = {
    getAll,
    get,
    getAllExclude,
    getBooksByCategory,
};

export default CatgeoryService;