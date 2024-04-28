<script lang="ts">
    export let open = false;
    export let bgClass = 'modal-bg';
    export let largeWidth = false;
    export let zIndex: string | null = null;
    export let onClose: () => any;


    const widthClass = largeWidth ? "lg:w-10/12 xl:w-2/3" : "lg:w-1/2 xl:w-1/2";
</script>

{#if open}
    <div class="modal {zIndex ? zIndex : 'z-50'} fixed w-full h-full top-0 left-0 flex md:items-center justify-center sm:p-8 p-0 lg:p-0">
        <div class="modal-overlay fixed w-full h-full bg-primary opacity-50"></div>
        <div class="w-full max-h-screen {widthClass} mx-auto shadow-xl {zIndex ? zIndex : 'z-50'} overflow-y-auto border-b-2 border-secondary">
            <div class="justify-between bg-primary text-secondary flex py-5 px-8 border-b-0 border">
                <div class="text-2xl font-extrabold flex-grow text-center">
                  <slot name="head" />
                </div>
                <button class="text-secondary font-bold text-xl" on:click="{onClose}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="content {bgClass}">
                <slot name="body" />
            </div>
        </div>
    </div>
{/if}