import { ImageListItem } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import IBookData from '../../types/Book';
import { BookListItem } from './BookListItem';
import { Empty } from 'antd';



interface Props {
    books: Array<IBookData>
    increment: () => void
}

export const BookList = ({ books, increment }: Props) => {

    return (
        <>
            {books.length === 0 ?
                <Empty className="m-auto" /> :
                <div className="d-flex me-auto">
                    <ImageList cols={4} gap={20} rowHeight={200}>

                        {books && books.map((book) => (
                            <ImageListItem key={book.id} sx={{ width: '200px', height: "200px" }}>
                                <BookListItem book={book} increment={increment} />
                            </ImageListItem>

                        ))}
                    </ImageList>
                </div>
            }
        </>
    );
}