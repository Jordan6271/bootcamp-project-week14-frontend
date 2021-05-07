import React from "react";
import { ApiClient } from "./ApiClient/ApiClient";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";

class Eventful extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: window.localStorage.getItem(`token`),
        };
        this.client = new ApiClient(
            () => this.state.token,
            () => this.logout()
        );
    }

    login(token) {
        window.localStorage.setItem(`token`, token);
        this.setState({ token });
    }

    logout() {
        window.localStorage.removeItem(`token`);
        this.setState({ token: undefined });
    }

    render() {
        if (this.state.token) {
            return <Dashboard client={this.client} />;
        }
        return (
            <Login
                loggedIn={(token) => this.login(token)}
                client={this.client}
            />
        );
    }
}

export default Eventful;
