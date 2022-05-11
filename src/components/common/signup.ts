import axios from "axios";

import signupSchema from "../joiSchemas/login";

export async function signUpUser(
	email: string,
	password: string,
	confirmPassword: string,
	display_name: string
) {
	let messageStatus: string = "";

	let value: any;

	try {
		value = await signupSchema.validateAsync({
			email: email,
			password: password,
			confirmPassword: confirmPassword,
			display_name: display_name,
		});
	} catch (error) {
		messageStatus = error;
		return messageStatus;
	}

	await axios
		.post("https://api-chatapp-pva.herokuapp.com/auth/signup", {
			email: value.email,
			password: value.password,
			display_name: value.display_name,
		})
		.then(() => {
			messageStatus = "";
			location.replace(
				"https://production.chatappkominekjan.pages.dev/verify/pending"
			);
		})
		.catch(
			(err: {
				response: { data: { error: { message: any } } };
				request: any;
			}) => {
				if (err.response) {
					messageStatus = err.response.data.error.message;
				} else if (err.request) {
					console.log(err.request);
				}
			}
		);

    return messageStatus;
}