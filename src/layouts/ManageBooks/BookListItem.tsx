import IconButton from '@mui/material/IconButton';
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IBookData from '../../types/Book';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import BookService from '../../services/BookService';
import { AxiosRequestConfig } from 'axios';
import { useAuth } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { BookInfo } from './BookInfo';

interface Props {
    book: IBookData,
    increment: () => void

}

export const BookListItem = ({ book, increment }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const selectedBookIdRef = useRef<number | undefined | null>();
    const { remove } = BookService
    const { token } = useAuth();
    const { user } = useAuth();
    const history = useNavigate();

    const options: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, bookId: number) => {
        setAnchorEl(event.currentTarget);
        selectedBookIdRef.current = bookId;
    };

    const handleClose = () => {
        setAnchorEl(null);
        selectedBookIdRef.current = null
    };

    const handleDelete = async (bookId: number) => {
        // try catch and checks
        if (selectedBookIdRef.current === bookId) {
            await remove(user!.uid, bookId, options);
            handleClose();
            increment();
        }
    }
    const handleEdit = async (bookId: number) => {
        // try catch and checks
        if (selectedBookIdRef.current === bookId) {
            history(`/account/manageBooks/edit/${selectedBookIdRef.current}`)
        }
    }


    return (
        <>
            <img
                src={`data:image/jpeg;base64,${book.image}`}
                srcSet={`data:image/jpeg;base64,${book.image}`}
                alt={book.name}
                loading="lazy"
                className="object-fit-contain"
                width="200px" height="150px"
            />
            <ImageListItemBar
                title={book.name}
                subtitle={<span >Author: {book.author}</span>}
                position="below"
                sx={{ height: "50px" }}
                actionIcon={
                    <>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            sx={{ color: 'rgba(93, 64, 238, 0.788)' }}
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, book.id)}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id={`simple-menu-${book.id}`}
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    width: '20ch',
                                },
                            }}
                        >
                            <MenuItem value={book.id} onClick={() => handleEdit(book.id)} >
                                <EditIcon />
                                Edit
                            </MenuItem>
                            <MenuItem value={book.id} onClick={() => handleDelete(book.id)}>
                                <DeleteIcon />
                                Delete
                            </MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem value={book.id} >
                                <BookInfo id={selectedBookIdRef.current!} />
                            </MenuItem>

                        </Menu>
                    </>
                } >
            </ImageListItemBar>
        </>

    );
}