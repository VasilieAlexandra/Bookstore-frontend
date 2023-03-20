import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Spinner from 'react-bootstrap/esm/Spinner';
import IBookData from '../../types/Book';
interface Props {
    books: Array<IBookData>
    increment: () => void
}

export const BookList = ({books, increment}: Props) => {
const convertImg = (imageBytes: BlobPart) => {
    var blob = new Blob([imageBytes], { type: "image/jpeg" });
    var imageUrl = URL.createObjectURL(blob);
    return imageUrl;
}
     
    return (
        <>
        {books.length === 0 ?
        <Spinner/> :
          <ImageList cols={5} gap={20} rowHeight={200}>

                {books && books.map((book) => (
                    <ImageListItem key={book.id}>
                        <img
                            src={`data:image/jpeg;base64,${book.image}`}
                            //srcSet={`${convertImg(book.image)}`}
                            alt={book.name}
                            //loading="lazy"
                        />
                        <ImageListItemBar
                            title={book.name}
                            subtitle={<span >Author: {book.author}</span>}
                            position="below"
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(93, 64, 238, 0.788)' }}
                                    aria-label={`info about ${book.name}`}
                                >
                                    <InfoIcon />
                                </IconButton>
                            } />
                    </ImageListItem>
                ))}
            </ImageList>
}
        </>
    );
}