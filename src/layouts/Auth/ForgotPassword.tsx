import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useRef, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import React  from 'react';

export const ForgotPassword = () => {
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const { updateUserPassword, user } = useAuth();

    const [error, setError] = useState("");
    const history = useNavigate();

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (passwordRef.current!.value === confirmPasswordRef.current!.value)
            try {
                setError("");
                await updateUserPassword(passwordRef.current!.value);
                history("/");
            } catch {
                setError("Failed to change password");
            }
        else setError("Confirmed password does not match");
    }
    return (
        <>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "80vh" }}
            >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card className="cardstyle">
                        <Card.Body>
                            <h2 className="text-center mb-4">Password Reset</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>

                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} placeholder='New password' />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control type="password" ref={confirmPasswordRef} placeholder='Confirm password' />
                                </Form.Group>
                                <Button className="button-style" type="submit">
                                    Reset password
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    );
}