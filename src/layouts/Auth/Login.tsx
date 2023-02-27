import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
export const Login = () => {
    return (
        <div>
            <Card className="cardstyle">
                <Card.Body>
                    <h2 className="text-center mb-4">Log in</h2>
                    <Form>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>
                        <Button className="button-style" type="submit">
                            Log in
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}