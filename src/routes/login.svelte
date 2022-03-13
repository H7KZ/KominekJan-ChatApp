<script lang="ts">
	import SignIn from '/src/components/common/SignIn.svelte';
	import Menu from '/src/components/common/Menu.svelte';

	import {onMount} from 'svelte';

	import {getAuth, type User} from 'firebase/auth';

	const auth = getAuth();

	let loggedUser: User;

	onMount(async () => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				loggedUser = user;
			}
		});
	});
</script>

<div class="min-h-screen h-full w-full flex flex-col gap-12 items-center pt-52">
	{#if !loggedUser}
		<div class="w-full font-ms font-semibold text-2xl text-grayWhite text-center sm:text-4xl">
			<h1 class="font-bold text-[#cbff6a]">
				Log in<br />
				<span class="text-grayWhite font-semibold italic">with Google:</span>
			</h1>
		</div>
		<SignIn />
	{:else}
		<div class="flex flex-col gap-4 items-center">
			<h2 class="font-ms font-semibold text-xl text-grayWhite">You are already Logged In!</h2>
			<Menu />
		</div>
	{/if}
</div>
