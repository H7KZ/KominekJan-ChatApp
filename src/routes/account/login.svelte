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
		}
	});

	async function login(e: Event) {
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

		await axios
			.post('https://api-chatapp-pva.herokuapp.com/auth/login', {
				email: value.email,
				password: value.password
			})
			.then((res) => {
				localStorage.setItem('jwt_token', res.data.success.access_token);
				location.reload();
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

<div class="min-h-screen h-full w-full flex justify-center pt-52">
	{#if loggedUser && display}
		<div class="flex flex-col gap-4 items-center">
			<h2 class="font-ms font-semibold text-xl text-grayWhite">You are already Logged In!</h2>
		</div>
	{:else if !loggedUser && display}
		<div
			class="w-full flex flex-col items-center gap-12 font-ms font-semibold text-2xl text-grayWhite text-center sm:text-4xl"
		>
			<h1 class="font-bold text-[#cbff6a]">Log in</h1>
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
					on:click={() => login(event)}
				>
					Login
				</button>
				<div class="text-sm sm:text-base">
					<p>
						You are not registered yet? <a
							href="/account/signup"
							class="text-[#cbff6a] italic underline">Create an account</a
						>
					</p>
				</div>
			</form>
			<p class="text-base text-[#ff6565] sm:text-lg">{message}</p>
		</div>
	{/if}
</div>
