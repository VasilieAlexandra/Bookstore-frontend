import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CatgeoryService from "../../services/CategoryService";
import IBookData from "../../types/Book";
import { BookList } from "./BookList";

export const CategoryBooks = () => {
    const { id } = useParams();
    const { getBooksByCategory } = CatgeoryService;
    const [filteredBooks, setFilteredBooks] = useState<Array<IBookData>>([]);

    useEffect(() => {
        async function getBooks() {
            const response = await getBooksByCategory(parseInt(id!));
            setFilteredBooks(response.data)
            console.log(id);
        }
        getBooks();
    }, []);

    return (
        <div className=" d-flex p-3 m-auto ">
            <BookList books={filteredBooks} />
        </div>
    );
};