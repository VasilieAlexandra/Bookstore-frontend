import http from "../http-common";
import { AxiosRequestConfig } from "axios";


// var token = await FirebaseAuth.instance.currentUser().getIdToken();
// var response = await httpClient.get(url,headers: {'Authorization':"Bearer $token"});

//const token = auth.currentUser?.getIdTokenResult(true);




const test = (options : AxiosRequestConfig) => {
  return http.get<String>("/auth/test", options);
};
// const getAll = () => {
//   return http.get<Array<IBookData>>("/api/book");
// };
// const get = (id: any) => {
//   return http.get<IBookData>(`/api/book/${id}`);
// };

// const create = (userId:String, data: IBookData) => {
//   return http.post<IBookData>(`/api/book${userId}`, data);
// };

// const update = (userId:String, bookId: any, data: IBookData) => {
//   return http.put<any>(`/api/book/${userId}${bookId}`, data);
// };

// const remove = (userId:String, bookId: any) => {
//   return http.delete<any>(`/api/book/${userId}${bookId}`);
// };

// const removeAll = () => {
//   return http.delete<any>(`/api/book`);
// };
// const findByTitle = (title: string) => {
//   return http.get<Array<IBookData>>(`/api/book?title=${title}`);
// };

const UserService = {
  // getAll,
  // get,
  // create,
  // update,
  // remove,
  test,
  };

export default UserService;