import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

const Add = (props) => {
    const [disabled, setDisabled] = useState(false);

    const cancelUpdate = () => {
        document.getElementById(`add-event-form`).reset();
        props.refreshList();
        props.history.push(`/`);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setDisabled(true);
        let result;
        if (props.currentEvent) {
            result = props.apiClient.updateEvent(
                props.currentEvent._id,
                event.target.eventName.value,
                event.target.eventLocation.value,
                event.target.eventDescription.value,
                event.target.eventDate.value,
                event.target.eventTime.value
            );
        } else {
            result = props.apiClient.addEvent(
                event.target.eventName.value,
                event.target.eventLocation.value,
                event.target.eventDescription.value,
                event.target.eventDate.value,
                event.target.eventTime.value
            );
        }
        result
            .then(() => {
                setDisabled(false);
                document.getElementById(`add-event-form`).reset();
                props.refreshList();
                props.history.push(`/`);
            })
            .catch(() => {
                alert(`An error occurred, please try again.`);
                setDisabled(false);
            });
    };

    return (
        <div>
            <Form
                className="w-25 mx-auto text-center pt-4"
                id="add-event-form"
                onSubmit={(event) => submitHandler(event)}
            >
                <h1>{props.currentEvent ? "Update event" : "Add new event"}</h1>
                <Form.Group controlId="eventName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter event name"
                        className="mb-3"
                        defaultValue={props.currentEvent?.name}
                        name="eventName"
                        disabled={disabled}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="eventLocation">
                    <Form.Label>Location:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter event location"
                        className="mb-3"
                        defaultValue={props.currentEvent?.location}
                        name="eventLocation"
                        disabled={disabled}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="eventDescription">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter event description"
                        className="mb-3"
                        defaultValue={props.currentEvent?.description}
                        name="eventDescription"
                        disabled={disabled}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="eventDate">
                    <Form.Label>Date:</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Enter event date"
                        className="mb-3"
                        defaultValue={props.currentEvent?.date}
                        name="eventDate"
                        disabled={disabled}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="eventTime">
                    <Form.Label>Time:</Form.Label>
                    <Form.Control
                        type="time"
                        placeholder="Enter event time"
                        className="mb-3"
                        defaultValue={props.currentEvent?.time}
                        name="eventTime"
                        disabled={disabled}
                        required
                    />
                </Form.Group>
                <Button
                    variant="success"
                    type="submit"
                    className="mx-2"
                    disabled={disabled}
                >
                    Submit
                </Button>
                <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => cancelUpdate()}
                    disabled={disabled}
                >
                    Cancel
                </Button>
            </Form>
        </div>
    );
};

export default withRouter(Add);
