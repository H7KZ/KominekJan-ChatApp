<script lang="ts">
	import { onMount } from "svelte";

	import { signUpUser } from "/src/components/common/signup";

	import {
		getMainColor,
		checkMainColor,
	} from "/src/components/common/mainColor";

	let email: string;
	let password: string;
	let confirmPassword: string;
	let display_name: string;

	let messageStatus: string = "";

	let mainColor: string = "";

	onMount(async () => {
		await checkMainColor();

		mainColor = await getMainColor();
	});

	async function signup(e: Event) {
		e.preventDefault();

		messageStatus = "loading . . .";

		messageStatus = await signUpUser(
			email,
			password,
			confirmPassword,
			display_name
		);
	}
</script>

<div
	class="min-h-screen h-full w-full flex justify-center items-center"
	style="--theme-mainColor: {mainColor};"
>
	<div
		class="w-full flex flex-col items-center gap-12 font-ms font-semibold text-2xl text-grayWhite text-center sm:text-4xl"
	>
		<h1 class="font-bold mainColor">Sign in</h1>
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
				class="border-2 borderColor font-semibold px-10 py-2 rounded-md transition-colors ease-out duration-150 hoverButtonColor"
				on:click={() => signup(event)}
			>
				Sign up & verify my email
			</button>
			<div class="text-sm sm:text-base">
				<p>
					Are you already registered? <a
						href="/account/login"
						class="mainColor italic underline">Log in</a
					>
				</p>
			</div>
		</form>
		<p class="text-base text-[#ff6565] sm:text-lg">{messageStatus}</p>
	</div>
</div>

<style scoped>
	.mainColor {
		color: var(--theme-mainColor);
	}

	.borderColor {
		border-color: var(--theme-mainColor);
	}

	.hoverButtonColor:hover {
		color: var(--theme-mainColor);
	}
</style>
