import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from "../../provider/AuthProvider";
import IAddressData from "../../types/ShippingAddress";
import AddressService from "../../services/ShippingAddressService";
import { useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import { EditAddress } from "./EditAddress";
import Badge from '@mui/material/Badge';
import Tooltip from "@mui/material/Tooltip";
import { AddAddress } from "./AddAddress";


interface Props {
    addresses: Array<IAddressData>
    increment: () => void
}

export const AddressTable = ({ addresses, increment }: Props) => {
    const { user } = useAuth();
    const { token } = useAuth();
    const [error, setError] = useState("");
    const { remove } = AddressService;

    const options: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };


    const handleRemove = async (address: IAddressData) => {

        try {
            setError("");
            await remove(user!.uid, address.id!, options)
            increment();

        } catch {
            setError("Failed to add address");
        }

    }

    return (
        <div className="" >

            <TableContainer className="d-flex w-100 mt-5" component={Paper}>
                <Table aria-label="customized table">
                    <TableHead className="bg-primary-subtle">
                        <TableRow>
                            <TableCell className="fw-bold" align="right">Country</TableCell>
                            <TableCell className="fw-bold" align="right">State</TableCell>
                            <TableCell className="fw-bold" align="right">City</TableCell>
                            <TableCell className="fw-bold" align="right">Address</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {addresses.map((address) => (
                            <TableRow key={address.id}>
                                <TableCell className="table-cell" align="right">{address.country}</TableCell>
                                <TableCell className="table-cell" align="right">{address.state}</TableCell>
                                <TableCell className="table-cell" align="right">{address.city}</TableCell>
                                <TableCell className="table-cell" align="right">{address.address}</TableCell>
                                <TableCell align="right"><EditAddress increment={increment} address={address}></EditAddress></TableCell>
                                <TableCell align="right" onClick={() => handleRemove(address)}><IconButton aria-label="delete" size="small"><DeleteIcon fontSize="small" /></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="">
                    <Tooltip title="Add" placement="top-end">
                        <>
                            <AddAddress increment={increment} />
                        </>
                    </Tooltip>
                </div>
            </TableContainer>


        </div>
    );
}