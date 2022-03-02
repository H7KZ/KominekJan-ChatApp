<script lang="ts">
	import Signin from '/src/components/common/signin.svelte';
	import ChatRoom from '/src/components/ChatRoom.svelte';

	import { getAuth } from 'firebase/auth';

	const auth = getAuth();

	const userLoggedIn = auth.currentUser;
</script>

<div class="min-h-screen h-full w-full flex flex-col items-center justify-center">
	{#if !userLoggedIn}
		<Signin />
	{:else}
		<ChatRoom />
	{/if}
</div>
