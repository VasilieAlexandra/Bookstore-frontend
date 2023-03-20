import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { AccountSidebar } from "../Account/AccountSidebar";
import BookService from "../../services/BookService";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import IBookData from "../../types/Book";
import { useAuth } from "../../provider/AuthProvider";
import { AxiosRequestConfig } from "axios";
import { BookList } from "./BookList";


export const ManageBooks = () => {
    const { token } = useAuth();
    const { user } = useAuth();
    const [books, setBooks] = useState<Array<IBookData>>([]);
    const { getAll } = BookService
    
    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(count + 1)
    }
    const options: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        },

        params: { "seller": user?.uid }
    };

    useEffect(() => {

        async function getCategories() {
            const response = await getAll(options);
            setBooks(response.data);
        }
        getCategories();
    }, [count]);


    const history = useNavigate();

    return (
        <>
            <AccountSidebar>
                <div className="d-flex justify-content-center aligne-item-center col mt-5">
                    <Tooltip title="Add book"  placement="top-end" >
                        <>
                            <IconButton className="h-25" onClick={() => { history("/account/manageBooks/add") }}>
                                <AddCircleIcon fontSize="large" />
                            </IconButton>
                        </>
                    </Tooltip>
                   <BookList books={books} increment={increment}></BookList>

                </div>
            </AccountSidebar>
        </>
    );
}