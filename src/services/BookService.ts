import http from "../http-common";
import IBookData from "../types/Book";
import auth from "../firebaseSetup";
import { AxiosRequestConfig } from "axios";

const getAll = (id: string, options: AxiosRequestConfig) => {
  return http.get<Array<IBookData>>(`/books?id=${id}`, options);
};
const getAllForUser = (userId: String, options: AxiosRequestConfig) => {
  return http.get<Array<IBookData>>(`/users/${userId}/books`, options);
};

const get = (id: number) => {
  return http.get<IBookData>(`/books/${id}`);
};

const create = (userId: String, image: any, options: AxiosRequestConfig) => {
  return http.post<IBookData>(`/users/${userId}/books`, image, options);
};

const update = (userId: String, image: FormData, options: AxiosRequestConfig) => {
  return http.put<IBookData>(`/users/${userId}/books`, image, options);
};

const remove = (userId: String, bookId: number, options: AxiosRequestConfig) => {
  return http.delete<boolean>(`/users/${userId}/books/${bookId}`, options);
};

const findByTitleOrAuthor = (str: string, id: string) => {
  return http.get<Array<IBookData>>(`/books/search?str=${str}&id=${id}`);
};

const findByCategory = (id: string) => {
  return http.get<Array<IBookData>>(`/books/category?id=${id}`);
};

const BookService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByTitleOrAuthor,
  findByCategory,
  getAllForUser,
};

export default BookService;