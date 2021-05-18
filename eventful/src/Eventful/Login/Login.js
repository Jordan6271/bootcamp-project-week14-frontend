import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
        };
    }

    submitHandler(event) {
        event.preventDefault();
        this.setState({ disabled: true });
        this.props.apiClient
            .login(
                event.target.formUsername.value,
                event.target.formPassword.value
            )
            .then((response) => {
                this.setState({ disabled: false });
                this.props.loggedIn(response.data.token);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    alert(`You have entered an invalid username or password.`);
                } else {
                    alert(error);
                }
                this.setState({ disabled: false });
            });
    }

    render() {
        return (
            <div className="w-25 m-auto text-center pt-5">
                <Form onSubmit={(event) => this.submitHandler(event)}>
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
        );
    }
}

export default Login;
