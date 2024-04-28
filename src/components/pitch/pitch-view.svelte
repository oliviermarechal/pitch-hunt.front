<script lang="ts">
	import type { Pitch } from '../../stores/pitch.store';
    import { isFollowing, userStore } from '../../stores/user.store';
    import Player from './player.svelte';
	import RowComment from '../comment/row.comment.svelte';
	import { addComment } from '../../actions/comment/add-comment.action';
	import { showLoginForm } from '../../stores/auth.store';
	import { follow } from '../../actions/pitch/follow.action';
	import { unfollow } from '../../actions/pitch/unfollow.action';
	import { onMount } from 'svelte';
	import { pitchOpened } from '../../actions/analytics';

    export let pitch: Pitch;
    export let userLike: 'up' | 'down' | null = null;
    export let onLike: (pitchId: string, type: 'up' | 'down') => any;

    let commentInputValue = '';
    let descriptionExpanded = false;

    const maxDescriptionLength = 125;
    const toggleExpanded = () => {
        descriptionExpanded = !descriptionExpanded;
    }

    onMount(() => {
        pitchOpened(pitch.id);
    });

    const truncateDescription = () => {
        if (pitch.description.length > maxDescriptionLength && !descriptionExpanded) {
            return pitch.description.slice(0, maxDescriptionLength) + '...';
        }

        return pitch.description;
    }

    const sendResponse = () => {
        if (!$userStore) {
            showLoginForm();
        } else {
            addComment(pitch.id, commentInputValue);
            commentInputValue = '';
        }
    }

    const countComments = (): number => {
        let count = pitch.comments?.length || 0;
        pitch.comments?.map(c => {
            if (c.childs && c.childs.length > 0) {
                count += c.childs.length;
            }        
        });

        return count;
    }

    const handleUnfollow = () => {
        if ($userStore) {
            unfollow(pitch.id)
        } else {
            showLoginForm()
        }
    }

    const handleFollow  = () => {
        if ($userStore) {
            follow(pitch.id)
        } else {
            showLoginForm()
        }
    }
</script>
  
<div class="flex flex-col lg:flex-row p-4">
    <div class="flex flex-col lg:w-7/12">
        <div class="mx-5 mt-2 rounded-xl">
            <Player videoUrl={pitch.video?.url} pitchId={pitch.id} />
        </div>
        <div class="mr-5 ml-8 m-2 flex flex-col lg:flex-row justify-between text-white lg:items-center">
            <div class="flex space-x-4 items-center">
                <span>{pitch.title}</span>
                <div>
                    {#if isFollowing(pitch.id)}
                        <button 
                            on:click={() => handleUnfollow()}
                            class="group bg-black text-secondary hover:bg-secondary hover:text-black border border-secondary px-2 py-1 rounded flex items-center space-x-1">
                            <small class="text-xs rounded-full bg-secondary group-hover:bg-black group-hover:text-secondary px-2 text-black">{pitch.nb_followers}</small> <span>Unfollow</span>
                        </button>
                    {:else}
                        <button 
                            on:click={() => handleFollow()}
                            class="group hover:bg-black hover:text-secondary bg-secondary text-black border border-secondary px-2 py-1 rounded flex items-center space-x-1">
                            <small class="text-xs rounded-full bg-black px-2 text-secondary group-hover:bg-secondary group-hover:text-black">{pitch.nb_followers}</small> <span>Follow</span>
                        </button>
                    {/if}
                </div>
            </div>
            <div class="rounded-xl bg-black flex justify-end start-end text-white">
                <span class="p-2 w-8 mr-0.5 text-center text-tertiary">{pitch.like}</span>
                <div class="flex items-center space-x-2">
                    <button on:click={() => onLike(pitch.id, 'up')} class="rounded-xl {userLike && userLike === 'up' ? 'text-primary bg-tertiary' : 'bg-primary text-tertiary'} p-0.5 hover:text-primary hover:bg-tertiary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>
                    </button>
                    <button on:click={() => onLike(pitch.id, 'down')} class="rounded-xl {userLike && userLike === 'down' ? 'text-primary bg-red' : 'bg-primary text-red'} p-0.5 hover:text-primary hover:bg-red">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                        </svg>                         
                    </button>
                </div>
                <span class="p-2 w-8 ml-0.5 text-center text-red">{pitch.dislike}</span>
            </div>
        </div>
        <div class="mx-5 p-4 text-white text-xs bg-black space-y-2">
            <h2 class="text-md text-secondary">Description</h2>
            <span>
                {#if pitch.description.length > maxDescriptionLength}
                    {#if descriptionExpanded}
                        {pitch.description}
                        <button on:click={toggleExpanded} class="text-xs text-tertiary"> See less</button>
                    {:else}
                        {truncateDescription()}
                        <button on:click={toggleExpanded} class="text-xs text-tertiary self-start"> See more</button>
                    {/if}
                {:else}
                    {pitch.description}
                {/if}
            </span>
        </div>
    </div>
    <div class="lg:w-5/12 mx-4 mt-4 lg:relative">
        <h2 class="text-secondary text-xl">{countComments()} Comments</h2>
        <hr class="border-secondary pb-4 opacity-50 border-t-2" />
        <div class="flex flex-col space-y-2 justify-between h-[90%]">
            {#if pitch.comments && pitch.comments.length > 0}
                <div class="overflow-auto max-h-[450px]">
                    {#each pitch.comments as comment}
                        <RowComment comment={comment} pitchId={pitch.id} />
                    {/each}
                </div>
            {/if}
            <div class="w-full bg-black p-2 mt-2 max-lg:mb-6">
                <textarea 
                    bind:value={commentInputValue}
                    class="w-full bg-black border-b-2 border-secondary text-white text-xs"
                    placeholder="Your comment"
                    disabled={Boolean(!$userStore)}
                />
                <div class="flex justify-end"><button on:click={sendResponse} class="text-tertiary text-xs">Send</button></div>
            </div>
        </div>
    </div>
</div>
