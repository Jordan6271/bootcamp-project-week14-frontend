import React from "react";
import { ApiClient } from "./ApiClient/ApiClient";
import Dashboard from "./Dashboard/Dashboard";

class Eventful extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: `secretstring`,
        };
        this.client = new ApiClient(
            () => this.state.token,
            () => this.logout()
        );
    }

    logout() {
        this.setState({ token: undefined });
    }

    render() {
        return (
            <div>
                <p>Eventful!</p>
                <Dashboard apiClient={this.client} />
            </div>
        );
    }
}

export default Eventful;
