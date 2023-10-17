import { Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import { AccountSidebar } from "./AccountSidebar";
import AddressService from "../../services/ShippingAddressService";
import IAddressData from "../../types/ShippingAddress";
import { AxiosRequestConfig } from "axios";
import { AddressTable } from "../Address/AddressTable";
import { UserDetails } from "../UserDetails/UserDetails";
import React  from 'react';

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