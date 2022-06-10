<script lang="ts">
	import { getMainColor, checkMainColor } from "/src/lib/functions/mainColor";

	import { onMount } from "svelte";

	let mainColor: string = "";

	onMount(async () => {
		await checkMainColor();

		mainColor = await getMainColor();
	});
</script>

<a href="/account/login" style="--theme-mainColor: {mainColor};">
	<button
		class="border-2 borderColor font-semibold px-10 py-2 rounded-md transition-colors ease-out duration-150 hoverButtonColor"
	>
		Log in here
	</button>
</a>
<a href="/account/signup" style="--theme-mainColor: {mainColor};">
	<button
		class="border-2 borderColor font-semibold px-10 py-2 rounded-md transition-colors ease-out duration-150 hoverButtonColor"
	>
		Sign up here
	</button>
</a>

<style scoped>
	.borderColor {
		border-color: var(--theme-mainColor);
	}

	.hoverButtonColor:hover {
		color: var(--theme-mainColor);
	}
</style>
