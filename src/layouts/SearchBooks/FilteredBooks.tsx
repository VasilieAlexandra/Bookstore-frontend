import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import BookService from "../../services/BookService";
import IBookData from "../../types/Book";
import { BookList } from "./BookList";

export const FilteredBooks = () => {
    const { sequence } = useParams();
    const { findByTitleOrAuthor } = BookService;
    const { user } = useAuth();
    const [filteredBooks, setFilteredBooks] = useState<Array<IBookData>>([]);


    useEffect(() => {
        async function getBooks() {
            var id = user !== null ? user!.uid : '';
            const response = await findByTitleOrAuthor(sequence!, '');
            setFilteredBooks(response.data)
            console.log(sequence);
        }
        getBooks();
    }, [sequence]);

    return (
        <div className=" d-flex p-3 m-auto ">
            <BookList books={filteredBooks} />
        </div>
    );
};