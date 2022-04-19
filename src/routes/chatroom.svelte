<script lang="ts">
	//IMPORTS
	import Menu from "/src/components/common/Menu.svelte";

	import { io } from "socket.io-client";

	import axios from "axios";

	import { onMount } from "svelte";

	//VARIABLES

	const wait = (timeToDelay: number) =>
		new Promise((resolve) => setTimeout(resolve, timeToDelay));

	const socket = io("https://api-chatapp-pva.herokuapp.com/");

	let messages = [];

	let canSend: boolean = true;

	let loggedUser: boolean;
	let display: boolean = false;

	let sidebar: boolean;

	let fillColor: String = "#C1C8D8";

	let rooms = [
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
		}
	];

	let activeRoom = rooms[0];

	let messagesContainer: Element;

	let messageStatus: string = "";
	let statusColor: string = "";

	//ON MOUNT

	onMount(async () => {
		//GET LOGGED USER
		const token = localStorage.getItem("jwt_token");
		if (!(token == null)) {
			const config = {
				headers: {
					authorization: `Bearer ${token}`,
				},
			};

			messageStatus = "loading . . .";
			statusColor = "text-[#f5c842]";

			await axios
				.post("https://api-chatapp-pva.herokuapp.com/auth/isloggedin", {}, config)
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

		socket.on("messages", (messagesList) => {
			messages = messagesList;
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		});

		socket.on("messageError", (error) => {
			messageStatus = error;
			statusColor = "text-[#ff5b5b]";
		});

		//SIDEBAR CHATROOM
		sidebar = window.innerWidth < 768 ? false : true;

		//WHEN WINDOW RESIZES
		window.addEventListener("resize", () => {
			if (window.innerWidth < 768) {
				sidebar = false;
			} else {
				sidebar = true;
			}
		});

		while (messagesContainer.scrollTop != messagesContainer.scrollHeight) {
			await wait(1000);
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
			break;
		}
	});

	//FUNCTIONS

	let messageBox: string;

	async function sendMessage(e: Event) {
		e.preventDefault();

		//VALIDATE MESSAGE

		if (messageBox.trim() == "" || messageBox == null || messageBox == undefined) {
			messageStatus = "⛔ You can't send an empty message";
			statusColor = "text-[#ff5b5b]";
			return;
		}

		if (messageBox.length > 500) {
			messageStatus = "⛔ You can't send a message longer than 500 characters. You are over " + (messageBox.length - 500) + " characters";
			statusColor = "text-[#ff5b5b]";
			return;
		}

		//IS READY TO SEND
		if (canSend) {
			messageStatus = "🚸 Sending . . .";
			statusColor = "text-[#f5c842]";

			const token = localStorage.getItem("jwt_token");
			if (!(token == null)) {
				const config = {
					headers: {
						authorization: `Bearer ${token}`,
					},
				};

				await axios
					.post(
						"https://api-chatapp-pva.herokuapp.com/message/send",
						{
							message: messageBox,
							room_id: activeRoom.id,
						},
						config
					)
					.then(async () => {
						messageBox = "";
						messageStatus = "✔️ Message sent!";
						statusColor = "text-[#c6ff5b]";
						timeout();
					})
					.catch(async (err) => {
						messageStatus = "⛔ " + err.response.data.error.message;
						statusColor = "text-[#ff6565]";
						await wait(8000);
						messageStatus = "👍 You can send another message";
					});
			}
		} else {
			messageStatus = "⛔ You can't send another message! Wait 10s!";
			statusColor = "text-[#ff6565]";
		}
	}

	async function timeout() {
		canSend = false;
		messageStatus = "⛔ Wait 5s before sending another message";
		statusColor = "text-[#ff6565]";
		await wait(5000);
		canSend = true;
		messageStatus = "👍 You can send another message";
		statusColor = "text-[#c6ff5b]";
	}

	async function switchRooms(room: { name: string; id: number; }) {
		activeRoom = room;
		socket.emit("switchRoom", activeRoom.id.toString());
		await wait(500);
		messagesContainer.scrollTop = messagesContainer.scrollHeight;
	}

	function getPFP(pfp: string) {
		if (pfp == null || pfp == undefined || pfp == "") {
			return "default_pfp.png";
		} else {
			return pfp;
		}
	}
</script>

<!--HTML-->
<div class="min-h-screen h-screen w-full flex justify-center items-center">
	{#if loggedUser && display}
		<!--MESSAGES-->
		<div
			class="h-3/4 w-full flex justify-center items-center font-ms px-4 overflow-x-hidden sm:px-16"
		>
			<!--SIDEBAR OF ROOMS-->
			{#if sidebar}
				<div class="h-full w-60 bg-[#222222] flex-shrink-0 z-20">
					<div class="flex flex-col items-start gap-2 py-2 px-4">
						<h2 class="text-[#c6ff5be7] text-xl font-bold">Rooms:</h2>
						{#each rooms as room}
							<button
								class="text-grayWhite h-full w-full text-left bg-[#444444] rounded-lg pl-2"
								on:click={() => switchRooms(room)}
							>
								<span class="italic">#</span>
								{room.name}
							</button>
						{/each}
					</div>
				</div>
			{/if}

			<!--CHATROOM-->
			<div
				class="h-full w-full max-w-6xl flex flex-col gap-4 justify-between items-center md:w-4/5"
			>
				<!--CHATROOM HEADER-->
				<div
					class="w-full flex items-center gap-2 pl-2 h-12 bg-[#222222] text-grayWhite flex-shrink-0"
				>
					<div
						class="dropdown z-30 {sidebar ? 'hidden' : 'block'} cursor-pointer"
					>
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								style="fill: {fillColor};"
								class="h-8"
								><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" /></svg
							>
						</div>
						<div
							class="hidden absolute w-60 flex-col gap-4 py-2 px-3 bg-[#383838] dropdown-content"
						>
							{#each rooms as room}
								<button
									class="text-grayWhite h-full w-full text-left bg-[#444444] rounded-lg pl-2"
									on:click={() => switchRooms(room)}
								>
									<span class="italic">#</span>
									{room.name}
								</button>
							{/each}
						</div>
					</div>
					<h2>
						<span class="italic">#</span>
						{activeRoom.name}
					</h2>
				</div>
				<!--DISPLAY MESSAGES-->
				<div
					class="w-full h-full overflow-y-scroll overflow-x-clip scroll-smooth custom-scrollbar md:pl-4"
					bind:this={messagesContainer}
				>
					<!--DISPLAYING MESSAGES-->
					{#each messages as message}
						<div class="flex gap-2 text-grayWhite mt-3 w-full">
							<div class="flex-shrink-0 w-12">
								<div class="relative w-full h-10 sm:h-12">
									<img
										src={getPFP(message.user.photoURL)}
										alt="PFP"
										class="rounded-full w-10 h-10 origin-center object-cover sm:w-12 sm:h-12"
									/>
									<img
										src={message.badge}
										alt=""
										class="{message.badge
											? ''
											: 'hidden'} absolute bottom-0 right-0 h-5 w-5"
									/>
								</div>
							</div>

							<div class="flex flex-col w-full">
								<div class="w-5/6">
									<h2 class="text-sm text-[#c6ff5be7] sm:text-base m-0">
										{message.user.display_name}
										&nbsp;&nbsp;&nbsp;
										<span class="text-xs text-[#9e9e9e]">
											{new Date(message.createdAt).toLocaleString()}
										</span>
									</h2>
								</div>
								<p class="text-[#f0f0f0] text-xs break-words w-5/6 sm:text-sm">
									{message.text}
								</p>
							</div>
						</div>
					{/each}
				</div>
				<!--SEND MESSAGE-->
				<div class="w-full flex flex-col gap-1 md:pl-4">
					<div class="w-full h-20 flex items-start gap-2">
						<textarea
							name="messageBox"
							class="resize-none w-full h-full bg-[#222222] border-2 border-[#b9ec5a] text-sm md:text-base rounded-md outline-none px-2 py-1 text-grayWhite"
							placeholder="Type your message..."
							bind:value={messageBox}
						/>
						<!-- svelte-ignore missing-declaration -->
						<button
							class="h-full border-2 border-[#c6ff5be7] rounded-md w-20 flex items-center justify-center"
							on:click={() => sendMessage(event)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								style="fill: #fff;"
								class="h-12"
								><path
									d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"
								/></svg
							>
						</button>
					</div>
					<p
						class="text-xs {statusColor} md:text-sm"
					>
						{messageStatus}
					</p>
				</div>
			</div>
		</div>
	{:else if !loggedUser && display}
		<!--YOU ARE NOT LOGGED IN-->
		<div
			class="flex flex-col gap-10 items-center text-grayWhite text-xl font-semibold sm:text-2xl"
		>
			<h2 class="font-ms text-2xl">
				You need to be logged in to chat! u moron
			</h2>
			<Menu />
			<p class="text-base text-[#ff6565] sm:text-lg">{messageStatus}</p>
		</div>
	{/if}
</div>

<!--STYLES-->
<style scoped>
	.custom-scrollbar {
		scrollbar-width: none;
		scrollbar-color: #c6ff5b;
	}
	/* Chrome, Edge, and Safari */
	.custom-scrollbar::-webkit-scrollbar {
		width: 8px;
		background-color: #222222;
		border-radius: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background-color: #c6ff5b;
		border-radius: 4px;
	}

	.dropdown:hover .dropdown-content {
		display: flex;
	}
</style>
