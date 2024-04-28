<script lang="ts">
	import { addComment } from '../../actions/comment/add-comment.action';
	import { deleteComment } from '../../actions/comment/delete-comment.action';
	import { showLoginForm } from '../../stores/auth.store';
    import type { Comment } from '../../stores/pitch.store';
	import { userStore } from '../../stores/user.store';
    import { format } from 'timeago.js';

    export let pitchId: string;
    export let comment: Comment;
    export let isAnswer = false;

    const containerClass = isAnswer ? 'ml-8 bg-black p-2 mb-4 -mt-2' : 'w-full bg-black px-2 pt-4 mb-4 pb-1';

    let isExpanded = false;
    let displayInputAnswer = false;

    const showInputAnswer = () => {
        if (!$userStore) {
            showLoginForm();
        } else {
            displayInputAnswer = true;
        }
    }

    const toggleExpanded = () => {
        isExpanded = !isExpanded;
    }

    const truncateContent = (content: string, maxLength: number) => {
        if (content.length > maxLength) {
            return content.slice(0, maxLength) + '...';
        }

        return content;
    }

    let answer = '';
    const sendResponse = () => {
        addComment(pitchId, answer, comment.id);
        displayInputAnswer = false;
        answer = '';
    }

    let showMenu = false;

    function toggleMenu() {
        showMenu = !showMenu;
    }

    $: if (!showMenu) {
        document.removeEventListener('click', handleClickOutside);
    } else {
        document.addEventListener('click', handleClickOutside);
    }

    const handleClickOutside = (event: any) => {
        if (!event.target.closest('.dropdown')) {
            showMenu = false;
        }
    };

    const handleDelete = async () => {
        await deleteComment(comment.id, pitchId, comment.parent_id);
        showMenu = false;
    }
</script>

<div class="{containerClass} relative">
    {#if comment.author.id == $userStore?.id && !comment.deleted}
        <button class="absolute top-0 right-3 text-secondary w-5 h-5 cursor-pointer dropdown" on:click={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>          
        </button>
        {#if showMenu}
            <div class="absolute dropdown right-0 mt-2 w-48 rounded-md shadow-lg bg-black border border-secondary ring-opacity-5 z-20">
                <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button class="block px-4 py-2 text-sm text-secondary hover:bg-secondary hover:text-black w-full text-left">Edit</button>
                    <button on:click={handleDelete} class="block px-4 py-2 text-sm text-secondary hover:bg-secondary hover:text-black w-full text-left">Delete</button>
                </div>
            </div>
        {/if}
    {/if}
    <div class="flex">
        <div class="flex w-5/12 border-r-2 border-secondary space-x-2">
            <img
                src="images/avatar/p2.png"
                alt="avatar"
                class="w-10 h-10 rounded-full border border-secondary"
            />
            <div class="flex flex-col">
                <span class="text-secondary text-sm">{comment.author.username}</span>
                <small class="text-white text-xs">{format(comment.created_at)} {#if comment.updated } <i>updated</i> {/if}</small>
            </div>
        </div>
        <div class="flex flex-col w-8/12 items-start p-2">
            {#if comment.deleted }
                <p class="grey-text text-xs">Deleted comment...</p>
            {:else if comment.content.length <= 25}
                <p class="text-white text-xs">{comment.content}</p>
            {:else if isExpanded}
                <p class="text-white text-xs">{comment.content}</p>
                <button on:click={toggleExpanded} class="text-xs text-tertiary"> See less</button>
            {:else}
                <p class="text-white text-xs">{truncateContent(comment.content, 25)}</p>
                <button on:click={toggleExpanded} class="text-xs text-tertiary self-start"> See more</button>
            {/if}
        </div>
    </div>
    {#if !isAnswer && !displayInputAnswer && !comment.deleted}
        <div class="w-full flex flex-row justify-end">
            <button on:click={showInputAnswer} class="m-0 p-0 text-tertiary text-xs">Answer</button>
        </div>
    {/if}
</div>

{#if displayInputAnswer}
    <div class="bg-black ml-8 p-2 my-2">
        <textarea bind:value={answer} class="w-full bg-black border-b-2 border-secondary text-white text-xs" placeholder="Your answer" />
        <div class="flex justify-end"><button on:click={sendResponse} class="text-tertiary text-xs">Send</button></div>
    </div>
{/if}

{#if comment.childs }
    {#each comment.childs as childComment}
        <svelte:self comment={childComment} pitchId={pitchId} isAnswer={true} />
    {/each}
{/if}