import { useState } from "react";
import UserService from "../../services/UserService";
import { AxiosRequestConfig } from "axios";
import { useAuth } from "../../provider/AuthProvider";


export const Cart = () =>{
    const [text,setText] = useState<String>("");
    const { token } = useAuth();


    const options: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const test = () =>{UserService.test(options)
        .then(function(response) {
            //alert();
            console.log(response.data);
            setText(response.data);
          })
          .catch(function(error) {
            console.log(error);
          })}

    // const {test} = UserService
    // const str = test.toString
    return(
        <button className="btn btn-primary" onClick={test}>        {text}  </button>
    );
}