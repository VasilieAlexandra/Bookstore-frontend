import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IBookData from "../../types/Book";
import { CardContent, Divider, Typography } from "@mui/material";
import { BookInfo } from "../ManageBooks/BookInfo";
import { useCart } from "../../provider/CartProvider";
import IOrderLineData from "../../types/OrderLine";
import React  from 'react';
interface Props {
    book: IBookData,

}


export const BookCard = ({ book }: Props) => {
    const { addToCart } = useCart();
    const add = (book: IBookData) => {
        addToCart({ idBook: book.id, quantity: 1, book: book } as IOrderLineData)
    }


    return (
        <Card sx={{ maxWidth: 250 }}>
            <CardHeader
                title={book.name}
                subheader={book.author}
                sx={{ height: 100 }}
                action={
                    <IconButton aria-label="add to cart" onClick={() => add(book)}>
                        <AddShoppingCartIcon color="secondary" />
                    </IconButton>
                } />
            <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${book.image}`}
                srcSet={`data:image/jpeg;base64,${book.image}`}
                alt={book.name}
                className="object-fit-contain"
                width="250px" height="150px"
            />
            <Divider></Divider>
            <CardContent>
                <div className="d-flex justify-content-between col">
                    <Typography variant="body2" color="text.secondary">
                        {`${book.price} Lei `}
                    </Typography>
                    <BookInfo id={book.id} />
                </div>
            </CardContent>
            <CardActions disableSpacing>

            </CardActions>
        </Card>

    );

}