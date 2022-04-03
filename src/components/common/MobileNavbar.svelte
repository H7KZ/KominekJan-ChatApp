<script lang="ts">
	export let showMobileNavbar: boolean = false;

	let fillColor: String = '#C1C8D8';
</script>

<div
	class="fixed top-0 left-0 h-screen w-screen z-50 bg-[#262626] {showMobileNavbar
		? 'flex'
		: 'hidden'} flex-col items-center gap-10 p-2"
>
	<div class="w-full flex justify-end">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			style="fill: {fillColor};"
			class="h-12"
			on:click
		>
			<path
				d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
			/>
		</svg>
	</div>
	<ul class="font-ms font-semibold text-[#A6B0C7] text-2xl text-center">
		<li class="m-3"><a href="/" on:click>Home</a></li>

		<li class="m-3"><a href="/account/profile" on:click>Profile</a></li>

		<li class="m-3"><a href="/account/login" on:click>Login</a></li>

		<li class="m-3"><a href="/account/signup" on:click>Signup</a></li>

		<li class="m-3"><a href="/account/reverify" on:click>Reverify</a></li>

		<li class="m-3">
			<a href="/chatroom" on:click>
				<button class="border-2 border-[#c2ff4f] rounded-md font-medium px-3 py-0.5">
					ChatRoom
				</button>
			</a>
		</li>
	</ul>
</div>
