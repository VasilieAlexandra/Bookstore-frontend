import http from "../http-common";
import IBookData from "../types/Book";
import auth from "../firebaseSetup";
import { AxiosRequestConfig } from "axios";

const getAll = (options: AxiosRequestConfig) => {
  return http.get<Array<IBookData>>("/books",options);
};

const get = (id: any) => {
  return http.get<IBookData>(`/books/${id}`);
};

const create = (userId:String, image: FormData,options: AxiosRequestConfig) => {
  return http.post<IBookData>(`/users/${userId}/books`,image,options);
};

const update = (userId:String, bookId: number, image: FormData,options: AxiosRequestConfig) => {
  return http.put<IBookData>(`/users/${userId}/books/${bookId}`, image,options);
};

const remove = (userId: String, bookId: number,options: AxiosRequestConfig) => {
  return http.delete<boolean>(`/users/${userId}/books/${bookId}`,options);
};

// const removeAll = () => {
//   return http.delete<any>(`/api/book`);
// };
// const findByTitle = (title: string) => {
//   return http.get<Array<IBookData>>(`/api/book?title=${title}`);
// };

const BookService = {
  getAll,
  get,
  create,
  update,
  remove,
  };

export default BookService;