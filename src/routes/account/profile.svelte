<script lang="ts">
	import { onMount } from 'svelte';

	import axios from 'axios';

	let loggedUser: boolean;
	let display: boolean = false;
	let message: string = '';

	onMount(async () => {
		const token = localStorage.getItem('jwt_token');
		if (!(token == null)) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			};
			await axios
				.post('https://api-chatapp-pva.herokuapp.com/auth/isloggedin', {}, config)
				.then(() => {
					display = true;
					loggedUser = true;
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

		localStorage.removeItem('jwt_token');
		location.reload();
	}
</script>

<div class="min-h-screen h-full w-full flex justify-center pt-52">
	{#if loggedUser && display}
		<div
			class="w-full flex flex-col items-center gap-12 font-ms font-semibold text-2xl text-grayWhite text-center sm:text-4xl"
		>
			<h1 class="font-bold text-[#cbff6a]">Log out here:</h1>
			<!-- svelte-ignore missing-declaration -->
			<button
				class="border-2 border-[#cbff6a] px-10 py-2 rounded-md"
				on:click={() => logout(event)}
			>
				Logout
			</button>
		</div>
	{:else if !loggedUser && display}
		<div class="flex flex-col gap-10 items-center text-grayWhite text-xl font-semibold sm:text-2xl">
			<h2 class="font-ms text-2xl">You need to be logged in to see your account!</h2>
			<a href="/login">
				<button
					class="border-2 border-[#cbff6a] font-semibold px-10 py-2 rounded-md transition-colors ease-out duration-150 hover:text-[#c2ff4f]"
				>
					Log in here
				</button>
			</a>
			<a href="/signup">
				<button
					class="border-2 border-[#cbff6a] font-semibold px-10 py-2 rounded-md transition-colors ease-out duration-150 hover:text-[#c2ff4f]"
				>
					Sign up here
				</button>
			</a>
			<p class="text-base text-[#ff6565] sm:text-lg">{message}</p>
		</div>
	{/if}
</div>
