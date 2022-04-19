<script lang="ts">
	import Menu from "/src/components/common/Menu.svelte";

	import { onMount } from "svelte";

	import axios from "axios";

	let loggedUser: boolean;
	let display: boolean = false;
	let messageStatus: string = "";

	let userDataLoaded: boolean = false;

	let newPFP: string;
	let newDisplayName: string;

	let userData: any = {
		display_name: "",
		email: "",
		photoURL: "",
	};

	onMount(async () => {
		const token = localStorage.getItem("jwt_token");
		if (!(token == null)) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			messageStatus = "loading . . .";

			await axios
				.post(
					"https://api-chatapp-pva.herokuapp.com/auth/isloggedin",
					{},
					config
				)
				.then(async () => {
					display = true;
					loggedUser = true;
					messageStatus = "";
					await axios
						.post("https://api-chatapp-pva.herokuapp.com/profile/userData", {}, config)
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
	});

	async function logout(e: Event) {
		e.preventDefault();

		localStorage.removeItem("jwt_token");
		location.reload();
	}

	async function saveChanges() {
		const token = localStorage.getItem("jwt_token");
		if (!(token == null)) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

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
	}
</script>

<div class="min-h-screen h-full w-full flex justify-center items-center">
	{#if loggedUser && display}
		<div
			class="w-4/5 flex flex-col items-center gap-8 font-ms text-2xl text-grayWhite text-center sm:text-4xl"
		>
			<div class="font-bold text-[#cbff6a]">
				<h1>Your profile:</h1>
			</div>
			<div
				class="w-full flex flex-col items-center gap-2 text-xl text-grayWhite text-center font-semibold sm:text-2xl"
			>
				<h3 class="">{userData.email}</h3>
				<h4 class="text-base text-[#c5c5c5] sm:text-lg">
					Account created at: {new Date(userData.created).toLocaleString()}
				</h4>
			</div>
			<div
				class="w-full flex flex-col items-center gap-2 text-xl text-grayWhite text-center font-semibold sm:text-2xl"
			>
				<div class="relative">
					{#if userDataLoaded}
						<!-- svelte-ignore a11y-missing-attribute -->
						<center>
							<img
								src={userData.photoURL}
								class="rounded-full w-20 h-20 origin-center object-cover sm:w-28 sm:h-28"
							/>
						</center>
					{/if}

					<div
						class="absolute top-0 left-0 flex justify-center items-center rounded-full w-20 h-20 sm:w-28 sm:h-28 origin-center bg-[#0000008c]"
					/>
				</div>
				<h3 class="">Change your profile picture</h3>
				<div
					class="flex flex-col gap-1 w-5/6 max-w-md text-lg font-medium sm:text-xl"
				>
					<input
						type="text"
						placeholder={userData.photoURL}
						class="w-full text-[#242424] outline-none rounded p-1 placeholder:text-[#969696]"
						bind:value={newPFP}
					/>
					<p class="text-sm text-[#c5c5c5] text-left sm:text-base">
						Only post links that are from imgur or discord!
					</p>
				</div>
			</div>

			<div
				class="w-full flex flex-col items-center gap-2 text-xl text-grayWhite text-center font-semibold sm:text-2xl"
			>
				<h3 class="">Change your display name</h3>
				<div class="w-5/6 max-w-md text-lg font-medium sm:text-xl">
					<input
						type="text"
						placeholder={userData.display_name}
						class="w-full text-[#242424] outline-none rounded p-1 placeholder:text-[#969696]"
						bind:value={newDisplayName}
					/>
				</div>
			</div>
			<div
				class="w-full max-w-md flex flex-col-reverse justify-between items-center gap-6 text-xl text-grayWhite text-center font-semibold sm:flex-row sm:text-2xl"
			>
				<!-- svelte-ignore missing-declaration -->
				<button
					class="border-2 border-[#cbff6a] px-10 py-2 rounded-md text-sm sm:text-base"
					on:click={() => logout(event)}
				>
					Logout
				</button>
				<button
					class="border-2 border-[#cbff6a] px-10 py-2 rounded-md text-sm sm:text-base"
					on:click={saveChanges}
				>
					Save changes
				</button>
			</div>
			<div>
				<p class="text-[#fff]">
					{messageStatus}
				</p>
			</div>
		</div>
	{:else if !loggedUser && display}
		<div
			class="flex flex-col gap-10 items-center text-grayWhite text-xl font-semibold sm:text-2xl"
		>
			<h2 class="font-ms text-2xl">
				You need to be logged in to see your account!
			</h2>
			<Menu />
			<p class="text-base text-[#ff6565] sm:text-lg">{messageStatus}</p>
		</div>
	{/if}
</div>
