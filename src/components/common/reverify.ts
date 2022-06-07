import axios from "axios";

import { apiURL } from "./api/api";

import loginSchema from "../../components/joiSchemas/login";

export async function reverifyUser(email: string, password: string) {
	let messageStatus: string = "";

	let value: any;

	try {
		value = await loginSchema.validateAsync({
			email: email,
			password: password,
		});
	} catch (error) {
		messageStatus = error;
		return messageStatus;
	}

	messageStatus = "loading . . .";

	await axios
		.post(`${apiURL}/auth/verify/resend`, {
			email: value.email,
			password: value.password,
		})
		.then(() => {
			location.replace(
				"https://chat.kominekjan.cz/verify/reverify"
			);
		})
		.catch((err) => {
			if (err.response) {
				messageStatus = err.response.data.error.message;
			} else if (err.request) {
				console.log(err.request);
			}
		});

	return messageStatus;
}
