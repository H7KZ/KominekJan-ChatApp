import axios from "axios";

import { apiURL } from "/src/lib/functions/api";

import { setNewMainColor } from "/src/lib/functions/mainColor";

export async function saveProfileChanges(
	newPFP: string,
	newMainColor: string,
	newDisplayName: string
): Promise<string> {
	let messageStatus: string = "";

	if (
		(newPFP == undefined || newPFP == "" || newPFP == null) &&
		(newDisplayName == undefined ||
			newDisplayName == "" ||
			newDisplayName == null)
	) {
		setNewMainColor(newMainColor);
		location.reload();
		return messageStatus;
	}

	const token: string = localStorage.getItem("jwt_token");
	if (!(token == null)) {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		setNewMainColor(newMainColor);

		await axios
			.post(
				`${apiURL}/profile/changeUserData`,
				{
					photoURL: newPFP,
					display_name: newDisplayName,
				},
				config
			)
			.then(() => {
				messageStatus = "Changes saved!";
				location.reload();
			})
			.catch((err) => {
				if (err.response) {
					messageStatus = err.response.data.error.message;
				}
			});
	}

	return messageStatus;
}

export async function getLoggedInUserData(): Promise<{
	display: boolean;
	loggedUser: boolean;
	userDataLoaded: boolean;
	userData: any;
	messageStatus: string;
}> {
	let messageStatus: string = "";
	let display: boolean = false;
	let loggedUser: boolean = false;
	let userDataLoaded: boolean = false;

	let userData: any = {
		display_name: "",
		email: "",
		photoURL: "",
		created: "",
	};

	const token: string = localStorage.getItem("jwt_token");
	if (!(token == null)) {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		await axios
			.post(`${apiURL}/auth/isloggedin`, {}, config)
			.then(async () => {
				display = true;
				loggedUser = true;
				messageStatus = "";
				await axios
					.post(`${apiURL}/profile/userData`, {}, config)
					.then((user) => {
						userData = user.data.user;
						if (
							userData.photoURL == "" ||
							userData.photoURL == null ||
							userData.photoURL == undefined
						) {
							userData.photoURL = "default_pfp.png";
						}
						userDataLoaded = true;
					})
					.catch((err) => {
						userDataLoaded = true;
						if (err.response) {
							messageStatus = err.response.data.error.message;
						}
					});
			})
			.catch((err) => {
				display = true;
				loggedUser = false;
				if (err.response) {
					messageStatus = err.response.data.error.message;
				}
			});
	} else {
		display = true;
		loggedUser = false;
	}

	return {
		display,
		loggedUser,
		userDataLoaded,
		userData,
		messageStatus,
	};
}
