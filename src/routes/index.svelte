<script lang="ts">
	import { onMount } from "svelte";

	import { isUserLoggedIn } from "/src/components/common/token";

	import {
		getMainColor,
		checkMainColor,
	} from "/src/components/common/mainColor";

	import Menu from "/src/components/common/Menu.svelte";

	let user: any = {
		loggedUser: null,
		display: null,
		messageStatus: "loading . . .",
	};

	let mainColor: string = "";

	onMount(async () => {
		await checkMainColor();

		mainColor = await getMainColor();

		user = await isUserLoggedIn();
	});
</script>

<div
	class="min-h-screen h-full w-full flex justify-center items-center"
	style="--theme-mainColor: {mainColor}"
>
	<div
		class="w-full flex flex-col gap-10 font-ms font-semibold text-xl text-grayWhite text-center sm:text-2xl"
	>
		<h1 class="mainColor text-2xl sm:text-4xl">
			The best chat room ever<br />
			<span class="font-bold italic text-grayWhite">(no cap).</span>
		</h1>
		{#if user.loggedUser && user.display}
			<a href="/chatroom">
				<button
					class="border-2 borderColor font-semibold px-10 py-2 rounded-md transition-colors ease-out duration-150 hoverButtonColor"
				>
					go to ChatRoom
				</button>
			</a>
		{:else if !user.loggedUser && user.display}
			<Menu />
		{/if}
		<p class="text-base text-[#ff6565] sm:text-lg">{user.messageStatus}</p>
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
