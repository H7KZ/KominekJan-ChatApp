<script lang="ts">
    import MobileNavbar from "/src/lib/components/MobileNavbar.svelte";

    import {onMount} from "svelte";

    import {checkMainColor, getMainColor} from "/src/lib/functions/mainColor";

    let mainColor: string = "";

    onMount(async () => {
        await checkMainColor();

        mainColor = getMainColor();
    });

    let fillColor: string = "#C1C8D8";

    let showMobileNavbar: boolean = false;
</script>

<div
        class="w-full h-16 fixed flex flex-row items-center p-2 md:px-8 md:py-4 lg:px-32 lg:py-8 xl:px-48 lx:py-12 bg-[#161616] bg-opacity-70 z-50"
        style="--theme-mainColor: {mainColor}"
>
    <div
            class="w-full hidden md:flex flex-row items-center justify-between font-ms text-[#eaf2ff]"
    >
        <div class="font-bold text-grayWhite text-2xl uppercase">
            <a href="https://kominekjan.cz/">
                <h1>komínekjan</h1>
            </a>
        </div>
        <div class="flex gap-6 items-center font-medium text-xl">
            <div>
                <a
                        class="transition-colors ease-out duration-150 py-2 hoverButtonColor"
                        href="/"
                >Home</a
                >
            </div>

            <div class="dropdown">
                <div>
                    <p
                            class="transition-colors ease-out duration-150 pl-3 pr-1.5 py-2 hoverButtonColor"
                    >
                        Account
                    </p>
                </div>
                <div
                        class="hidden absolute w-28 flex-col gap-4 py-2 pl-3 bg-[#383838] dropdown-content"
                >
                    <a
                            class="transition-colors ease-out duration-150 hoverButtonColor"
                            href="/account/profile"
                    >Profile</a
                    >
                    <a
                            class="transition-colors ease-out duration-150 hoverButtonColor"
                            href="/account/login"
                    >Login</a
                    >
                    <a
                            class="transition-colors ease-out duration-150 hoverButtonColor"
                            href="/account/signup"
                    >Signup</a
                    >
                    <a
                            class="transition-colors ease-out duration-150 hoverButtonColor"
                            href="/account/reverify"
                    >Reverify</a
                    >
                </div>
            </div>

            <a
                    class="transition-colors ease-out duration-150 py-2 hoverButtonColor"
                    href="/chatroom"
            >
                <button class="border-2 borderColor rounded-md font-medium px-3 py-0.5">
                    ChatRoom
                </button>
            </a>
        </div>
    </div>
    <div class="w-full flex items-center justify-end md:hidden">
        <svg
                class="h-12 cursor-pointer"
                on:click={() => (showMobileNavbar = true)}
                style="fill: {fillColor};"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z"/>
        </svg>
    </div>
</div>
<MobileNavbar on:click={() => (showMobileNavbar = false)} {showMobileNavbar}/>

<style scoped>
    .dropdown:hover .dropdown-content {
        display: flex;
    }

    .borderColor {
        border-color: var(--theme-mainColor);
    }

    .hoverButtonColor:hover {
        color: var(--theme-mainColor);
    }
</style>
