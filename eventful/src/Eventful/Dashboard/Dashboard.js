import React from "react";
import "./Dashboard.css";
import Add from "../Add/Add";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            currentEvent: undefined,
        };
    }

    refreshList() {
        this.props.apiClient.getEvent().then((response) =>
            this.setState({
                events: response.data,
            })
        );
    }

    removeEvent(id) {
        this.props.apiClient.removeEvent(id).then(() => this.refreshList());
    }

    updateEvent(event) {
        this.setState({
            currentEvent: event,
        });
    }

    componentDidMount() {
        this.refreshList();
    }

    buildRows() {
        return this.state.events.map((current) => {
            return (
                <tr key={current._id}>
                    <td className="table-width-15">{current.name}</td>
                    <td className="table-width-15">{current.location}</td>
                    <td className="table-width-35">{current.description}</td>
                    <td className="table-width-10">{current.date}</td>
                    <td className="table-width-10">{current.time}</td>
                    <td className="table-width-15">
                        <Link to="/add">
                            <span
                                className="action-link update mx-2"
                                onClick={() => this.updateEvent(current)}
                            >
                                Update
                            </span>
                        </Link>
                        <span
                            className="action-link remove mx-2"
                            onClick={() => this.removeEvent(current._id)}
                        >
                            Remove
                        </span>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <Router>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand className="mx-5">Eventful</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Link to="/" className="nav-link text-danger px-3">
                                View Events
                            </Link>
                            <Link
                                to="/add"
                                className="nav-link text-danger px-3"
                            >
                                Add New Event
                            </Link>
                        </Nav>
                        <Nav className="m-auto" />
                        <Nav>
                            <Link
                                to="/"
                                className="ml-auto nav-link text-danger px-5"
                                onClick={() =>
                                    this.props.apiClient.logoutHandler()
                                }
                            >
                                Logout
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Container>
                    <Switch>
                        <Route path="/add">
                            <Add
                                apiClient={this.props.apiClient}
                                refreshList={() => {
                                    this.refreshList();
                                    this.setState({
                                        currentEvent: undefined,
                                    });
                                }}
                                currentEvent={this.state.currentEvent}
                            />
                        </Route>
                        <Route exact path="/">
                            <div className="mx-auto text-center pt-4">
                                <h1>My Events</h1>
                                {this.state.events.length ? (
                                    <Table
                                        striped
                                        bordered
                                        hover
                                        id="events-table"
                                    >
                                        <thead>
                                            <tr>
                                                <th>Event Name</th>
                                                <th>Location</th>
                                                <th>Description</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>{this.buildRows()}</tbody>
                                    </Table>
                                ) : (
                                    <div className="mt-4">
                                        Sorry, you have no events yet.{" "}
                                        <Link to="/add">Try adding one!</Link>
                                    </div>
                                )}
                            </div>
                        </Route>
                        <Route path="/">Error: 404 not found</Route>
                    </Switch>
                </Container>
            </Router>
        );
    }
}

export default Dashboard;
