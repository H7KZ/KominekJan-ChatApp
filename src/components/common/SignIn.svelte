<script lang="ts">
	import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

	const auth = getAuth();
	const provider = new GoogleAuthProvider();

	let errorCode;
	let errorMessage;
	let errorEmail;
	let errorCredentials;

	function LogIn() {
		signInWithPopup(auth, provider)
			.catch((error) => {
				errorCode = error.code;
				errorMessage = error.message;
				errorEmail = error.email;
				errorCredentials = GoogleAuthProvider.credentialFromError(error);
			});
	}
</script>

<div class="w-3/4 flex flex-col items-center sm:w-96">
	<button
		on:click={LogIn}
		class="px-8 py-1 border-2 border-[#cbff6a] rounded bg-[#cbff6a] font-semibold text-base text-[#161616] transition-all hover:text-[#cbff6a] hover:bg-[#fff0]"
		>Log in with google</button
	>
	{#if errorCode && errorMessage}
		{errorCode}
	{:else if errorMessage}
		{errorMessage}
	{:else if errorEmail}
		{errorMessage}
	{:else if errorCredentials}
		{errorMessage}
	{/if}
</div>
