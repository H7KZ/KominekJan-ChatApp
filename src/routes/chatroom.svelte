<script lang="ts">
	import SignIn from '/src/components/common/SignIn.svelte';
	import ChatRoom from '/src/components/ChatRoom.svelte';

	import { getAuth } from 'firebase/auth';

	const auth = getAuth();

	const userLoggedIn = auth.currentUser;
</script>

<div class="min-h-screen h-full w-full flex flex-col items-center justify-center">
	{#if !userLoggedIn}
		<SignIn />
	{:else}
		<ChatRoom />
	{/if}
</div>
