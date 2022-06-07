import axios from "axios";

import { apiURL } from "./api/api";

export const chatRoomsList = [
	{
		name: "General 🏝️",
		id: 0,
	},
	{
		name: "Programming 💻",
		id: 1,
	},
	{
		name: "Gaming 🎮",
		id: 2,
	},
	{
		name: "Music 🎵",
		id: 3,
	},
	{
		name: "Sports 🏀",
		id: 4,
	},
];

export function getUserPFP(pfp: string): string {
	if (pfp == null || pfp == undefined || pfp == "") {
		return "default_pfp.png";
	} else {
		return pfp;
	}
}

export async function isUserLoggedInCR() {
	let messageStatus: string = "";
	let statusColor: string = "";

	let display: boolean = false;
	let loggedUser: boolean = false;

	const token = localStorage.getItem("jwt_token");
	if (!(token == null)) {
		const config = {
			headers: {
				authorization: `Bearer ${token}`,
			},
		};
		statusColor = "text-[#f5c842]";

		await axios
			.post(`${apiURL}/auth/isloggedin`, {}, config)
			.then(() => {
				display = true;
				loggedUser = true;
				messageStatus = "👍 You can send a message";
				statusColor = "text-[#c6ff5b]";
			})
			.catch((err) => {
				display = true;
				loggedUser = false;
				if (err.response) {
					messageStatus = err.response.data.error.message;
					statusColor = "text-[#ff5b5b]";
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
		statusColor,
	};
}
