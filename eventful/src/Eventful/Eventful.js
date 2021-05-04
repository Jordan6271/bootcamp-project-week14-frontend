import React from "react";
import { ApiClient } from "./ApiClient/ApiClient";

class Eventful extends React.Component {
	constructor(props) {
		super(props);
		this.apiClient = new ApiClient();
	}

	render() {
		return (
			<div>
				<p>Eventful!</p>
			</div>
		);
	}
}

export default Eventful;
