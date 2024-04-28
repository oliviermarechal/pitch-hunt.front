<script lang="ts">
	import type { Pitch } from "../../stores/pitch.store";
	import Modal from "../common/modal.svelte";
	import PitchView from "./pitch-view.svelte";
	import Thumbnail from "./thumbnail.svelte";

    export let pitch: Pitch;
    export let userLike: 'up' | 'down' | null = null;
    export let onLike: (pitchId: string, type: 'up' | 'down') => any;

    const maxDescriptionLength = 100;
    const truncateDescription = () => {
        if (pitch.description.length > maxDescriptionLength) {
            return pitch.description.slice(0, maxDescriptionLength) + '...';
        }

        return pitch.description;
    }

    const formatDuration = (duration: number) => {
        const min = Math.floor(duration / 60);
        const secondesleft = duration % 60;

        return `${min}:${secondesleft < 10 ? '0' : ''}${secondesleft}`;
    }
    
    let open = false;
</script>

<div class="pitch-card bg-primary md:my-6 max-sm:py-4 px-4 md:content-center">
    <div class="flex flex-col md:flex-row justify-between md:space-x-4 md:h-full">
        <div class="text-secondary md:w-7/12 w-full">
            <div on:click={() => open = true}>
                <Thumbnail videoUrl={pitch.video?.url} />
            </div>
        </div>
        <div class="md:w-5/12 md:h-full w-full">
            <div class="flex flex-col justify-between h-full py-4">
                <div class="flex flex-col space-y-2">
                    <h2 class="text-secondary w-10/12">{pitch.title}</h2>
                    <span class="text-xs text-white">{truncateDescription()}</span>
                    <button on:click={() => open = true} class="text-xs text-tertiary self-start"> See more</button>
                    <div class="text-xs text-white p-Z">{formatDuration(pitch.video?.duration || 0)} - <span class="text-secondary">{pitch.user?.username}</span></div>
                </div>
                <div class="flex flex-row justify-center text-white items-center">
                    <span class="w-1/6 text-center text-tertiary">{pitch.like}</span>
                    <div>
                        <button on:click={() => onLike(pitch.id, 'up')} class="rounded-xl {userLike && userLike === 'up' ? 'text-primary bg-tertiary' : 'bg-primary text-tertiary'} p-1 hover:text-primary hover:bg-tertiary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                            </svg>
                        </button>
                        <button on:click={() => onLike(pitch.id, 'down')} class="rounded-xl {userLike && userLike === 'down' ? 'text-primary bg-red' : 'bg-primary text-red'} p-1 hover:text-primary hover:bg-red">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                            </svg>                         
                        </button>
                    </div>
                    <span class="w-1/6 text-center text-red">{pitch.dislike}</span>
                </div>
            </div>
        </div>
    </div>
</div>

{#if open}
    <Modal open={open} onClose={() => open = false} bgClass={'bg-pitch-view'} largeWidth={true}>
        <div slot="head">{pitch.title}</div>
        <div slot="body"><PitchView {pitch} {userLike} {onLike} /></div>
    </Modal>
{/if}


<style>
    @media (min-width: 768px) {
        .pitch-card {
            clip-path: polygon(0 0, 85% 0, 100% 35%, 100% 10%, 100% 100%, 0 100%);
            max-height: 220px;
            max-width: 650px;
        }
    }

    @media (min-width: 640px) and (max-width: 768px) {
        .pitch-card {
            clip-path: polygon(0 0, 85% 0, 100% 35%, 100% 10%, 100% 100%, 0 100%);
        }
    }
</style>