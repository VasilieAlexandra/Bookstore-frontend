import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Container } from "react-bootstrap";
import { AccountSidebar } from "../Account/AccountSidebar";
import IOrderData from "../../types/Order";
import OrderService from "../../services/OrderService";
import { useAuth } from "../../provider/AuthProvider";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { OrderTableRow } from "./OrderTableRow";
import IconButton from "@mui/material/IconButton";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const Orders = () => {

    const [orders, setOrders] = useState<Array<IOrderData>>([]);
    const [open, setOpen] = useState<boolean>(false);
    const { user, token, isAuthenticated } = useAuth();
    const { getOrderPrice } = OrderService;
    const [price, setPrice] = useState<string>("");

    const options: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const { get, getAll } = OrderService;

    useEffect(() => {

        getAll(user?.uid!, options).then(response => setOrders(response.data));
    }, []);

    return (
        <>
            <AccountSidebar>
                <div>
                    <TableContainer className="d-flex w-100 mt-5" component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead className="bg-primary-subtle">
                                <TableRow >
                                    <TableCell className="fw-bold" align="left"></TableCell>
                                    <TableCell className="fw-bold" align="left">Id order</TableCell>
                                    <TableCell className="fw-bold" align="left">Date</TableCell>
                                    <TableCell className="fw-bold" align="left">Address</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((row) => (
                                    <OrderTableRow key={row.id} row={row} />

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </AccountSidebar>
        </>
    );
}