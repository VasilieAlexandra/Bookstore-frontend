import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import CatgeoryService from '../../services/CategoryService';
import ICategoryData from '../../types/Category';
import BookService from "../../services/BookService";
import { Button, Divider, InputAdornment, TextField } from '@mui/material';
import IBookData from '../../types/Book';
import { AxiosRequestConfig } from 'axios';
import { ShopBooks } from '../HomePage/ShopBooks';
import Form from 'react-bootstrap/esm/Form';
import { BookList } from './BookList';
import { useAuth } from '../../provider/AuthProvider';

export const FilterMenu: React.FC = () => {
    const [categoryList, setCategoryList] = useState<Array<ICategoryData>>([]);
    const [categoryFilter, setCategoryFilter] = useState<Array<ICategoryData>>([]);
    const { getAll, get } = CatgeoryService
    const { user } = useAuth();
    const [checked, setChecked] = useState<Array<string>>([]);
    const [filteredBooks, setFilteredBooks] = useState<Array<IBookData>>([]);

    const [range, setRange] = useState<{minPrice: number, maxPrice: number}>({minPrice:0, maxPrice:9999});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
            
        setRange({...range, [e.target.name]: e.target.value})
        console.log(range)
    }
    const options: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    useEffect(() => {
        async function getCategories() {
            const response = await getAll();
            setCategoryList(response.data);
            const res = await BookService.getAll('',options);
            setFilteredBooks(res.data);
        }
        getCategories();
    }, []);

    const handleSubmit = async () => {
        setFilteredBooks([])
        const options: AxiosRequestConfig = {
            params: { "categories": JSON.stringify(categoryFilter), "min": range.minPrice, "max": range.maxPrice }
        };
        var id = user!==null? user!.uid : '';
        const response = await BookService.getAll('',options);
        setFilteredBooks(response.data)

    }
    const handleCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {

        var updatedList = [...checked];
        var updatedCategories = [...categoryFilter];
        const response = await get(parseInt(event.target.value));
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
            updatedCategories=[...categoryFilter, response.data]
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
            updatedCategories.splice(categoryFilter.indexOf(response.data), 1);
        }
        setChecked(updatedList);
        setCategoryFilter(updatedCategories);
    };

    const isChecked = (item: string) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";


    return (
        <div className="d-flex justify-content-left aligne-items-center m-auto col">
            <Box className="d-flex justify-content-center aligne-items-center row mt-2 ms-3 me-5" sx={{ maxHeight:"400px", width: "230px" }}>

                    <FormGroup sx={{ m: 2 }} >
                        {categoryList &&
                            categoryList.map(category => (
                                <div key={category.id}>
                                    <input value={category.id} type="checkbox" onChange={handleCheck} />
                                    <span className={isChecked(category.name)}>{category.name}</span>
                                </div>
                            ))}

                    </FormGroup>
                    <div>
                    <TextField className="p-2" name="minPrice" type='number' id="minPrice" defaultValue={range.minPrice}
                        label="Minumum price" variant="outlined" onChange={handleChange}
                        inputProps={{
                            inputMode: 'numeric',
                            step: '1',
                            min: '1',
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="start"  >Lei</InputAdornment>
                        }} />
                    <TextField className="p-2" name="maxPrice" type='number' id="maxPrice" defaultValue={range.maxPrice}
                    onChange={handleChange}
                        label="Maximum price" variant="outlined"
                        inputProps={{
                            inputMode: 'numeric',
                            step: '1',
                            min: '1',
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="start"  >Lei</InputAdornment>
                        }} />
                        </div>
                    <div className="m-auto">
                        <Button variant="contained" size="small" onClick={handleSubmit} >Search</Button>
                    </div>
            </Box>

            <div className="d-flex justify-content-lcenter aligne-items-center second-color row w-100 me-auto">
                {filteredBooks.length!==0 && <BookList books={filteredBooks} />}
            </div>
        </div>
    );
};