<script lang="ts">
    export let open = false;
    export let onClose: () => any;
</script>

{#if open}
    <div class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0">
        <div class="modal-overlay fixed w-full h-full bg-primary opacity-50"></div>
        <div class="w-full lg:h-max lg:w-1/2 mx-auto shadow-xl z-50 overflow-y-auto border-b-2 border-secondary">
            <div class="justify-between bg-primary text-secondary flex py-5 px-8 border-b-0 border">
                <div class="text-2xl font-extrabold flex-grow text-center">
                  <slot name="head" />
                </div>
                <button class="text-secondary font-bold text-xl" on:click="{onClose}">&times;</button>
            </div>
            <div class="content h-70 py-16 px-24 modal-bg">
                <slot name="body" />
            </div>
        </div>
    </div>
{/if}