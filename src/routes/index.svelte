<script lang="ts">
	import Signin from '/src/components/common/Signin.svelte';

	import { getAuth } from 'firebase/auth';

	import { onMount } from 'svelte';

	const auth = getAuth();

	const userLoggedIn = auth.currentUser;

	onMount(() => {
		console.log(auth.currentUser);
	})
</script>

<div>
	<div class="min-h-screen h-full w-full flex flex-col gap-12 items-center pt-52">
		<div class="w-full font-ms font-semibold text-2xl text-grayWhite text-center sm:text-4xl">
			<h1>
				<span class="font-bold italic text-[#cbff6a]">The best chat room ever</span><br />(no cap).
			</h1>
		</div>
		{#if !userLoggedIn}
			<Signin />
		{:else}
			<div>
				<a href="/chatroom">
					<button> ChatRoom </button>
				</a>
				<a href="/">
					<button> Logout </button>
				</a>
			</div>
		{/if}
	</div>
</div>
