import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal/Modal";
import { useEffect, useState } from "react";
import IBookData from "../../types/Book";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import BookService from "../../services/BookService";
import Spinner from "react-bootstrap/esm/Spinner";
import React  from 'react';
import InfoIcon from '@mui/icons-material/Info';
interface Props {
    id: number
}

export const BookInfo = ({ id }: Props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [book, setBook] = useState<IBookData | null>(null);
    const { get } = BookService;

    useEffect(() => {

        async function getBook() {
            const response = await get(id);
            setBook(response.data)
        }
        getBook();

    }, []);
    return (
        <div className="d-flex justify-content-center aligne-items-center row">
            <IconButton aria-label="delete" onClick={handleOpen} size="small"><InfoIcon /></IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="d-flex justify-content-center aligne-items-center row m-auto"
                sx={{ minWidth: "200px", maxWidth: "300px" }}

            >

                <Container className="model-style justify-content-center aligne-item-center col h-auto w-auto m-auto">

                    {book === null ? <Spinner className="m-auto" /> :
                        <div className="d-flex w-auto col">
                            <img
                                src={`data:image/jpeg;base64,${book!.image}`}
                                srcSet={`data:image/jpeg;base64,${book!.image}`}
                                alt={book!.name}
                                loading="lazy"
                                className="object-fit-contain aligne-itself-center m-auto"
                                width="200px" height="150px"
                            />

                            <Divider orientation="vertical" className="me-3 ms-3" />
                            <div>
                                <TextField className="p-2" name="name" id="outlined-basic" defaultValue={book!.name} label="Title"
                                    variant="standard" disabled />

                                <TextField className="p-2" name="author" id="outlined-basic" defaultValue={book!.author}
                                    label="Author" variant="standard" disabled />

                                <TextField className="p-2" name="price" type='number' id="outlined-basic" value={book!.price}
                                    label="Price" variant="standard"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start"  >Lei</InputAdornment>
                                    }} disabled />

                                <TextField className="p-2" name="quantity" type='number' id="outlined-basic" defaultValue={book!.quantity}
                                    label="Quantity" variant="standard" disabled
                                />

                                <Grid className="p-2" container spacing={1} justifyContent="flex-start" alignItems="center" >
                                    {book!.categories &&
                                        book!.categories.map(category => (

                                            <Grid item xs="auto" key={category.id}>
                                                <Chip label={category.name} variant="outlined" color='warning' />
                                            </Grid>
                                        ))}
                                </Grid>
                            </div>
                        </div>
                    }
                </Container>


            </Modal>



        </div>
    );
}