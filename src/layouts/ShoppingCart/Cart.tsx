import React, { useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { useAuth } from "../../provider/AuthProvider";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import AddressService from "../../services/ShippingAddressService";
import IAddressData from "../../types/ShippingAddress";
import { Button, FormControlLabel, IconButton, Radio, RadioGroup } from "@mui/material";
import { Alert } from "react-bootstrap";
import { useCart } from "../../provider/CartProvider";
import ClearIcon from '@mui/icons-material/Clear';
import IOrderLineData from "../../types/OrderLine";
import OrderService from "../../services/OrderService";
import IOrderData from "../../types/Order";



export const Cart = () => {
  const [addresses, setAddresses] = useState<Array<IAddressData>>([]);
  const { user, token, isAuthenticated } = useAuth();
  const { getAll } = AddressService;
  const { cart, removeFromCart, updateCart, getTotalPrice, emptyCart } = useCart();
  const [value, setValue] = useState<string>("");
  const [newQuant, setNewQuant] = useState<number>(0);
  const { create } = OrderService;


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    function getData() {
      if (isAuthenticated)
        getAll(user!.uid, options).then(response => setAddresses(response.data));
    }

    getData();
  }, []);


  const options: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  const handleRemove = (line: IOrderLineData) => {
    removeFromCart(line);
  }

  const isDisabled = () => {
    if (value !== "" && cart.length !== 0)
      return false;
    return true;

  };

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewQuant(parseInt(e.currentTarget.value));
  };

  const handlePlaceOrder = async () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
    console.log(parseInt(value));

    const response = await create(user!.uid, { date: currentDate, idAddress: parseInt(value), orderLines: cart } as IOrderData, options);
    console.log(response.data);
    emptyCart();
  }
  return (
    <div className="d-flex justify-content-center row aligne-items-center m-5">
      <TableContainer className="d-flex " component={Paper}>
        <Table aria-label="customized table">
          <TableHead >
            <TableRow>
              <TableCell className="fw-bold" align="left">Book</TableCell>
              <TableCell className="fw-bold" align="left">Quantity</TableCell>
              <TableCell className="fw-bold" align="left">Price</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((line) => (
              <TableRow key={line.idBook}>
                <TableCell className="table-cell" align="left">{`${line.book?.name} by ${line.book?.author}`}</TableCell>
                <TableCell className="table-cell" align="left"><Button onClick={() => updateCart(line, newQuant)}><input type="number" step='1' min='1' max={line.book?.quantity} defaultValue={line.quantity} onChange={handleUpdate}></input></Button></TableCell>
                <TableCell className="table-cell" align="left">{`${line.book?.price} Lei`}</TableCell>
                <TableCell align="left" onClick={() => handleRemove(line)}>
                  <IconButton aria-label="delete" size="small">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="fw-bold" colSpan={2} >Total</TableCell>
              <TableCell className="fw-bold" align="left">{`${getTotalPrice()} Lei`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {!isAuthenticated ?
        <Alert className="mt-10" variant="danger">You need to create an account to place an order!</Alert>
        :
        <RadioGroup
          aria-labelledby="radio-buttons-group"
          name="controlled-radio-buttons-group"
          className="m-5"
          value={value}
          onChange={handleChange}
        >
          {addresses &&
            addresses.map(address => (
              <div key={address.id}>

                <FormControlLabel value={address.id!.toString()} control={<Radio />}
                  label={`${address.country} ${address.state} ${address.city} ${address.address}`} />

              </div>
            ))}
        </RadioGroup>
      }
      <div className="d-flex justify-content-between">
        <Button disabled={isDisabled()} onClick={() => handlePlaceOrder()}>Place order</Button>
      </div>

    </div>
  );
}