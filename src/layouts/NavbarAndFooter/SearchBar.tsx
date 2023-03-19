import { Link, NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Navbar, Nav, Form, Row, Col, FormControl, Button } from "react-bootstrap";


export const SearchBar :React.FC = () => {
    return (
        <>
    <ul className="position-relative flex-grow-1 m-auto">
    <Form className="">
        <Row className="">
            <Col className="w-100">
                <FormControl
                    type="text"
                    placeholder="search book after title or author"
                />
            </Col>
            <Col >
                <Button variant="outline-light">
                    Search
                </Button>
            </Col>
        </Row>
    </Form>
</ul>
</>
);
}