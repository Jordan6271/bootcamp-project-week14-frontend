import React from "react";

class Add extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
		};
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
					<input
						type="text"
						defaultValue={this.props.currentEvent?.location}
						name="eventLocation"
						disabled={this.state.disabled}
					/>
					<br />
					<input
						type="text"
						defaultValue={this.props.currentEvent?.description}
						name="eventDescription"
						disabled={this.state.disabled}
					/>
					<br />
					<input
						type="text"
						defaultValue={this.props.currentEvent?.date}
						name="eventDate"
						disabled={this.state.disabled}
					/>
					<br />
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
