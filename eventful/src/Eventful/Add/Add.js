import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
        };
    }

    cancelUpdate() {
        document.getElementById(`add-event-form`).reset();
        this.props.refreshList();
    }

    submitHandler(event) {
        event.preventDefault();
        this.setState({ disabled: true });
        let result;
        if (this.props.currentEvent) {
            result = this.props.apiClient.updateEvent(
                this.props.currentEvent._id,
                event.target.eventName.value,
                event.target.eventLocation.value,
                event.target.eventDescription.value,
                event.target.eventDate.value,
                event.target.eventTime.value
            );
        } else {
            result = this.props.apiClient.addEvent(
                event.target.eventName.value,
                event.target.eventLocation.value,
                event.target.eventDescription.value,
                event.target.eventDate.value,
                event.target.eventTime.value
            );
        }
        result
            .then(() => {
                this.setState({ disabled: false });
                document.getElementById(`add-event-form`).reset();
                this.props.refreshList();
                this.props.history.push(`/`);
            })
            .catch(() => {
                console.log(`Catch error!`);
                alert(`An error occurred, please try again.`);
                this.setState({ disabled: false });
            });
    }

    render() {
        return (
            <div>
                <Form
                    className="w-25 mx-auto text-center"
                    id="add-event-form"
                    onSubmit={(event) => this.submitHandler(event)}
                >
                    <h1>
                        {this.props.currentEvent
                            ? "Update event"
                            : "Add new event"}
                    </h1>
                    <Form.Group controlId="eventName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event name"
                            defaultValue={this.props.currentEvent?.name}
                            name="eventName"
                            disabled={this.state.disabled}
                        />
                    </Form.Group>
                    <Form.Group controlId="eventLocation">
                        <Form.Label>Location:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event location"
                            defaultValue={this.props.currentEvent?.location}
                            name="eventLocation"
                            disabled={this.state.disabled}
                        />
                    </Form.Group>
                    <Form.Group controlId="eventDescription">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event description"
                            defaultValue={this.props.currentEvent?.description}
                            name="eventDescription"
                            disabled={this.state.disabled}
                        />
                    </Form.Group>
                    <Form.Group controlId="eventDate">
                        <Form.Label>Date:</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter event date"
                            defaultValue={this.props.currentEvent?.date}
                            name="eventDate"
                            disabled={this.state.disabled}
                        />
                    </Form.Group>
                    <Form.Group controlId="eventTime">
                        <Form.Label>Time:</Form.Label>
                        <Form.Control
                            type="time"
                            placeholder="Enter event time"
                            defaultValue={this.props.currentEvent?.time}
                            name="eventTime"
                            disabled={this.state.disabled}
                        />
                    </Form.Group>
                    <Button
                        variant="success"
                        type="submit"
                        disabled={this.state.disabled}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => this.cancelUpdate()}
                        disabled={this.state.disabled}
                    >
                        Cancel
                    </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(Add);
