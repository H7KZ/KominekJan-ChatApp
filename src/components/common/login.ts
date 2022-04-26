import axios from "axios";

import loginSchema from '../../components/joiSchemas/login';

export async function logInUser(email: string, password: string) {
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
		.post("https://api-chatapp-pva.herokuapp.com/auth/login", {
			email: value.email,
			password: value.password,
		})
		.then((res) => {
			localStorage.setItem("jwt_token", res.data.success.access_token);
			location.replace("/account/profile");
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