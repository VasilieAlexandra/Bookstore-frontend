import IBookData from '../../types/Book';
import { useAuth } from '../../provider/AuthProvider';
import { AxiosRequestConfig } from 'axios';
import BookService from '../../services/BookService';
import { useEffect, useState } from 'react';
import { ShopBooks } from './ShopBooks';
import React  from 'react';

export const ExploreBooks = () => {
    const [books, setBooks] = useState<Array<IBookData>>([]);
    const { getAll } = BookService
    const { user, isAuthenticated } = useAuth();
    var id = user !== null ? user!.uid : '';

    const options: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    useEffect(() => {

        async function getCategories() {

            const response = await getAll('', options);
            setBooks(response.data);
            console.log(isAuthenticated);
        }
        getCategories();
    }, []);

    return (
        <div className="p-5 mb-auto bg-dark header scrollbar ">
            <div className=" container-fluid py-5 text-white
            d-flex justify-content-center mb-auto align-item-center">
                <div className="mb-auto">
                    <h1 className="display-5 fw-bold">Find your next book to binge</h1>
                    <p className='col-md-8 fs-4'>Where would you like to go next?</p>
                    <a type="button" className="btn main-color btn-lg text-white" href="books">Explore books</a>
                </div>
            </div>
            <div className=" mt-1 mb-auto d-flex justify-content-center aligne-items-center row ">
                <ShopBooks books={books} />
            </div>
        </div>
    );
}

