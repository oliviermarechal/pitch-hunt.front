<script lang="ts">
    import { getLastPublished } from '../actions/pitch/last-published.action';
	import { lastPublishedStore, type Pitch } from '../stores/pitch.store';
	import { userStore } from '../stores/user.store';
	import { like } from '../actions/pitch/like.action';
    
    import { onMount } from 'svelte';
	import { showLoginForm } from '../stores/auth.store';
	import PitchCard from '../components/pitch/pitch-card.svelte';

    onMount(() => {
        getLastPublished();
    });

    const handleLike = async (pitchId: string, type: 'up' | 'down') => {
        if ($userStore) {
            await like(pitchId, type);
        } else {
            showLoginForm();
        }
    }
</script>

<main class="mx-auto p-4 lg:p-8">
    <div class="bg-primary opacity-80 grey-text p-4 lg:w-1/2 xs:w-full">
        <h1 class="text-2xl">Welcome to <span class="text-secondary">Pitch hunt</span></h1>
        <p>Platform to evaluate your product idea</p>
    </div>
    <h2 class="text-3xl p-4 font-russo-one text-secondary">Last published</h2>
    {#if $lastPublishedStore.error}
        {$lastPublishedStore.error}
    {/if}

    {#if $lastPublishedStore.loading}
        <p>Loading...</p>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
            {#each $lastPublishedStore?.pitches as pitchData}
                <PitchCard
                    pitch={pitchData.pitch} 
                    userLike={pitchData.user_liked ? pitchData.type : null} 
                    onLike={handleLike}
                />
            {/each}
        </div>
    {/if}
</main>