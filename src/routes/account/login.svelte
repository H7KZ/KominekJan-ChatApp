<script lang="ts">
	import { onMount } from "svelte";

	import { isUserLoggedIn } from "/src/components/common/token";

	import { logInUser } from "/src/components/common/login";

	import {
		getMainColor,
		checkMainColor,
	} from "/src/components/common/mainColor";

	let user: any = {
		loggedUser: null,
		display: null,
		messageStatus: "loading . . .",
	};

	let email: string;
	let password: string;

	let mainColor: string = "";

	onMount(async () => {
		await checkMainColor();

		mainColor = await getMainColor();

		user = await isUserLoggedIn();
	});

	async function login(e: Event) {
		e.preventDefault();

		user.messageStatus = logInUser(email, password);
	}
</script>

<div
	class="min-h-screen h-full w-full flex justify-center items-center"
	style="--theme-mainColor: {mainColor}"
>
	{#if user.loggedUser && user.display}
		<div class="flex flex-col gap-4 items-center">
			<h2 class="font-ms font-semibold text-xl text-grayWhite">
				You are already Logged In!
			</h2>
		</div>
	{:else if !user.loggedUser && user.display}
		<div
			class="w-full flex flex-col items-center gap-12 font-ms font-semibold text-2xl text-grayWhite text-center sm:text-4xl"
		>
			<h1 class="font-bold mainColor">Log in</h1>
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
					class="border-2 borderColor font-semibold px-10 py-2 rounded-md transition-colors ease-out duration-150 hoverButtonColor"
					on:click={() => login(event)}
				>
					Login
				</button>
				<div class="text-sm sm:text-base">
					<p>
						You are not registered yet? <a
							href="/account/signup"
							class="mainColor italic underline">Create an account</a
						>
					</p>
				</div>
			</form>
			<p class="text-base text-[#ff6565] sm:text-lg">{user.messageStatus}</p>
		</div>
	{/if}
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
