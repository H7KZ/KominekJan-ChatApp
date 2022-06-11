<script lang="ts">
	import { onMount } from "svelte";

	import { isUserLoggedIn } from "/src/lib/functions/token";

	import { reverifyUser } from "/src/lib/functions/reverify";

	import { getMainColor, checkMainColor } from "/src/lib/functions/mainColor";

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

	async function reverify(e: Event): Promise<void> {
		e.preventDefault();

		user.messageStatus = await reverifyUser(email, password);
	}
</script>

<div
	class="min-h-screen h-full w-full flex justify-center items-center"
	style="--theme-mainColor: {mainColor};"
>
	{#if user.loggedUser && user.display}
		<div class="flex flex-col gap-4 items-center">
			<h2 class="font-ms font-semibold text-xl text-grayWhite">
				You are already Logged In / Verified!
			</h2>
		</div>
	{:else if !user.loggedUser && user.display}
		<div
			class="w-full flex flex-col items-center gap-12 font-ms font-semibold text-2xl text-grayWhite text-center sm:text-4xl"
		>
			<h1 class="font-bold mainColor">Re-verify your email</h1>
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
					on:click={() => reverify(event)}
				>
					Send re-verification code
				</button>
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
