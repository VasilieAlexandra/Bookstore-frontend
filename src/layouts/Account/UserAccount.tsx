import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Navbar, Nav, Form, Row, Col, FormControl, Button, Container } from "react-bootstrap";
import { useAuth } from "../../provider/AuthProvider";
import { AccountSidebar } from "./AccountSidebar";
import AddressService from "../../services/ShippingAddressService";
import IAddressData from "../../types/ShippingAddress";
import { AxiosRequestConfig } from "axios";
import { AddAddress } from "../Address/AddAddress";
import { AddressTable } from "../Address/AddressTable";
import TextField from "@mui/material/TextField";
import { User } from "firebase/auth";
import { UserDetails } from "../UserDetails/UserDetails";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

export const UserAccount = () => {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState<Array<IAddressData>>([]);
    const { token } = useAuth();
    const { getAll } = AddressService;
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1)
    }


    const options: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    useEffect(() => {
        async function getData() {
            const response = await getAll(user!.uid, options);
            setAddresses(response.data)
        }
        getData();
    }, [count]);

    return (

        <>
            <AccountSidebar>
                <div className="d-flex justify-content-center aligne-item-center row">
                    <UserDetails />
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Change Password</Link>
                    </div>
                    <AddressTable addresses={addresses} increment={increment} />
                </div>

            </AccountSidebar>
        </>
    );
}