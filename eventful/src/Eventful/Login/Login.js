import React from "react";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
		};
	}

	submitHandler(event) {
		console.log(`Submit`);
	}

	render() {
		return (
			<div>
				Login
				<br />
				<form onSubmit={(event) => this.submitHandler(event)}>
					Username:
					<br />
					<input
						type="text"
						name="username"
						disabled={this.state.disabled}
					/>
					<br />
					Password:
					<br />
					<input
						type="password"
						name="password"
						disabled={this.state.disabled}
					/>
					<br />
					<br />
					<button type="submit" disabled={this.state.disabled}>
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default Login;
