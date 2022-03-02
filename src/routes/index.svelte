<script lang="ts">
    import Signin from '/src/components/common/signin.svelte';

    import firebase from 'firebase/compat/app';
    import { getFirestore } from 'firebase/firestore';
    import { getAuth, onAuthStateChanged } from 'firebase/auth';

    let firebaseConfig = {
        apiKey: "AIzaSyBucAtqgeNfpU3XzV8CHo7XZK7ZE3rm3hc",
        authDomain: "pva-chatapp.firebaseapp.com",
        projectId: "pva-chatapp",
        storageBucket: "pva-chatapp.appspot.com",
        messagingSenderId: "708283718903",
        appId: "1:708283718903:web:54ff8a4b98de326708c7f2",
        measurementId: "G-L3PMPPPX7Y"
    }

    firebase.initializeApp(firebaseConfig);

    const auth = getAuth();
    const firestore = getFirestore();

    const userLoggedIn = onAuthStateChanged(auth, (user) => {
        if (user) {
            return true;
        } else {
            return false;
        }
    });
</script>

<div>
    <div>
        {#if userLoggedIn}
            <Signin />
        {:else}
            <button>Chat room</button>
        {/if}
    </div>
</div>