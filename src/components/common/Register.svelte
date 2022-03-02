<script lang="ts">
	import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


	const auth = getAuth();
</script>

<div class="w-3/4 flex flex-col items-center sm:w-96">
		<button
			class="px-8 py-1 border-2 border-[#cbff6a] rounded bg-[#cbff6a] font-semibold text-base text-[#161616] transition-all hover:text-[#cbff6a] hover:bg-[#fff0]"
			>Register</button
		>

		<p class="font-medium text-sm text-[#d8d8d8] text-center">
			You are already registered? <a href="/register" class="text-[#cbff6a] italic">Log in</a>
		</p>
</div>
