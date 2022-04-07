<script lang="ts">
	import axios from 'axios';

	import signupSchema from '../../components/joiSchemas/signup';

	let email: string;
	let password: string;
	let confirmPassword: string;
	let display_name: string;
	let message: string = '';

	async function signup(e: Event) {
		e.preventDefault();

		let value: any;

		try {
			value = await signupSchema.validateAsync({
				email: email,
				password: password,
				confirmPassword: confirmPassword,
				display_name: display_name
			});
		} catch (error) {
			message = error;
			return;
		}

		message = 'loading . . .';

		await axios
			.post('https://api-chatapp-pva.herokuapp.com/auth/signup', {
				email: value.email,
				password: value.password,
				display_name: value.display_name
			})
			.then(() => {
				location.replace('https://production.chatappkominekjan.pages.dev/verify/pending');
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
	<div
		class="w-full flex flex-col items-center gap-12 font-ms font-semibold text-2xl text-grayWhite text-center sm:text-4xl"
	>
		<h1 class="font-bold text-[#cbff6a]">Sign in</h1>
		<form
			class="flex flex-col items-center gap-6 w-4/5 max-w-xl text-xl font-medium sm:text-2xl"
			action="POST"
		>
			<input
				type="email"
				name="email"
				placeholder="Your email"
				class="w-full text-[#242424] outline-none rounded p-1 placeholder:text-[#969696]"
				required
				bind:value={email}
			/>
			<input
				type="text"
				name="display_name"
				placeholder="Your username"
				class="w-full text-[#242424] outline-none rounded p-1 placeholder:text-[#969696]"
				required
				bind:value={display_name}
			/>
			<input
				type="password"
				name="password"
				placeholder="Your password"
				class="w-full text-[#242424] outline-none rounded tracking-wider p-1 placeholder:text-[#969696]"
				required
				bind:value={password}
			/>
			<input
				type="password"
				name="confirmPassword"
				placeholder="Confirm your password"
				class="w-full text-[#242424] outline-none rounded tracking-wider p-1 placeholder:text-[#969696]"
				required
				bind:value={confirmPassword}
			/>
			<!-- svelte-ignore missing-declaration -->
			<button
				class="border-2 border-[#cbff6a] font-semibold px-10 py-2 rounded-md transition-colors ease-out duration-150 hover:text-[#c2ff4f]"
				on:click={() => signup(event)}
			>
				Sign up & verify my email
			</button>
			<div class="text-sm sm:text-base">
				<p>
					Are you already registered? <a
						href="/account/login"
						class="text-[#cbff6a] italic underline">Log in</a
					>
				</p>
			</div>
		</form>
		<p class="text-base text-[#ff6565] sm:text-lg">{message}</p>
	</div>
</div>
