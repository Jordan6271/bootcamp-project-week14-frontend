import React from "react";

class Add extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
		};
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
				{this.props.currentEvent ? "Update" : "Add"}
				<br />
				<form
					onSubmit={(event) => this.submitHandler(event)}
					id="add-event-form"
				>
					Name: <br />
					<input
						type="text"
						defaultValue={this.props.currentEvent?.name}
						name="eventName"
						disabled={this.state.disabled}
					/>
					<br />
					Location: <br />
					<input
						type="text"
						defaultValue={this.props.currentEvent?.location}
						name="eventLocation"
						disabled={this.state.disabled}
					/>
					<br />
					Description: <br />
					<input
						type="text"
						defaultValue={this.props.currentEvent?.description}
						name="eventDescription"
						disabled={this.state.disabled}
					/>
					<br />
					Date: <br />
					<input
						type="text"
						defaultValue={this.props.currentEvent?.date}
						name="eventDate"
						disabled={this.state.disabled}
					/>
					<br />
					Time: <br />
					<input
						type="text"
						defaultValue={this.props.currentEvent?.time}
						name="eventTime"
						disabled={this.state.disabled}
					/>
					<br />
					<button type="submit" disabled={this.state.disabled}>
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default Add;
