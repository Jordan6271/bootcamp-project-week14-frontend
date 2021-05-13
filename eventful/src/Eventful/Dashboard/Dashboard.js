import React from "react";
import "./Dashboard.css";
import Add from "../Add/Add";
import Table from "react-bootstrap/Table";

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
                        <span
                            className="action-link update mx-2"
                            onClick={() => this.updateEvent(current)}
                        >
                            Update
                        </span>
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
            <div>
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
                <br />
                <br />
                <div className="w-75 mx-auto text-center">
                    <h1>My Events</h1>
                    <Table striped bordered hover id="events-table">
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
                </div>
            </div>
        );
    }
}

export default Dashboard;
