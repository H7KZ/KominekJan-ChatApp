<script lang="ts">
	import {getAuth, signOut} from 'firebase/auth';

	const auth = getAuth();

	let errorCode;
	let errorMessage;
	let errorEmail;

	function logOut() {
		signOut(auth)
			.then(() => {
				location.reload();
			})
			.catch((error) => {
				errorCode = error.code;
				errorMessage = error.message;
				errorEmail = error.email;
			});
	}
</script>

<div class="flex flex-col gap-6 items-center text-grayWhite">
	<a href="/chatroom">
		<button
			class="px-8 py-1 border-2 border-[#cbff6a] rounded bg-[#cbff6a] font-semibold text-base text-[#161616] transition-all hover:text-[#cbff6a] hover:bg-[#fff0]"
		>
			Show ChatRoom
		</button>
	</a>
	<a href="/">
		<button
			on:click={logOut}
			class="px-8 py-1 border-2 border-[#cbff6a] rounded bg-[#cbff6a] font-semibold text-base text-[#161616] transition-all hover:text-[#cbff6a] hover:bg-[#fff0]"
		>
			Logout
		</button>
	</a>
	{#if errorCode}
		{errorCode}
	{:else if errorMessage}
		{errorMessage}
	{:else if errorEmail}
		{errorMessage}
	{/if}
</div>
