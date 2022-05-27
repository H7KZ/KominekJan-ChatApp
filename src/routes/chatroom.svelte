<script lang="ts">
	//IMPORTS

	import { onMount } from "svelte";

	import {
		isUserLoggedInCR,
		chatRoomsList,
	} from "/src/components/common/chatroom";

	import {
		getMainColor,
		checkMainColor,
	} from "/src/components/common/mainColor";

	import { io } from "socket.io-client";

	import axios from "axios";

	import Menu from "/src/components/common/Menu.svelte";

	import MessageBody from "/src/components/common/MessageBody.svelte";

	//VARIABLES

	let user: any = {
		loggedUser: null,
		display: null,
		messageStatus: "loading . . .",
		statusColor: "",
	};

	const wait = (timeToDelay: number) =>
		new Promise((resolve) => setTimeout(resolve, timeToDelay));

	const socket = io("https://api-chatapp-pva.herokuapp.com/");

	let messages = [];

	let canSend: boolean = true;

	let sidebar: boolean;

	let rooms = chatRoomsList;

	let activeRoom = rooms[0];

	let messagesContainer: Element;

	let mainColor: string = "";

	//ON MOUNT

	onMount(async () => {
		await checkMainColor();

		mainColor = await getMainColor();

		//GET LOGGED USER
		user = await isUserLoggedInCR();

		socket.on("messages", async (messagesList) => {
			messages = messagesList;
			messages.reverse();
			await wait(200);
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		});

		socket.on("messageError", (error) => {
			user.messageStatus = error;
			user.statusColor = "text-[#ff5b5b]";
		});

		//SIDEBAR CHATROOM
		sidebar = window.innerWidth < 768 ? false : true;

		window.addEventListener("resize", () => {
			if (window.innerWidth < 768) {
				sidebar = false;
			} else {
				sidebar = true;
			}
		});

		//MESSAGES CONTAINER SCROLL TO BOTTOM
		while (messagesContainer.scrollTop != messagesContainer.scrollHeight) {
			await wait(1000);
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
			break;
		}
	});

	//FUNCTIONS

	let messageText: string;

	async function sendMessage(e: Event): Promise<void> {
		e.preventDefault();

		//VALIDATE MESSAGE

		if (
			messageText.trim() == "" ||
			messageText == null ||
			messageText == undefined
		) {
			user.messageStatus = "⛔ You can't send an empty message";
			user.statusColor = "text-[#ff5b5b]";
			return;
		}

		if (messageText.length > 500) {
			user.messageStatus =
				"⛔ You can't send a message longer than 500 characters. You are over " +
				(messageText.length - 500) +
				" characters";
			user.statusColor = "text-[#ff5b5b]";
			return;
		}

		//IS READY TO SEND
		if (canSend) {
			user.messageStatus = "🚸 Sending . . .";
			user.statusColor = "text-[#f5c842]";

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
							message: messageText,
							room_id: activeRoom.id,
						},
						config
					)
					.then(async () => {
						messageText = "";
						user.messageStatus = "✔️ Message sent!";
						user.statusColor = "text-[#c6ff5b]";
						timeout();
					})
					.catch(async (err) => {
						user.messageStatus = "⛔ " + err.response.data.error.message;
						user.statusColor = "text-[#ff6565]";
						await wait(8000);
						user.messageStatus = "👍 You can send another message";
					});
			}
		} else {
			user.messageStatus = "⛔ You can't send another message! Wait 10s!";
			user.statusColor = "text-[#ff6565]";
		}
	}

	async function timeout(): Promise<void> {
		canSend = false;
		user.messageStatus = "⛔ Wait 5s before sending another message";
		user.statusColor = "text-[#ff6565]";
		await wait(5000);
		canSend = true;
		user.messageStatus = "👍 You can send another message";
		user.statusColor = "text-[#c6ff5b]";
	}

	async function switchRooms(room: {
		name: string;
		id: number;
	}): Promise<void> {
		activeRoom = room;
		socket.emit("switchRoom", activeRoom.id.toString());
		await wait(500);
		messagesContainer.scrollTop = messagesContainer.scrollHeight;
	}
</script>

<!--HTML-->
<div
	class="min-h-screen h-screen w-screen flex justify-center items-center pt-20 pb-4"
	style="--theme-mainColor: {mainColor};"
>
	{#if user.loggedUser && user.display}
		<!--MESSAGES-->
		<div class="h-full w-full flex font-ms">
			<!--SIDEBAR OF ROOMS-->
			{#if sidebar}
				<div class="h-full w-60 bg-[#222222] flex-shrink-0 z-20">
					<div class="flex flex-col items-start gap-2 py-2 px-4">
						<h2 class="mainColor text-xl font-bold">Rooms:</h2>
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
			<div class="h-full w-full flex flex-col gap-4">
				<!--CHATROOM HEADER-->
				<div
					class="flex items-center gap-2 pl-2 h-12 bg-[#222222] text-grayWhite flex-shrink-0"
				>
					<div
						class="dropdown z-30 {sidebar ? 'hidden' : 'block'} cursor-pointer"
					>
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								style="fill: {mainColor};"
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
				<div class="h-full w-full overflow-y-hidden px-1 md:px-4">
					<div
						class="h-full w-full overflow-y-scroll scroll-smooth custom-scrollbar"
						bind:this={messagesContainer}
					>
						<!--DISPLAYING MESSAGES-->
						{#each messages as message}
							<MessageBody {message} nameColor={mainColor} />
						{/each}
					</div>
				</div>

				<!--SEND MESSAGE-->
				<div class="flex flex-col gap-1 px-1 md:px-4">
					<div class="h-20 flex items-start gap-2">
						<textarea
							name="messageBox"
							class="resize-none h-full w-full bg-[#222222] border-2 borderColor text-sm md:text-base rounded-md outline-none px-2 py-1 text-grayWhite"
							placeholder="Type your message..."
							bind:value={messageText}
						/>
						<!-- svelte-ignore missing-declaration -->
						<button
							class="h-full border-2 borderColor rounded-md w-20 flex items-center justify-center"
							on:click={() => sendMessage(event)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="h-12 transition-colors ease-out duration-150 fillIconColor"
								><path
									d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"
								/></svg
							>
						</button>
					</div>
					<p class="text-xs {user.statusColor} md:text-sm">
						{user.messageStatus}
					</p>
				</div>
			</div>
		</div>
	{:else if !user.loggedUser && user.display}
		<!--YOU ARE NOT LOGGED IN-->
		<div
			class="flex flex-col gap-10 items-center text-grayWhite text-xl font-semibold sm:text-2xl"
		>
			<h2 class="font-ms text-2xl">
				You need to be logged in to chat! u moron
			</h2>
			<Menu />
			<p class="text-base text-[#ff6565] sm:text-lg">{user.messageStatus}</p>
		</div>
	{/if}
</div>

<!--STYLES-->
<style scoped>
	.custom-scrollbar {
		scrollbar-width: none;
		scrollbar-color: var(--theme-mainColor);
	}
	/* Chrome, Edge, and Safari */
	.custom-scrollbar::-webkit-scrollbar {
		width: 8px;
		background-color: #222222;
		border-radius: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background-color: var(--theme-mainColor);
		border-radius: 4px;
	}

	.dropdown:hover .dropdown-content {
		display: flex;
	}

	.mainColor {
		color: var(--theme-mainColor);
	}

	.borderColor {
		border-color: var(--theme-mainColor);
	}

	.hoverButtonColor:hover {
		color: var(--theme-mainColor);
	}

	.fillIconColor {
		fill: #fff;
	}

	.fillIconColor:hover {
		fill: var(--theme-mainColor);
	}
</style>
