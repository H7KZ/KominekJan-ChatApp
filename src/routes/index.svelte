<script lang="ts">
	import Menu from '/src/components/common/Menu.svelte';

	import {
		checkMainColor,
		getMainColor,
		getBorderColor,
	} from "/src/components/common/mainColor";

	import { onMount } from 'svelte';

	import axios from 'axios';

	let loggedUser: boolean;
	let display: boolean = false;

	let messageStatus: string = "";

	let mainColor: string;
	let borderColor: string;

	onMount(async () => {
		checkMainColor();

		mainColor = getMainColor();
		borderColor = getBorderColor();

		const token = localStorage.getItem('jwt_token');
		if (!(token == null)) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			};

			messageStatus = 'loading . . .';

			await axios
				.post('https://api-chatapp-pva.herokuapp.com/auth/isloggedin', {}, config)
				.then(() => {
					display = true;
					loggedUser = true;
					messageStatus = '';
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
</script>

<div class="min-h-screen h-full w-full flex justify-center items-center" style="--theme-mainColor: {mainColor}; --theme-borderColor: {borderColor}">
	<div
		class="w-full flex flex-col gap-10 font-ms font-semibold text-xl text-grayWhite text-center sm:text-2xl"
	>
		<h1 class="mainColor text-2xl sm:text-4xl">
			The best chat room ever<br />
			<span class="font-bold italic text-grayWhite">(no cap).</span>
		</h1>
		{#if loggedUser && display}
			<a href="/chatroom">
				<button
					class="border-2 borderColor font-semibold px-10 py-2 rounded-md transition-colors ease-out duration-150 hoverButtonColor"
				>
					go to ChatRoom
				</button>
			</a>
		{:else if !loggedUser && display}
			<Menu />
		{/if}
		<p class="text-base text-[#ff6565] sm:text-lg">{messageStatus}</p>
	</div>
</div>

<style scoped>
	.mainColor {
		color: var(--theme-mainColor);
	}

	.borderColor {
		border-color: var(--theme-borderColor);
	}

	.hoverButtonColor:hover {
		color: var(--theme-mainColor);
	}
</style>