<script lang="ts">
	import Menu from '/src/components/common/Menu.svelte';
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

			message = 'loading . . .';

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
</script>

<div class="min-h-screen h-full w-full flex justify-center items-center">
	<div
		class="w-full flex flex-col gap-10 font-ms font-semibold text-xl text-grayWhite text-center sm:text-2xl"
	>
		<h1 class="text-[#cbff6a] text-2xl sm:text-4xl">
			The best chat room ever<br />
			<span class="font-bold italic text-grayWhite">(no cap).</span>
		</h1>
		{#if loggedUser && display}
			<a href="/chatroom">
				<button
					class="border-2 border-[#cbff6a] font-semibold px-10 py-2 rounded-md transition-colors ease-out duration-150 hover:text-[#c2ff4f]"
				>
					go to ChatRoom
				</button>
			</a>
		{:else if !loggedUser && display}
			<Menu />
		{/if}
		<p class="text-base text-[#ff6565] sm:text-lg">{message}</p>
	</div>
</div>
