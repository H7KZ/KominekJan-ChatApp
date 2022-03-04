<script lang="ts">
	import { getAuth, signOut } from 'firebase/auth';

	const auth = getAuth();

	let signedOut = false;

	function logOut() {
		signOut(auth)
			.then(() => {
				location.reload();
			})
			.catch((error) => {});
	}
</script>

<div class="flex flex-col gap-6 items-center">
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
</div>
