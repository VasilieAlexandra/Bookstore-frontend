import axios from "axios";
import auth from "./firebaseSetup";
import { useAuth } from "./provider/AuthProvider";

// const { token } = useAuth();
// const config = {
//   headers: { Authorization: `Bearer ${token}` }
// };

export default axios.create({
  baseURL: "http://localhost:8080/api",
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers': '*',
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
  //   // "Authorization": `Bearer ${token}`
  // }

  
});