<script lang="ts">
    export let showConfirm = false
    export let message: string;

    export let onConfirm: Function;
    export let onCancel: Function;

</script>

{#if showConfirm}
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-primary text-secondary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="bg-primary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="text-lg leading-6 font-medium" id="modal-title">
                                {message}
                            </h3>
                        </div>
                    </div>
                </div>
                <div class="px-4 py-3 sm:px-6 flex justify-end space-x-4">
                    <button type="button" class="py-2 px-4 text-secondary border border-secondary bg-primary rounded hover:border-secondary hover:bg-secondary hover:text-primary" on:click={() => onCancel()}>
                        Cancel
                    </button>
                    <button type="button" class="py-2 px-4 text-primary border border-secondary bg-secondary rounded hover:bg-primary hover:text-secondary" on:click={() => onConfirm()}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}