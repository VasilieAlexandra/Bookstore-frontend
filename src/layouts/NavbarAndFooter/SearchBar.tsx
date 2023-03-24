import { Link, NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Form, Row, Col, FormControl, Button } from "react-bootstrap";
import BookService from "../../services/BookService";



export const SearchBar: React.FC = () => {
    const sequence = useRef<HTMLInputElement>(null);
    const history = useNavigate();


    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            history(`/books/search/${sequence.current?.value}`);
        } catch {
            console.log("Failed to search books");
        }
    }

    return (
        <>
            <ul className="position-relative flex-grow-1 m-auto">
                <Form onSubmit={handleSubmit}>
                    <Row >
                        <Col className="w-100">
                            <FormControl
                                type="text"
                                placeholder="search book after title or author"
                                ref={sequence}
                            />
                        </Col>
                        <Col >
                            <Button variant="outline-light" type="submit">
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </ul>
        </>
    );
}