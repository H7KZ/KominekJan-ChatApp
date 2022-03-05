<script lang="ts">
	import { getFirestore, collection, addDoc, serverTimestamp} from 'firebase/firestore';

	import { getAuth } from 'firebase/auth';

	import Messages from './common/Messages.svelte';

	import { onMount } from 'svelte';

	const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

	let messagesContainer;
	let loaded = false;

	onMount(async () => {
		while(messagesContainer.scrollTop != messagesContainer.scrollHeight && !loaded) {
			await wait(1000);
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
			loaded = true;
		}
	});

	const auth = getAuth();
	
	const firestore = getFirestore();

	const messagesRef = collection(firestore, 'messages');

    let messageText;
    let messageTextField;

    async function sendMessage(e) {
        e.preventDefault();

        const { uid, photoURL, displayName } = auth.currentUser;

        await addDoc(messagesRef, {
            name: displayName,
            uid,
            text: messageText,
            createdAt: serverTimestamp(),
            photoURL
        })
        .then(() => {
            messageTextField.value = '';
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
        })
    }

</script>

<div class="h-3/4 w-full max-w-6xl flex flex-col gap-4 justify-between items-center px-4 font-ms">
	<div class="w-full h-full overflow-y-scroll scroll-smooth custom-scrollbar" bind:this={messagesContainer}>
		<Messages />
	</div>
	<div class="w-full">
		<form class="w-full flex justify-center items-center gap-4" on:submit={() => (sendMessage(event))}>
			<textarea class="w-full h-16 bg-[#fff2] outline-none text-grayWhite resize-none px-2" name="messageText" placeholder="Type your message" bind:this={messageTextField} bind:value={messageText} required />
			<button type="submit" class="h-12 w-12 border-2 border-[#fff0] flex justify-center items-center rounded-lg transition-all hover:border-[#c6ff5b]">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: #fff;" class="h-8"
					><path
						d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"
					/></svg
				>
			</button>
		</form>
	</div>
</div>

<style scoped>
	.custom-scrollbar {
		scrollbar-width: none;
		scrollbar-color: #c6ff5b;
	}

	/* Chrome, Edge, and Safari */
	.custom-scrollbar::-webkit-scrollbar {
		width: 16px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background-color: #c6ff5b;
		border-radius: 20px;
		border: 4px solid #161616;
	}
</style>