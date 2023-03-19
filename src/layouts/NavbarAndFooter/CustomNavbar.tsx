import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Navbar, Nav, Form, Row, Col, FormControl, Button } from "react-bootstrap";
import myLogo from '../../Images/PublicImages/logo.jpg';
import cart from '../../Images/PublicImages/trolley-cart.png';
import account from '../../Images/PublicImages/user.png';
import { useAuth } from "../../provider/AuthProvider";
import CatgeoryService from "../../services/CategoryService";
import ICategoryData from "../../types/Category";
import { SearchBar } from "./SearchBar";
import IconButton from "@mui/material/IconButton";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { blueGrey } from '@mui/material/colors';



export const CustomNavbar = () => {
    const { logOut } = useAuth();
    const { user } = useAuth();
    const [error, setError] = useState<String>("");
    const history = useNavigate();
    const [categoryList, setCategoryList] = useState<Array<ICategoryData>>([]);
    const { getAll } = CatgeoryService

    // const getCategories = () => {
    //     CatgeoryService.getAll()
    //         .then((response: any) => {
    //             setCategoryList(response.data);
    //             console.log(response.data);
    //         })
    //         .catch((e: Error) => {
    //             console.log(e);
    //         });
    // };
    useEffect(()=>{
        async function getCategories(){
            const response = await getAll();
            setCategoryList(response.data);
        }
        getCategories();
    },[]);

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
                <img src={myLogo} width={50} height={50} />
                <div className='navbar-brand logo' >Book</div>

                <ul className='navbar-nav '>
                    <li className='nav-item'>
                        <NavLink to="/" className={({ isActive }) =>
                            isActive ? 'nav-link' : 'nav-link'
                        }>Home</NavLink>
                    </li>
                    <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle nav-link bg-transparent" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                            Categories
                        </a>
                        <ul className="dropdown-menu">
                            {categoryList &&
                                categoryList.map(category => (
                                    <li key={category.id}><a className="dropdown-item" href="#">{category.name}</a></li>
                                ))}
                        </ul>
                    </div>
                    {/* <div className="dropdown">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            Dropdown form
                        </button>
                        <form className="dropdown-menu p-4">
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleDropdownFormPassword2" placeholder="Password" />
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="dropdownCheck2" />
                                    <label className="form-check-label">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </form>
                    </div> */}
                </ul>
                <SearchBar />
                <ul className='navbar-nav ms-auto'>
                    <li>
                        <Link type='button' className='btn' to='/cart'>
                            <Badge badgeContent={0} color="primary" showZero >
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
