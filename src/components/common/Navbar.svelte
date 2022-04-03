<script lang="ts">
	import MobileNavbar from '/src/components/common/MobileNavbar.svelte';

	let fillColor: String = '#C1C8D8';

	let showMobileNavbar: boolean = false;
</script>

<div
	class="w-full h-16 fixed flex flex-row items-center p-2 md:px-8 md:py-4 lg:px-32 lg:py-8 xl:px-48 lx:py-12 bg-[#161616] bg-opacity-70"
>
	<div class="w-full hidden md:flex flex-row items-center justify-between font-ms text-[#eaf2ff]">
		<div class="font-bold text-grayWhite text-2xl uppercase">
			<a href="https://kominekjan.cz/">
				<h1>komínekjan</h1>
			</a>
		</div>
		<div class="flex gap-6 items-center font-medium text-xl">
			<div>
				<a href="/" class="transition-colors ease-out duration-150 py-2 hover:text-[#c2ff4f]"
					>Home</a
				>
			</div>

			<div class="dropdown">
				<div>
					<p class="transition-colors ease-out duration-150 pl-3 pr-1.5 py-2 hover:text-[#c2ff4f]">
						Account
					</p>
				</div>
				<div class="hidden absolute w-28 flex-col gap-4 py-2 pl-3 bg-[#383838] dropdown-content">
					<a
						href="/account/profile"
						class="transition-colors ease-out duration-150 hover:text-[#c2ff4f]">Profile</a
					>
					<a
						href="/account/login"
						class="transition-colors ease-out duration-150 hover:text-[#c2ff4f]">Login</a
					>
					<a
						href="/account/signup"
						class="transition-colors ease-out duration-150 hover:text-[#c2ff4f]">Signup</a
					>
					<a
						href="/account/reverify"
						class="transition-colors ease-out duration-150 hover:text-[#c2ff4f]">Reverify</a
					>
				</div>
			</div>

			<a href="/chatroom" class="transition-colors ease-out duration-150 py-2 hover:text-[#c2ff4f]">
				<button class="border-2 border-[#c2ff4f] rounded-md font-medium px-3 py-0.5">
					ChatRoom
				</button>
			</a>
		</div>
	</div>
	<div class="w-full flex items-center justify-end md:hidden">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			style="fill: {fillColor};"
			class="h-12 cursor-pointer"
			on:click={() => (showMobileNavbar = true)}
		>
			<path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z" />
		</svg>
	</div>
</div>
<MobileNavbar {showMobileNavbar} on:click={() => (showMobileNavbar = false)} />

<style scoped>
	.dropdown:hover .dropdown-content {
		display: flex;
	}
</style>
