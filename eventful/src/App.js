import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ApiClient } from "./ApiClient/ApiClient";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";

const App = () => {
    const [token, setToken] = useState(window.localStorage.getItem(`token`));
    const apiClient = new ApiClient(
        () => token,
        () => logout()
    );

    const login = (token) => {
        window.localStorage.setItem(`token`, token);
        setToken(token);
    };
    const logout = () => {
        window.localStorage.removeItem(`token`);
        setToken(undefined);
    };
    if (token) {
        return <Dashboard apiClient={apiClient} />;
    }
    return <Login loggedIn={(token) => login(token)} apiClient={apiClient} />;
};

export default App;
