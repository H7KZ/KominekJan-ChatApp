<script lang="ts">
	import Menu from '/src/components/common/Menu.svelte';

	import axios from 'axios';

	import { onMount } from 'svelte';

	let loggedUser: boolean;
	let display: boolean = false;
	let message: string = '';

	onMount(async () => {
		const token = localStorage.getItem('jwt_token');
		if (!(token == null)) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			};

			message = 'loading . . .';

			await axios
				.post('https://api-chatapp-pva.herokuapp.com/auth/isloggedin', {}, config)
				.then(() => {
					display = true;
					loggedUser = true;
				})
				.catch((err) => {
					display = true;
					loggedUser = false;
					if (err.response) {
						message = err.response.data.error.message;
					} else if (err.request) {
						console.log(err.request);
					}
				});
		} else {
			display = true;
			loggedUser = false;
		}
	});

	let messages = [
		{
			name: 'Maty je ass',
			badge: 'kekw.png',
			photoURL: 'https://cdn.betterttv.net/emote/5f1b0186cf6d2144653d2970/2x',
			text: 'haha jsem strasne ass hahahah so funny lmao',
			time: Date.now()
		},
		{
			name: 'Maty jfghfhfge ass',
			badge: 'kekw.png',
			photoURL: 'https://cdn.betterttv.net/emote/5ada077451d4120ea3918426/2x',
			text: 'hafghfghha jsem strasne ass hahhfghfgahah so funny lfghfghmao',
			time: Date.now()
		}
	];
</script>

<div class="min-h-screen h-full w-full flex justify-center items-center">
	{#if true && display}
		<div
			class="h-3/4 w-full max-w-6xl flex flex-col gap-4 justify-between items-center px-4 font-ms sm:px-16"
		>
			<div class="w-full h-full overflow-y-scroll overflow-x-clip scroll-smooth custom-scrollbar">
				<!--DISPLAYING MESSAGES-->
				{#each messages as message}
					<div class="flex gap-2 text-grayWhite mt-3 w-full">
						<div class="shrink-0 w-12">
							<div class="relative w-full h-12">
								<img
									src={message.photoURL == '' ? 'default_pfp.png' : message.photoURL}
									alt="err"
									class="rounded-full w-12"
								/>
								<img src={message.badge} alt="" class="absolute bottom-0 right-0 h-5 w-5" />
							</div>
						</div>

						<div class="flex flex-col w-full">
							<div>
								<h2 class="text-base text-[#c6ff5be7]">
									{message.name}
									&nbsp;&nbsp;&nbsp;
									<span class="text-xs text-[#9e9e9e]">
										{message.time}
									</span>
								</h2>
							</div>
							<p class="text-[#f0f0f0] text-sm break-words w-5/6">
								{message.text}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else if !loggedUser && display}
		<div class="flex flex-col gap-10 items-center text-grayWhite text-xl font-semibold sm:text-2xl">
			<h2 class="font-ms text-2xl">You need to be logged in to chat! u moron</h2>
			<Menu />
			<p class="text-base text-[#ff6565] sm:text-lg">{message}</p>
		</div>
	{/if}
</div>
