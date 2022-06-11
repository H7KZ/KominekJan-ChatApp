import axios from "axios";

import { apiURL } from "/src/lib/functions/api";

import signupSchema from "/src/lib/functions/joiSchemas/signup";

export async function signUpUser(
	email: string,
	display_name: string,
	password: string,
	confirmPassword: string
): Promise<string> {
	let messageStatus: string = "";

	try {
		await signupSchema.validateAsync(
			{
				email: email,
				display_name: display_name,
				password: password,
				confirmPassword: confirmPassword,
			},
			{
				allowUnknown: true,
			}
		);
	} catch (error) {
		messageStatus = error;
		return messageStatus;
	}

	await axios
		.post(`${apiURL}/auth/signup`, {
			email: email,
			password: password,
			display_name: display_name,
		})
		.then(() => {
			messageStatus = "";
			location.replace("https://chat.kominekjan.cz/verify/pending");
		})
		.catch(
			(err: {
				response: { data: { error: { message: any } } };
				request: any;
			}) => {
				if (err.response) {
					messageStatus = err.response.data.error.message;
				}
			}
		);

	return messageStatus;
}
