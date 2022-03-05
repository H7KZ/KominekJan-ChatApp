<script lang="ts">
    import { getFirestore, collection, query, orderBy, limitToLast, onSnapshot } from 'firebase/firestore';
	
	const firestore = getFirestore();

	const messagesRef = collection(firestore, 'messages');

	const messagesQuery = query(messagesRef, orderBy("createdAt"), limitToLast(50));

    let messages = [];

	onSnapshot(messagesQuery, (querySnapshot) => {
        const messagesData = [];
		querySnapshot.docs.forEach((doc) => {
            messagesData.push(doc.data());
        });
        messages = messagesData;
	});

    function formatDate(time) {
        let timestamp = new Date(time*1000);

        return timestamp.getDate() + "." + timestamp.getMonth() + "." + (timestamp.getFullYear()-1969) + " " + timestamp.getHours() + ":" + timestamp.getMinutes();
    }
</script>

{#each messages as message}
    <div class="flex gap-2 text-grayWhite mt-3">
        <img src={message.photoURL} alt="userPhoto" class="rounded-full h-12">
        <div class="flex flex-col">
            <div>
                <h2 class="text-base text-[#c6ff5be7]">{message.name}&nbsp;&nbsp;&nbsp;<span class="text-xs text-[#9e9e9e]">{formatDate(message.createdAt)}</span></h2>
            </div>
            <p class="text-[#f0f0f0] text-sm">
                {message.text}
            </p>
        </div>
    </div>
{/each}