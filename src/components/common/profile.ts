import axios from "axios";

import { setNewMainColor } from "./mainColor";

export async function saveProfileChanges(
	newPFP: string,
	newMainColor: string,
	newDisplayName: string
) {
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

	const token = localStorage.getItem("jwt_token");
	if (!(token == null)) {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		setNewMainColor(newMainColor);

		await axios
			.post(
				"https://api-chatapp-pva.herokuapp.com/profile/changeUserData",
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
				} else if (err.request) {
					console.log(err.request);
				}
			});
	}

	return messageStatus;
}

export async function getLoggedInUserData() {
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

	const token = localStorage.getItem("jwt_token");
	if (!(token == null)) {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		await axios
			.post("https://api-chatapp-pva.herokuapp.com/auth/isloggedin", {}, config)
			.then(async () => {
				display = true;
				loggedUser = true;
				messageStatus = "";
				await axios
					.post(
						"https://api-chatapp-pva.herokuapp.com/profile/userData",
						{},
						config
					)
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
						} else if (err.request) {
							console.log(err.request);
						}
					});
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
		userDataLoaded,
		userData,
		messageStatus,
	};
}
