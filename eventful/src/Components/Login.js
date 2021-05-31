import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = (props) => {
    const [disabled, setDisabled] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        setDisabled(true);
        props.apiClient
            .login(
                event.target.formUsername.value,
                event.target.formPassword.value
            )
            .then((response) => {
                setDisabled(false);
                props.loggedIn(response.data.token);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    alert(`You have entered an invalid username or password.`);
                } else {
                    alert(error);
                }
                setDisabled(false);
            });
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand className="mx-5">Eventful</Navbar.Brand>
            </Navbar>
            <div className="w-25 m-auto text-center pt-4">
                <Form onSubmit={(event) => submitHandler(event)}>
                    <h1>Log In</h1>
                    <Form.Group controlId="formUsername" className="pt-4">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="username"
                            placeholder="Enter username"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="py-4">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;
