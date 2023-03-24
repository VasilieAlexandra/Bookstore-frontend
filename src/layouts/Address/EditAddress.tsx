import { useRef, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { useAuth } from "../../provider/AuthProvider";
import AddressService from "../../services/ShippingAddressService";
import IAddressData from "../../types/ShippingAddress";
import { AxiosRequestConfig } from "axios";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';


interface Props {
    increment: () => void
    address: IAddressData
}

export const EditAddress = ({ increment, address }: Props) => {


    const { user } = useAuth();
    const [formValue, setFormValue] = useState<IAddressData>(address);
    const { token } = useAuth();
    const [error, setError] = useState("");
    const { update } = AddressService;


    const options: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        setFormValue({
            ...formValue,
            [e.currentTarget.name]: e.currentTarget.value
        });

    }
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setError("");
            await update(user!.uid, formValue, options);
            increment()
            setOpen(false);
        } catch {
            setError("Failed to update address");
        }

    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (

        <>
            <IconButton aria-label="delete" onClick={handleOpen} size="small"><EditIcon fontSize="small" /></IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="form">
                <Container className="model-style">
                    <form className="row needs-validation" onSubmit={handleSubmit} >
                        <div className="col-md-6">
                            <label htmlFor="validationCustom02" className="form-label">Country</label>
                            <input type="text" name="country" className="form-control" id="validationCustom02" placeholder="country"
                                defaultValue={formValue.country} onChange={handleChange} required />
                            <div className="invalid-feedback">
                                Please provide a valid country.
                            </div>
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="validationCustom04" className="form-label">State</label>
                            <input type="text" name="state" className="form-control" id="validationCustom03" placeholder="state"
                                defaultValue={formValue.state} onChange={handleChange} required />
                            <div className="invalid-feedback">
                                Please select a valid state.
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="validationCustom03" className="form-label">City</label>
                            <input type="text" name="city" className="form-control" id="validationCustom03" placeholder="city"
                                defaultValue={formValue.city} onChange={handleChange} required />
                            <div className="invalid-feedback">
                                Please provide a valid city.
                            </div>
                        </div>
                        <div className="col-md-10">

                            <input type="hidden" name="userId" className="form-control"
                                defaultValue={formValue.userid!} required />

                        </div>

                        <div className="col-md-10">
                            <label htmlFor="validationCustom05" className="form-label">Address</label>
                            <input type="text" name="address" className="form-control" id="validationCustom05" placeholder="address"
                                defaultValue={formValue.address} onChange={handleChange} required />
                            <div className="invalid-feedback">
                                Please provide a valid address.
                            </div>
                        </div>
                        <div className="col-12 form">
                            <Button className="mt-4" color="secondary" variant="contained" type="submit">Edit</Button>
                        </div>
                        {error && <Alert className="m-10" variant="danger">{error}</Alert>}
                    </form>

                </Container>
            </Modal>

        </>
    );
}