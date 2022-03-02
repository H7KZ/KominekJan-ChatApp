<script>
    import Navbar from "/src/components/common/Navbar.svelte";

    import "/src/tailwind/tailwind.css";

    import firebase from 'firebase/compat/app';
    
	let firebaseConfig = {
		apiKey: 'AIzaSyBucAtqgeNfpU3XzV8CHo7XZK7ZE3rm3hc',
		authDomain: 'pva-chatapp.firebaseapp.com',
		projectId: 'pva-chatapp',
		storageBucket: 'pva-chatapp.appspot.com',
		messagingSenderId: '708283718903',
		appId: '1:708283718903:web:54ff8a4b98de326708c7f2',
		measurementId: 'G-L3PMPPPX7Y'
	};

	firebase.initializeApp(firebaseConfig);
</script>

<div>
    <Navbar />
    <slot />
</div>