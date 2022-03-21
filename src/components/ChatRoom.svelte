<script lang="ts">
	import {
		doc,
		addDoc,
		setDoc,
		writeBatch,
		collection,
		getFirestore,
		limitToLast,
		onSnapshot,
		orderBy,
		query,
		serverTimestamp
	} from 'firebase/firestore';

	import {getAuth} from 'firebase/auth';

	import {onMount} from 'svelte';

	const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

	const auth = getAuth();

	const firestore = getFirestore();

	const messagesRef = collection(firestore, 'messages');

	const usersRef = collection(firestore, 'users');

	//SCROLL TO BOTTOM OF THE MESSAGES WHEN PAGE IS LOADED

	let messagesContainer;
	let loaded: boolean = false;

	onMount(async () => {
		while (messagesContainer.scrollTop != messagesContainer.scrollHeight && !loaded) {
			await wait(1000);
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
			loaded = true;
		}
	});

	
	//CHECKING THE DATABASE FOR CHANGES ON COLLECTION OF MESSAGES

	const messagesQuery = query(messagesRef, orderBy('createdAt'), limitToLast(25));

	let messages = [];

	onSnapshot(messagesQuery, (querySnapshot) => {
		const messagesData = [];
		querySnapshot.docs.forEach((doc) => {
			messagesData.push(doc.data());
		});
		messages = messagesData;
		messagesContainer.scrollTop = messagesContainer.scrollHeight;
	});

	function formatDate(time) {
		let timestamp:Date = new Date(time * 1000);

		timestamp.setFullYear(timestamp.getFullYear() - 1969);
		timestamp.setMonth(timestamp.getMonth() + 1);

		let todayDate:Date = new Date(Date.now());

		todayDate.setMonth(todayDate.getMonth() + 1);

		if (todayDate.toLocaleDateString() === timestamp.toLocaleDateString()) {
			return (
				'today at ' +
				timestamp.getHours() +
				':' +
				(timestamp.getMinutes() < 10 ? '0' : '') +
				timestamp.getMinutes()
			);
		}

		todayDate.setDate(todayDate.getDate() - 1);

		if (
			todayDate.getDate() === timestamp.getDate() &&
			todayDate.getMonth() === timestamp.getMonth() &&
			todayDate.getFullYear() === timestamp.getFullYear()
		) {
			return (
				'yesterday at ' +
				timestamp.getHours() +
				':' +
				(timestamp.getMinutes() < 10 ? '0' : '') +
				timestamp.getMinutes()
			);
		}

		return (
			(timestamp.getDate() < 10 ? '0' : '') +
			timestamp.getDate() +
			'.' +
			(timestamp.getMonth() < 10 ? '0' : '') +
			timestamp.getMonth() +
			'.' +
			timestamp.getFullYear() +
			' ' +
			timestamp.getHours() +
			':' +
			(timestamp.getMinutes() < 10 ? '0' : '') +
			timestamp.getMinutes()
		);
	}

	//SENDING MESSAGE CODE

	let messageText: String;
	let messageTextField;

	let sendTime = Date.now();
	let sendFirstMessage = true;

	async function sendMessage(e) {
		e.preventDefault();

		if (new Date().getTime() - sendTime > 10000 || sendFirstMessage) {
			
			const { uid, photoURL, displayName } = auth.currentUser;

			const batch = writeBatch(firestore);

			const userRef = doc(firestore, 'users', uid);
			batch.set(userRef, {
				timestamp: serverTimestamp()
			});

			const messageRef = doc(collection(firestore, 'messages'));
			batch.set(messageRef, {
				name: displayName,
				uid,
				text: messageText,
				createdAt: serverTimestamp(),
				photoURL
			});
			batch.commit()
			.then(() => {
				sendFirstMessage = false;
				sendTime = Date.now();
				timeout();
				messageTextField.value = '';
				messagesContainer.scrollTop = messagesContainer.scrollHeight;
			})
			.catch((error) => {
				window.alert(error);
			});
		}
	}

	function sendMessageEnter(e) {
		e.preventDefault();

		if (e.keyCode == 13 && !e.shiftKey) {
			sendMessage(e);
		}
	}

	let timeoutTime = 0;
	let showInterval = false;

	function timeout() {
		let time = 10;
		showInterval = true;
		const interval = setInterval(() => {
			timeoutTime = time;
			time--;
		}, 1000);
		setTimeout(() => {
			clearInterval(interval);
			showInterval = false;
		}, 11000);
	}
</script>

<div class="h-3/4 w-full max-w-6xl flex flex-col gap-4 justify-between items-center px-4 font-ms">
	<div
		class="w-full h-full overflow-y-scroll scroll-smooth custom-scrollbar"
		bind:this={messagesContainer}
	>
		<!--DISPLAYING MESSAGES-->
		{#each messages as message}
			<div class="flex gap-2 text-grayWhite mt-3">
				<img src={message.photoURL} alt="userPhoto" class="rounded-full h-12" />
				<div class="flex flex-col">
					<div>
						<h2 class="text-base text-[#c6ff5be7]">
							{message.name}&nbsp;&nbsp;&nbsp;<span class="text-xs text-[#9e9e9e]"
								>{formatDate(message.createdAt)}</span
							>
						</h2>
					</div>
					<p class="text-[#f0f0f0] text-sm">
						{message.text}
					</p>
				</div>
			</div>
		{/each}
	</div>
	<div class="w-full">
		<!--FORM FOR MESSAGES-->
		<!-- svelte-ignore missing-declaration -->
		<form
			class="w-full flex justify-center items-center gap-4"
			on:submit={() => sendMessage(event)}
		>
			<textarea
				class="w-full h-16 bg-[#fff2] outline-none text-grayWhite resize-none px-2"
				name="messageText"
				placeholder="Type your message"
				bind:this={messageTextField}
				bind:value={messageText}
				on:keyup={() => sendMessageEnter(event)}
				required
			/>
			<button
				type="submit"
				class="h-12 w-12 border-2 border-[#fff0] flex justify-center items-center rounded-lg transition-all hover:border-[#c6ff5b]"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: #fff;" class="h-8"
					><path
						d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"
					/></svg
				>
			</button>
		</form>
		<p class="{showInterval ? 'text-[#c93939]' : 'text-[#3bbe51]'}">{showInterval ? "Wait " + timeoutTime + "s before you can send another message!" : "You can send a message!"}</p>
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
