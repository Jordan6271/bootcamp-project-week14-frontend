import React from "react";
import Add from "../Add/Add";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            currentEvent: undefined,
        };
    }

    removeEvent(id) {
        this.props.apiClient.removeEvent(id).then(() => this.refreshList());
    }

    updateEvent(event) {
        this.setState({
            currentEvent: event,
        });
    }

    buildRows() {
        return this.state.events.map((current) => {
            return (
                <tr key={current._id}>
                    <td>{current.name}</td>
                    <td>{current.location}</td>
                    <td>{current.description}</td>
                    <td>{current.date}</td>
                    <td>{current.time}</td>
                    <td>
                        <button onClick={() => this.updateEvent(current)}>
                            Update
                        </button>
                        <button onClick={() => this.removeEvent(current._id)}>
                            Remove
                        </button>
                    </td>
                </tr>
            );
        });
    }

    refreshList() {
        this.props.apiClient.getEvent().then((response) =>
            this.setState({
                events: response.data,
            })
        );
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>{this.buildRows()}</tbody>
                </table>
                <br />
                <br />
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
            </div>
        );
    }
}

export default Dashboard;
