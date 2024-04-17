<script lang="ts">
	import { onMount } from "svelte";
    import ConfirmBox from "../../components/common/confirm-box.svelte";
	import { listMyPitches } from "../../actions/pitch/list-my-pitches.action";
	import { publishPitch } from "../../actions/pitch/publish-pitch.action";
	import { deletePitch } from "../../actions/pitch/delete-pitch.action";
	import { myPitchesStore, showNewPitchModal } from "../../stores/pitch.store";
	import { userStore } from "../../stores/user.store";

    onMount(async () => {
        listMyPitches();
    });

    let showConfirm = false;
    let currentPitchId: string;

    const handleDeletePitch = (id: string) => {
        currentPitchId = id;
        showConfirm = true;
    }

    const handlePublishPitch = (id: string) => {
        publishPitch(id);
    }

    const confimDeletePitch = () => {
        deletePitch(currentPitchId);
        showConfirm = false;
    }

    const cancelDeletePitch = () => {
        showConfirm = false;
    }
</script>

<main class="px-12">
    <div class="flex flex-row">
        <div class="w-full border border-secondary bg-black opacity-70 m-6 p-4 rounded">
            <div class="flex flex-row items-center">
                <img src="images/avatar/p2.png" alt="avatar" class="w-24 h-24 rounded-full border border-secondary" />
                <div class="flex flex-col space-y-2 pl-5 w-full">
                    <div class="text-4xl text-secondary">{$userStore?.username}</div>
                    <div class="text-secondary flex flex-col space-y-2">
                        <div class="text-sm">Total likes received: <span class="text-green">102</span></div>
                        <div class="text-sm">Total dislikes received: <span class="text-red">35</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full text-center"></div>
        <div class="w-full text-center"></div>
    </div>
    
    <h2 class="text-2xl pt-8 pb-4 text-secondary">My pitchs</h2>
    <hr class="border-secondary pb-4 opacity-50 border-t-2" />
    {#if $myPitchesStore.pitches?.length > 0}
        {#each $myPitchesStore.pitches as pitch}
            <div class="grid grid-cols-8 bg-black opacity-70 my-6 text-sm">
                <div class="flex flex-col w-full space-y-2 p-4">
                    <span class="text-secondary">Creation date</span>
                    <span class="text-white">{new Date(pitch.created_at).toLocaleDateString()}</span>
                </div>
                <div class="flex flex-col w-full space-y-2 p-4">
                    <span class="text-secondary">Title</span>
                    <span class="text-white">{pitch.title}</span>
                </div>
                <div class="flex flex-col w-full space-y-2 p-4">
                    <span class="text-secondary">Description</span>
                    <span class="text-white">{pitch.description}</span>
                </div>
                <div class="flex flex-col w-full space-y-2 p-4">
                    <span class="text-secondary">likes</span>
                    <span class="text-white">{pitch.like}</span>
                </div>
                <div class="flex flex-col w-full space-y-2 p-4">
                    <span class="text-secondary">Dislike</span>
                    <span class="text-white">{pitch.dislike}</span>
                </div>
                <div class="flex flex-col w-full space-y-2 p-4">
                    <span class="text-secondary">Duration</span>
                    <span class="text-white">{pitch.video?.duration || 0}</span>
                </div>
                <div class="flex flex-col w-full space-y-2 p-4">
                    <span class="text-secondary">Status</span>
                    <span class="text-white">{pitch.status}</span>
                </div>
                <div class="flex flex-col w-full space-y-2 p-4">
                    <span class="text-secondary">Actions</span>
                    <div class="flex flex-row space-x-2">
                        {#if pitch.status === 'draft'}
                            <button on:click={() => handlePublishPitch(pitch.id)} class="bg-tertiary border border-tertiary hover:border-tertiary hover:bg-black hover:text-tertiary rounded-lg p-1 text-black hover:text-tertiary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </button>
                        {/if}
                        <button on:click={() => handleDeletePitch(pitch.id)} class="bg-red border border-red hover:border-red hover:bg-black hover:text-red rounded-lg p-1 text-black hover:text-red">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>                                                       
                        </button>
                    </div>
                </div>
            </div>
        {/each}
    {:else}
        <div class="bg-black opacity-70 my-6 text-sm p-4 w-1/3 flex flex-col">
            <span class="text-secondary">No pitch yet. Here we go to create the first</span>
            <div class="m-4">
                <button 
                    on:click={() => showNewPitchModal()} 
                    class="px-5 py-2 text-black bg-secondary hover:bg-black hover:text-secondary border hover:border-secondary rounded cursor-pointer"
                >
                    Click here
                </button>
            </div>
        </div>
    {/if}
</main>
<ConfirmBox showConfirm={showConfirm} message="Are you sure you want to delete this pitch?" onConfirm={confimDeletePitch} onCancel={cancelDeletePitch} />