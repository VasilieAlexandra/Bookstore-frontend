import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import account from '../../Images/PublicImages/user.png';
import { useAuth } from "../../provider/AuthProvider";
import CatgeoryService from "../../services/CategoryService";
import ICategoryData from "../../types/Category";
import { SearchBar } from "./SearchBar";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { blueGrey } from '@mui/material/colors';
import { useCart } from "../../provider/CartProvider";



export const CustomNavbar = () => {
    const { logOut } = useAuth();
    const { user } = useAuth();
    const [error, setError] = useState<String>("");
    const history = useNavigate();
    const [categoryList, setCategoryList] = useState<Array<ICategoryData>>([]);
    const { getAll } = CatgeoryService
    const { numBooks } = useCart();

    useEffect(() => {
        async function getCategories() {
            const response = await getAll();
            setCategoryList(response.data);
        }
        getCategories();
    }, []);

    async function handleLogout(e: React.MouseEvent<HTMLElement>) {
        try {
            ;
            setError("");
            await logOut();
            history("/");
        } catch {
            setError("Failed to log in");
        }
    }

    return (
        <Navbar className='navbar navbar-dark navbar-expand-lg main-color py-2 d-flex'>
            <Nav className='container-fluid'>
                <NavLink to="/" className='navbar-brand ms-3 logo'>Bookshop</NavLink>

                <ul className='navbar-nav '>
                    <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle nav-link bg-transparent" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Categories
                        </a>
                        <ul className="dropdown-menu">
                            {categoryList &&
                                categoryList.map(category => (
                                    <li key={category.id}><a className="dropdown-item" href={`/books/category/${category.id}`}>{category.name}</a></li>
                                ))}
                        </ul>
                    </div>
                </ul>
                <SearchBar />
                <ul className='navbar-nav ms-auto'>
                    <li>
                        <Link type='button' className='btn' to='/cart'>
                            <Badge badgeContent={numBooks} color="primary" showZero >
                                <ShoppingCartIcon sx={{ color: blueGrey[50] }} fontSize="large" />
                            </Badge>

                        </Link>

                    </li>

                    {!user ?
                        <li className='nav-item m-1'>
                            <Link type='button' className='btn btn-outline-light' to='/signup'>Sign up</Link>
                        </li>
                        :
                        <li>
                            <Link type='button' className='btn' to='/account'><img src={account} width={30} height={30} /></Link>
                            <button className='btn btn-outline-light ms-1' onClick={handleLogout}>Logout</button>
                        </li>

                    }
                </ul>
            </Nav>
        </Navbar>
    );
}
