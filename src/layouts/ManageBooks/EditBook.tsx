import Badge from "@mui/material/Badge";
import { AccountSidebar } from "../Account/AccountSidebar";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { PhotoCamera } from "@mui/icons-material";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import ICategoryData from "../../types/Category";
import CatgeoryService from "../../services/CategoryService";
import IBookData from "../../types/Book";
import BookService from "../../services/BookService";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { AxiosRequestConfig } from "axios";
import { useAuth } from "../../provider/AuthProvider";
import Form from "react-bootstrap/esm/Form";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";

interface Props{
    book: IBookData,
    increment: () => void

}


export const EditBook = () => {

    const [image, setImage] = useState({ preview: "", raw: '' as unknown as File });
    const [categoryList, setCategoryList] = useState<Array<ICategoryData>>([]);
    const [bookRequest, setBookRequest] = useState<IBookData>({name: '',author: '', price: 0, quantity: 0, categories: []});
    const { token } = useAuth();
    const { user } = useAuth();
    const { getAllExclude } = CatgeoryService;
    const { get, update } = BookService;
    const { id } = useParams();

    const isDisabled = () => {
        if (bookRequest.categories.length===0 || image.preview==='')
            return true;
        return false;
    }
    
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files!.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files![0]),
                raw: e.target.files![0]
            });
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setBookRequest({
            ...bookRequest,
            [e.currentTarget.name]: e.currentTarget.value
        });
        
    };

    useEffect(() => {

        async function getCategories(book: IBookData) {
            const bookCategories: Array<ICategoryData> = book.categories;
            const ids: Array<number> = bookCategories.map(c => c.id);
            console.log(ids);

            const options: AxiosRequestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                },                
                  params: {"exclude": ids},
                  paramsSerializer: {
                  indexes: null // by default: false
                  }
            };
            const response = await getAllExclude(book.id,options);
            setCategoryList(response.data);  
        }

        function getBook() {
            get(parseInt(id!)).then((response) =>{
                setBookRequest(response.data);
                getCategories(response.data);
                setImage({preview: `data:image/jpeg;base64,${response.data.image}`, raw: response.data.image});
            }
            );
            
        }
        getBook();
        
    }, []);


    const handleUpload = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image.raw);


        const options: AxiosRequestConfig = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            
              params: {"book": JSON.stringify(bookRequest)}
        };

        try{
            const response = await update(user!.uid, formData, options);
            console.log(response); 

        }catch{
            console.log("Failed to update book");
        }
        
    };

    const handleOnClick = (category: ICategoryData) => {
        setBookRequest({...bookRequest, categories: [...bookRequest.categories, category]});
        categoryList.splice(categoryList.indexOf(category), 1);
        setCategoryList(categoryList);
    };

    const handleOnDelete = (category: ICategoryData) => {
        setCategoryList([...categoryList, category]);
        bookRequest.categories.splice(bookRequest.categories.indexOf(category), 1);
        setBookRequest({...bookRequest, categories: bookRequest.categories});
    };
    return (
        <>
            <AccountSidebar>
            {categoryList.length === 0 ? <Spinner className="mt-auto"/> :
                <div className="d-flex justify-content-between aligne-item-center col m-5" >
                <form className="d-flex justify-content-between aligne-item-center col me-auto" id="uploadForm" encType="multipart/form-data" onSubmit={handleUpload}>
                    <div className="d-flex justify-content-between aligne-item-center row me-auto"  style={{maxWidth:'500px', minWidth:'500px'}}>
                   
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            badgeContent={
                                <IconButton color="primary" aria-label="upload picture" component="label">
                                    <input  hidden type="file" onChange={handleChange}/>
                                    <PhotoCamera />
                                </IconButton>
                            }
                        >
                            {image.preview &&
                            <img
                                className="object-fit-contain"
                                src={image.preview}
                                alt="Please upload image"
                                loading="lazy"
                                width="400px" height="450px"

                            />
                            }
                        </Badge>
                        

                        <Grid container spacing={1} justifyContent="flex-start" alignItems="center" >
                            {bookRequest.categories &&
                                bookRequest.categories.map(category => (
                                    
                                    <Grid item xs="auto" key={category.id}>
                                        <Chip label={category.name}  onDelete={() => handleOnDelete(category)} color='warning' />
                                    </Grid>
                                   
                                ))}
                        </Grid>
                    </div>

                    <Divider orientation="vertical" className="me-5 ms-5" />

                    <div className="d-flex justify-content-between aligne-items-between row ms-auto">
                        <TextField className="p-2" name="name" id="outlined-basic" defaultValue={bookRequest.name}
                        label="Title" variant="outlined"
                             onChange={handleOnChange}  required/>

                        <TextField className="p-2"  name="author" id="outlined-basic" defaultValue={bookRequest.author}
                        label="Author" variant="outlined"
                             onChange={handleOnChange} required />

                        <TextField className="p-2" name="price" type='number'  id="outlined-basic" value={bookRequest.price}
                        label="Price" variant="outlined"
                             onChange={handleOnChange} required
                            inputProps={{
                                inputMode: 'numeric',  
                                step:'1',
                                min: '1',
                             }} 
                            InputProps={{
                                endAdornment: <InputAdornment position="start"  >Lei</InputAdornment>}} />

                        <TextField className="p-2" name="quantity" type='number' id="outlined-basic" defaultValue={bookRequest.quantity}
                        label="Quantity" variant="outlined" required
                            onChange={handleOnChange} 
                        inputProps={{
                                inputMode: 'numeric',
                                min: '1',
                                step:'1',
                             }} 
                        />

                        <Grid className="p-2" container spacing={1} justifyContent="flex-start" alignItems="center" >
                            {categoryList &&
                                categoryList.map(category => (
                                    
                                    <Grid item xs="auto" key={category.id}>
                                        <Chip label={category.name} variant="outlined" onClick={() => handleOnClick(category)} color='warning' />
                                    </Grid>
                                    //    <li className="ms-auto p-2" key={category.id}> ></li>
                                ))}
                        </Grid>
                        <div className="mt-4">
                            <Button variant="contained" size="small" type="submit" disabled={isDisabled()} >Save</Button>
                        </div>
                    </div>
                    </form>

                </div>
                
                                }
            </AccountSidebar>
        </>
    );
};

