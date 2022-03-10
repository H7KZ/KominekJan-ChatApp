<script lang="ts">
	import SignIn from '/src/components/common/SignIn.svelte';
	import ChatRoom from '/src/components/ChatRoom.svelte';

	import { onMount } from 'svelte';

	import { getAuth, type User } from 'firebase/auth';

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

<div
	class="min-h-screen h-screen w-full flex flex-col items-center {!loggedUser
		? 'pt-52 gap-12'
		: 'p-0 gap-0 justify-center'}"
>
	{#if !loggedUser}
		<h1 class="font-ms text-2xl text-center font-bold text-[#cbff6a] sm:text-4xl">
			To enter a ChatRoom<br />
			<span class="text-grayWhite font-semibold italic">Please log in</span>
		</h1>
		<SignIn />
	{:else}
		<ChatRoom />
	{/if}
</div>
