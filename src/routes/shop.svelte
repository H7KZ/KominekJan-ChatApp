<script lang="ts">
    import SignIn from '/src/components/common/SignIn.svelte';
    import ShopUI from '/src/components/ShopUI.svelte';

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
				To shop cosmetics<br />
				<span class="text-grayWhite font-semibold italic">Please log in</span>
			</h1>
		</div>
		<SignIn />
	{:else}
		<ShopUI />
	{/if}
</div>