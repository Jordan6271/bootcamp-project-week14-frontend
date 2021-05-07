import axios from "axios";
const url = "http://localhost:3001/";

export class ApiClient {
    constructor(tokenProvider, logoutHandler) {
        this.tokenProvider = tokenProvider;
        this.logoutHandler = logoutHandler;
    }

    authenticatedApiFetch(method, url, data) {
        return axios({
            method,
            url,
            headers: {
                authorization: this.tokenProvider(),
            },
            data,
        }).catch((error) => {
            if (error.response.status === 403) {
                this.logoutHandler();
                return Promise.reject();
            } else {
                throw error;
            }
        });
    }

    getEvent() {
        return this.authenticatedApiFetch(`get`, url);
    }

    addEvent(name, location, description, date, time) {
        return this.authenticatedApiFetch(`post`, url, {
            name,
            location,
            description,
            date,
            time,
        });
    }

    removeEvent(id) {
        return this.authenticatedApiFetch(`delete`, `${url}${id}`);
    }

    updateEvent(id, name, location, description, date, time) {
        return this.authenticatedApiFetch(`put`, `${url}${id}`, {
            name,
            location,
            description,
            date,
            time,
        });
    }
}
