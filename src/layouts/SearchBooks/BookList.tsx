import { ImageListItem } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import { Empty } from "antd";
import IBookData from "../../types/Book";
import { BookCard } from "../HomePage/BookCard";


interface Props {
    books: Array<IBookData>
}

export const BookList = ({ books }: Props) => {
    return (
        <>
            {books.length === 0 ?
                <Empty className="mt-10" /> :
                <div >
                    <ImageList className="mr-auto" sx={{
                        '&::-webkit-scrollbar': { width: "4px", height: "1px", background: "#888;" }
                    }} cols={4} gap={20} rowHeight={330}>

                        {books && books.map((book) => (
                            <ImageListItem key={book.id} sx={{ width: '250px', height: "330px" }}>
                                <BookCard book={book} />
                            </ImageListItem>

                        ))}
                    </ImageList>
                </div>
            }
        </>
    );
}