<script lang="ts">
	import SignIn from '/src/components/common/SignIn.svelte';
	import ChatRoom from '/src/components/ChatRoom.svelte';

	import { onMount } from 'svelte';

	import { getAuth } from 'firebase/auth';

	const auth = getAuth();

	let loggedUser;

	onMount(async () => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				loggedUser = user;
			}
		});
	});
</script>

<div class="min-h-screen h-full w-full flex flex-col items-center justify-center">
	{#if !loggedUser}
	<h1 class="font-ms text-2xl text-cente font-bold text-[#cbff6a]r sm:text-4xl">
		To enter a ChatRoom<br />
		<span class="text-grayWhite font-semibold italic">Please log in</span>
	</h1>
		<SignIn />
	{:else}
		<ChatRoom />
	{/if}
</div>
