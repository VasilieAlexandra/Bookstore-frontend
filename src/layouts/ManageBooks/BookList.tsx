import { ImageListItem } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import Spinner from 'react-bootstrap/esm/Spinner';
import IBookData from '../../types/Book';
import { BookListItem } from './BookListItem';


interface Props {
    books: Array<IBookData>
    increment: () => void
}

export const BookList = ({ books, increment }: Props) => {

    // const { token } = useAuth();
    // const { user } = useAuth();
    
    // const options: AxiosRequestConfig = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`,
    //     },
    // };


    return (
        <>
            {books.length === 0 ?
                <Spinner className="m-auto"/> :
                <div className="d-flex me-auto">
                    <ImageList cols={5} gap={20} rowHeight={200}>

                        {books && books.map((book) => (
                            <ImageListItem key={book.id} sx={{ width: '200px', height: "200px" }}>
                                <BookListItem book={book} increment={increment}/>
                            </ImageListItem>
                            
                        ))}
                    </ImageList>
                </div>
            }
        </>
    );
}