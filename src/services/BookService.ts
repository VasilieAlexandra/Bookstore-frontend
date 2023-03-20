import http from "../http-common";
import IBookData from "../types/Book";
import auth from "../firebaseSetup";
import { AxiosRequestConfig } from "axios";

// var token = await FirebaseAuth.instance.currentUser().getIdToken();
// var response = await httpClient.get(url,headers: {'Authorization':"Bearer $token"});

//const token = auth.currentUser?.getIdTokenResult(true);

const getAll = (options: AxiosRequestConfig) => {
  return http.get<Array<IBookData>>("/books",options);
};

const get = (id: any) => {
  return http.get<IBookData>(`/books/${id}`);
};

const create = (userId:String, data: IBookData, image: FormData,options: AxiosRequestConfig) => {
  return http.post<IBookData>(`/users/${userId}/books`,image,options);
};

const update = (userId:String, bookId: any, data: IBookData) => {
  return http.put<any>(`/users/${userId}/books/${bookId}`, data);
};

const remove = (userId: String, bookId: any) => {
  return http.delete<any>(`/books/${bookId}`);
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