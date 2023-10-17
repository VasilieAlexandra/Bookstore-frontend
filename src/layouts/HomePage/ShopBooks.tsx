import { ImageListItem } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import IBookData from "../../types/Book";
import { BookCard } from "./BookCard";
import { Empty } from 'antd';

interface Props {
    books: Array<IBookData>
}

export const ShopBooks = ({ books }: Props) => {
    return (
        <>
            {books.length === 0 ?
                <Empty className="mt-10" /> :
                <div >
                    <ImageList sx={{
                        gridAutoFlow: "column",
                        gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr)) !important",
                        gridAutoColumns: "minmax(250px, 1fr)",
                        '&::-webkit-scrollbar': { width: "10px", height: "4px", background: "#888;" }
                    }} cols={5} gap={20} rowHeight={330}>

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