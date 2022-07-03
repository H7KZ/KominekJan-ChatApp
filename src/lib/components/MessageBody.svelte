<script lang="ts">
    import {getUserPFP} from "/src/lib/functions/chatroom";

    export let message: any;

    export let nameColor: string;
</script>

<div
        class="w-full flex gap-2 text-grayWhite mt-3"
        style="--theme-nameColor: {nameColor};"
>
    <div class="flex-shrink-0 w-12">
        <div class="relative w-full h-10 sm:h-12">
            <img
                    alt="PFP"
                    class="rounded-full w-10 h-10 origin-center object-cover sm:w-12 sm:h-12"
                    src={getUserPFP(message.user.photoURL)}
            />
            <img
                    alt=""
                    class="{message.badge
					? ''
					: 'hidden'} absolute bottom-0 right-0 h-5 w-5"
                    src={message.badge}
            />
        </div>
    </div>

    <div class="flex flex-col w-full">
        <div class="w-full">
            <h2 class="text-sm nameColor sm:text-base m-0">
                {message.user.display_name}
                &nbsp;&nbsp;&nbsp;
                <!--suppress JSUnresolvedVariable -->
                <span class="text-xs text-[#9e9e9e]">
					{new Date(message.createdAt).toLocaleString()}
				</span>
            </h2>
        </div>
        <p class="text-[#f0f0f0] text-xs break-all mr-3 sm:text-sm">
            {message.text}
        </p>
    </div>
</div>

<style scoped>
    .nameColor {
        color: var(--theme-nameColor);
    }
</style>
