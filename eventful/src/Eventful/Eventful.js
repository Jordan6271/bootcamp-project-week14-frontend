import React from "react";
import { ApiClient } from "./ApiClient/ApiClient";
import Dashboard from "./Dashboard/Dashboard";

const Eventful = () => {
	const apiClient = new ApiClient();

	return (
		<div>
			<p>Eventful!</p>
			<Dashboard apiClient={apiClient} />
		</div>
	);
};

export default Eventful;
