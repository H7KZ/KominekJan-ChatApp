<script lang="ts">
	import Menu from "/src/components/common/Menu.svelte";

	import { onMount } from "svelte";

	import axios from "axios";

	let loggedUser: boolean;
	let display: boolean = false;
	let message: string = "";

	onMount(async () => {
		const token = localStorage.getItem("jwt_token");
		if (!(token == null)) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			message = "loading . . .";

			await axios
				.post(
					"https://api-chatapp-pva.herokuapp.com/auth/isloggedin",
					{},
					config
				)
				.then(() => {
					display = true;
					loggedUser = true;
					message = "";
				})
				.catch((err) => {
					display = true;
					loggedUser = false;
					if (err.response) {
						message = err.response.data.error.message;
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
</script>

<div class="min-h-screen h-full w-full flex justify-center items-center">
	{#if loggedUser && display}
		<div class="w-full flex flex-col items-center font-ms text-2xl text-grayWhite text-center sm:text-4xl">
			<div class="font-bold text-[#cbff6a]">
				<h1>Your profile:</h1>
			</div>
			<div
				class="w-full flex flex-col items-center gap-4 text-xl text-grayWhite text-center font-semibold sm:text-2xl"
			>
				<h3 class="">Log out here:</h3>
				<!-- svelte-ignore missing-declaration -->
				<button
					class="border-2 border-[#cbff6a] px-10 py-2 rounded-md text-sm sm:text-base"
					on:click={() => logout(event)}
				>
					Logout
				</button>
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
			<p class="text-base text-[#ff6565] sm:text-lg">{message}</p>
		</div>
	{/if}
</div>
