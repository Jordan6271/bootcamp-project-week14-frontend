import axios from "axios";
const url = "http://localhost:3001/";

export class ApiClient {
	fetchApi(method, url, data) {
		return axios({
			method,
			url,
			data,
		}).catch((error) => {
			throw error;
		});
	}

	getEvents() {
		return this.fetchApi(`get`, url);
	}

	addEvent(name, location, description, date, time) {
		return this.fetchApi(`post`, url, {
			name,
			location,
			description,
			date,
			time,
		});
	}

	removeEvent(id) {
		return this.fetchApi(`delete`, `${url}${id}`);
	}

	updateEvent(id, name, location, description, date, time) {
		return this.fetchApi(`put`, `${url}${id}`, {
			name,
			location,
			description,
			date,
			time,
		});
	}
}
