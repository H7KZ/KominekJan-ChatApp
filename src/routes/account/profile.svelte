<script lang="ts">
	import { onMount } from "svelte";

	import { getLoggedInUserData } from "/src/lib/functions/profile";

	import { getMainColor, checkMainColor } from "/src/lib/functions/mainColor";

	import { saveProfileChanges } from "/src/lib/functions/profile";

	import Menu from "/src/lib/components/Menu.svelte";

	let user: any = {
		loggedUser: null,
		display: null,
		userDataLoaded: null,
		userData: {
			display_name: "",
			email: "",
			photoURL: "",
			created: "",
		},
		messageStatus: "loading . . .",
	};

	let newPFP: string;
	let newDisplayName: string;
	let newMainColor: string;

	let mainColor: string = "";

	onMount(async () => {
		await checkMainColor();

		mainColor = await getMainColor();
		newMainColor = mainColor;

		user = await getLoggedInUserData();
	});

	async function logout(e: Event) {
		e.preventDefault();

		localStorage.removeItem("jwt_token");
		location.reload();
	}

	async function saveChanges(e: Event) {
		e.preventDefault();

		user.messageStatus = await saveProfileChanges(
			newPFP,
			newMainColor,
			newDisplayName
		);
	}
</script>

<div
	class="min-h-screen h-full w-full flex justify-center items-center"
	style="--theme-mainColor: {mainColor};"
>
	{#if user.loggedUser && user.display}
		<div
			class="w-4/5 flex flex-col items-center gap-8 font-ms text-2xl text-grayWhite text-center sm:text-4xl"
		>
			<div class="font-bold mainColor">
				<h1>Your profile:</h1>
			</div>

			<div
				class="w-full flex flex-col items-center gap-2 text-xl text-grayWhite text-center font-semibold sm:text-2xl"
			>
				<h3 class="">{user.userData.email}</h3>
				<h4 class="text-base text-[#c5c5c5] sm:text-lg">
					Account created at: {new Date(user.userData.created).toLocaleString()}
				</h4>
			</div>

			<div
				class="w-full flex flex-col items-center gap-2 text-xl text-grayWhite text-center font-semibold sm:text-2xl"
			>
				<div class="relative">
					{#if user.userDataLoaded}
						<!-- svelte-ignore a11y-missing-attribute -->
						<center>
							<img
								src={user.userData.photoURL}
								class="rounded-full w-20 h-20 origin-center object-cover sm:w-28 sm:h-28"
							/>
						</center>
					{/if}

					<div
						class="absolute top-0 left-0 flex justify-center items-center rounded-full w-20 h-20 sm:w-28 sm:h-28 origin-center bg-[#0000008c]"
					/>
				</div>
				<h3 class="">Change your profile picture</h3>
				<div
					class="flex flex-col gap-1 w-5/6 max-w-md text-lg font-medium sm:text-xl"
				>
					<input
						type="text"
						placeholder={user.userData.photoURL}
						class="w-full text-[#242424] outline-none rounded p-1 placeholder:text-[#969696]"
						bind:value={newPFP}
					/>
					<p class="text-sm text-[#c5c5c5] text-left sm:text-base">
						Only post links that are from imgur or discord!
					</p>
				</div>
			</div>

			<div
				class="w-full flex flex-col items-center gap-2 text-xl text-grayWhite text-center font-semibold sm:text-2xl"
			>
				<h3 class="">Change your display name</h3>
				<div class="w-5/6 max-w-md text-lg font-medium sm:text-xl">
					<input
						type="text"
						placeholder={user.userData.display_name}
						class="w-full text-[#242424] outline-none rounded p-1 placeholder:text-[#969696]"
						bind:value={newDisplayName}
					/>
				</div>
			</div>

			<div
				class="w-full flex flex-col items-center gap-2 text-xl text-grayWhite text-center font-semibold sm:text-2xl"
			>
				<h3 class="">Change your main outline color</h3>
				<div class="w-5/6 max-w-md">
					<input
						type="color"
						class="w-full outline-none rounded bg-[#00000000] border-none"
						bind:value={newMainColor}
					/>
				</div>
			</div>

			<div
				class="w-full max-w-md flex flex-col-reverse justify-between items-center gap-6 text-xl text-grayWhite text-center font-semibold sm:flex-row sm:text-2xl"
			>
				<!-- svelte-ignore missing-declaration -->
				<button
					class="border-2 borderColor px-10 py-2 rounded-md text-sm transition-colors ease-out duration-150 hoverButtonColor sm:text-base"
					on:click={() => logout(event)}
				>
					Logout
				</button>
				<!-- svelte-ignore missing-declaration -->
				<button
					class="border-2 borderColor px-10 py-2 rounded-md text-sm transition-colors ease-out duration-150 hoverButtonColor sm:text-base"
					on:click={() => saveChanges(event)}
				>
					Save changes
				</button>
			</div>
			<div>
				<p class="text-[#fff]">
					{user.messageStatus}
				</p>
			</div>
		</div>
	{:else if !user.loggedUser && user.display}
		<div
			class="flex flex-col gap-10 items-center text-grayWhite text-xl font-semibold sm:text-2xl"
		>
			<h2 class="font-ms text-2xl">
				You need to be logged in to see your account!
			</h2>
			<Menu />
			<p class="text-base text-[#ff6565] sm:text-lg">{user.messageStatus}</p>
		</div>
	{:else}
		<p class="text-base text-[#ff6565] sm:text-lg">{user.messageStatus}</p>
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
