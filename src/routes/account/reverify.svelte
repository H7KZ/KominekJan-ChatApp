<script lang="ts">
	import { onMount } from 'svelte';

	import axios from 'axios';

	import loginSchema from '../../components/joiSchemas/login';

	let loggedUser: boolean;
	let display: boolean = false;
	let email: string;
	let password: string;
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

	async function reverify(e: Event) {
		e.preventDefault();

		let value: any;

		try {
			value = await loginSchema.validateAsync({
				email: email,
				password: password
			});
		} catch (error) {
			message = error;
			return;
		}

		message = 'loading . . .';

		await axios
			.post('https://api-chatapp-pva.herokuapp.com/auth/verify/resend', {
				email: value.email,
				password: value.password
			})
			.then(() => {
				location.replace('https://production.chatappkominekjan.pages.dev/verify/reverify');
			})
			.catch((err) => {
				if (err.response) {
					message = err.response.data.error.message;
				} else if (err.request) {
					console.log(err.request);
				}
			});
	}
</script>

<div class="min-h-screen h-full w-full flex justify-center items-center">
	{#if loggedUser && display}
		<div class="flex flex-col gap-4 items-center">
			<h2 class="font-ms font-semibold text-xl text-grayWhite">
				You are already Logged In / Verified!
			</h2>
		</div>
	{:else if !loggedUser && display}
		<div
			class="w-full flex flex-col items-center gap-12 font-ms font-semibold text-2xl text-grayWhite text-center sm:text-4xl"
		>
			<h1 class="font-bold text-[#cbff6a]">Re-verify your email</h1>
			<form
				class="flex flex-col items-center gap-6 w-4/5 max-w-xl text-xl font-medium sm:text-2xl"
				action="POST"
			>
				<input
					type="email"
					name="email"
					placeholder="Email"
					class="w-full text-[#242424] outline-none rounded p-1 placeholder:text-[#969696]"
					required
					bind:value={email}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					class="w-full text-[#242424] outline-none rounded tracking-wider p-1 placeholder:text-[#969696]"
					required
					bind:value={password}
				/>
				<!-- svelte-ignore missing-declaration -->
				<button
					class="border-2 border-[#cbff6a] font-semibold px-10 py-2 rounded-md transition-colors ease-out duration-150 hover:text-[#c2ff4f]"
					on:click={() => reverify(event)}
				>
					Send re-verification code
				</button>
			</form>
			<p class="text-base text-[#ff6565] sm:text-lg">{message}</p>
		</div>
	{/if}
</div>
