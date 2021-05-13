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
        if (event.target.formUsername.value === ``) {
            return alert(`Please enter a username.`);
        }
        if (event.target.formPassword.value === ``) {
            return alert(`Please enter a password.`);
        }
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
            <div>
                <Form
                    className="w-25 mx-auto text-center"
                    onSubmit={(event) => this.submitHandler(event)}
                >
                    <h1>Log In</h1>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="username"
                            placeholder="Enter username"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
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
