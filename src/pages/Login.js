import React, { useRef, useState, useContext } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import DcContext from "../store/dc-context";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const context = useContext(DcContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      context.login(userNameRef.current.value, passwordRef.current.value);
      history.replace("/pending");
    } catch {
      setError("Failed to login");
    }
    setLoading(false);
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "70vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log in</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="userNasme">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={userNameRef}
                ></Form.Control>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  ref={passwordRef}
                ></Form.Control>
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100"
                type="submit"
                style={{
                  backgroundColor: "#800040",
                  margin: "2rem 0",
                }}
              >
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
