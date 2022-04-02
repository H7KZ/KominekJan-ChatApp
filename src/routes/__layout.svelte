<script lang="ts">
	import Navbar from '/src/components/common/Navbar.svelte';

	import '/src/tailwind/tailwind.css';
</script>

<div>
	<Navbar />
	<slot />
</div>
