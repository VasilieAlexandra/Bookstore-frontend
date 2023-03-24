import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IOrderData from '../../types/Order';
import { useEffect, useState } from 'react';
import OrderService from '../../services/OrderService';
import { AxiosRequestConfig } from 'axios';
import { useAuth } from '../../provider/AuthProvider';
import React from 'react';

interface Props {
    row: IOrderData,
}

export const OrderTableRow = ({ row }: Props) => {


    const { user, token, isAuthenticated } = useAuth();
    const [open, setOpen] = useState<boolean>(false);

    const { getOrderPrice } = OrderService;
    const [price, setPrice] = useState<string>("");
    const options: AxiosRequestConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const getPrice = async () => {
            const response = await getOrderPrice(row.id!, user!.uid, options);
            setPrice(response.data.toString());
        }
        getPrice();
    }, []);



    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className="table-cell fw-bold" align="left">{row.id}</TableCell>
                <TableCell className="table-cell fw-bold" align="left">{row.date}</TableCell>
                <TableCell className="table-cell fw-bold" align="left">{`${row.shippingAddress?.country} ${row.shippingAddress?.state} ${row.shippingAddress?.city} ${row.shippingAddress?.address}`}</TableCell>
            </TableRow>

            <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Order Items
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow >
                                        <TableCell className="fw-bold" align="left">Book</TableCell>
                                        <TableCell className="fw-bold" align="left">Amount</TableCell>
                                        <TableCell className="fw-bold" align="left">Price (Lei)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.orderLines?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">{item.book?.name}</TableCell>
                                            <TableCell align="left">{item.quantity}</TableCell>
                                            <TableCell align="left">{item.quantity * item.book?.price!}</TableCell>
                                        </TableRow>
                                    ))}
                                    {/* <TableRow >
                                        <TableCell className="fw-bold" colSpan={2} >Total</TableCell>
                                        <TableCell className="fw-bold" align="left">{price}</TableCell>
                                    </TableRow> */}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

        </React.Fragment>
    );
}