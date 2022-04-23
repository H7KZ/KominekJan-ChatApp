<script lang="ts">
	import {
		checkMainColor,
		getMainColor,
		getBorderColor,
	} from "/src/components/common/mainColor";

	import { onMount } from "svelte";

	let mainColor: string;
	let borderColor: string;

	onMount(() => {
		checkMainColor();

		mainColor = getMainColor();
		borderColor = getBorderColor();
	});
</script>

<a
	href="/account/login"
	style="--theme-mainColor: {mainColor}; --theme-borderColor: {borderColor}"
>
	<button
		class="border-2 borderColor font-semibold px-10 py-2 rounded-md transition-colors ease-out duration-150 hoverButtonColor"
	>
		Log in here
	</button>
</a>
<a
	href="/account/signup"
	style="--theme-mainColor: {mainColor}; --theme-borderColor: {borderColor}"
>
	<button
		class="border-2 borderColor font-semibold px-10 py-2 rounded-md transition-colors ease-out duration-150 hoverButtonColor"
	>
		Sign up here
	</button>
</a>

<style scoped>
	.borderColor {
		border-color: var(--theme-borderColor);
	}

	.hoverButtonColor:hover {
		color: var(--theme-mainColor);
	}
</style>
