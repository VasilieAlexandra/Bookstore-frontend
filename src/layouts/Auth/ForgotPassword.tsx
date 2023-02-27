import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"

export const ForgotPassword = () => {
    return (
        <Card className="cardstyle">
            <Card.Body>
                <h2 className="text-center mb-4">Password Reset</h2>
                <Form >
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Button className="button-style" type="submit">
                        Reset Password
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}