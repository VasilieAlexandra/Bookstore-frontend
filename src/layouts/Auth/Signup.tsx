import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { useRef, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
export const Signup = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const { signUp } = useAuth();

    const [error, setError] = useState("");
    const history = useNavigate();

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (passwordRef.current!.value === confirmPasswordRef.current!.value)
            try {
                setError("");
                await signUp(emailRef.current!.value, passwordRef.current!.value);
                history("/");
            } catch {
                setError("Failed to sign up");
            }
        else setError("Confirmed password does not match");
    }

    return (

        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "80vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card className="cardstyle">
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} placeholder='Email' />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} placeholder='Password' />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control type="password" ref={confirmPasswordRef} placeholder='Confirm password' />
                            </Form.Group>
                            <Button className="button-style" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </div>
        </Container>

    );
}