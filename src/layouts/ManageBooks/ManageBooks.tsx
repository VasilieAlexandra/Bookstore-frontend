import { AccountSidebar } from "../Account/AccountSidebar";
import BookService from "../../services/BookService";
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import IBookData from "../../types/Book";
import { useAuth } from "../../provider/AuthProvider";
import { AxiosRequestConfig } from "axios";
import { BookList } from "./BookList";
import React  from 'react';

export const ManageBooks = () => {
    const { token } = useAuth();
    const { user } = useAuth();
    const [books, setBooks] = useState<Array<IBookData>>([]);
    const { getAllForUser } = BookService
    const history = useNavigate();

    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(count + 1)
    }
    const options: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    useEffect(() => {

        async function getCategories() {
            const response = await getAllForUser(user!.uid, options);
            setBooks(response.data);
        }
        getCategories();
    }, [count]);

    return (
        <>
            <AccountSidebar>
                <div className="d-flex justify-content-center aligne-item-center col mt-5">
                    <Tooltip title="Add book" placement="top-end" >
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