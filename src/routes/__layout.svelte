<script lang="ts">
    import Navbar from "/src/lib/components/Navbar.svelte";

    import "/src/tailwind/tailwind.css";
</script>

<div class="h-full w-full">
    <Navbar/>
    <slot/>
</div>
