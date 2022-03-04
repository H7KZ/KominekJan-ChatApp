<script lang="ts">
	import { onMount } from 'svelte';

	import SignIn from '/src/components/common/SignIn.svelte';
	import Menu from '/src/components/common/Menu.svelte';

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

<div>
	<div class="min-h-screen h-full w-full flex flex-col gap-12 items-center pt-52">
		<div class="w-full font-ms font-semibold text-2xl text-grayWhite text-center sm:text-4xl">
			<h1 class="text-[#cbff6a]">
				The best chat room ever<br />
				<span class="font-bold italic text-grayWhite">(no cap).</span>
			</h1>
		</div>
		{#if !loggedUser}
			<SignIn />
		{:else}
			<Menu />
		{/if}
	</div>
</div>
