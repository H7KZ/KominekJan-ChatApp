import axios from "axios";

import { apiURL } from "./api/api";

export async function isUserLoggedIn() {
	let messageStatus: string = "";
	let display: boolean = false;
	let loggedUser: boolean = false;
	const token = localStorage.getItem("jwt_token");
	if (!(token == null)) {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		await axios
			.post(`${apiURL}/auth/isloggedin`, {}, config)
			.then(() => {
				display = true;
				loggedUser = true;
				messageStatus = "";
			})
			.catch((err) => {
				display = true;
				loggedUser = false;
				if (err.response) {
					messageStatus = err.response.data.error.message;
				} else if (err.request) {
					console.log(err.request);
				}
			});
	} else {
		display = true;
		loggedUser = false;
	}

	return {
		display,
		loggedUser,
		messageStatus,
	};
}
