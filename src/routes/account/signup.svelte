<script lang="ts">
    import {onMount} from "svelte";

    import {signUpUser} from "/src/lib/functions/signup";

    import {checkMainColor, getMainColor} from "/src/lib/functions/mainColor";

    let email: string;
    let password: string;
    let confirmPassword: string;
    let display_name: string;

    let messageStatus: string = "";

    let mainColor: string = "";

    onMount(async () => {
        await checkMainColor();

        mainColor = getMainColor();
    });

    async function signup(e: Event): Promise<void> {
        e.preventDefault();

        messageStatus = "loading . . .";

        messageStatus = await signUpUser(
            email,
            display_name,
            password,
            confirmPassword
        );
    }
</script>

<div
        class="min-h-screen h-full w-full flex justify-center items-center"
        style="--theme-mainColor: {mainColor};"
>
    <div
            class="w-full flex flex-col items-center gap-12 font-ms font-semibold text-2xl text-grayWhite text-center sm:text-4xl"
    >
        <h1 class="font-bold mainColor">Sign in</h1>
        <form
                action="POST"
                class="flex flex-col items-center gap-6 w-4/5 max-w-xl text-xl font-medium sm:text-2xl"
        >
            <input
                    bind:value={email}
                    class="w-full text-[#242424] outline-none rounded p-1 placeholder:text-[#969696]"
                    name="email"
                    placeholder="Your email"
                    required
                    type="email"
            />
            <input
                    bind:value={display_name}
                    class="w-full text-[#242424] outline-none rounded p-1 placeholder:text-[#969696]"
                    name="display_name"
                    placeholder="Your username"
                    required
                    type="text"
            />
            <input
                    bind:value={password}
                    class="w-full text-[#242424] outline-none rounded tracking-wider p-1 placeholder:text-[#969696]"
                    name="password"
                    placeholder="Your password"
                    required
                    type="password"
            />
            <input
                    bind:value={confirmPassword}
                    class="w-full text-[#242424] outline-none rounded tracking-wider p-1 placeholder:text-[#969696]"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    required
                    type="password"
            />
            <!-- svelte-ignore missing-declaration -->
            <!--suppress JSDeprecatedSymbols -->
            <button
                    class="border-2 borderColor font-semibold px-10 py-2 rounded-md transition-colors ease-out duration-150 hoverButtonColor"
                    on:click={() => signup(event)}
            >
                Sign up & verify my email
            </button>
            <div class="text-sm sm:text-base">
                <p>
                    Are you already registered? <a
                        class="mainColor italic underline"
                        href="/account/login">Log in</a
                >
                </p>
            </div>
        </form>
        <p class="text-base text-[#ff6565] sm:text-lg">{messageStatus}</p>
    </div>
</div>

<style scoped>
    .mainColor {
        color: var(--theme-mainColor);
    }

    .borderColor {
        border-color: var(--theme-mainColor);
    }

    .hoverButtonColor:hover {
        color: var(--theme-mainColor);
    }
</style>
