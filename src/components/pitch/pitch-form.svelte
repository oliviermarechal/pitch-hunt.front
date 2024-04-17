<script lang="ts">
	import { goto } from "$app/navigation";
	import { createPitch } from "../../actions/pitch/create-pitch.action";
	import { hideNewPitchModal } from "../../stores/pitch.store";

    export let onCancel: () => void;

    let title = '';
    let loading = false;
    let description = '';
    let files: FileList;

    async function handleSubmit() {
        if (!files || files.length === 0) {
            return;
        }

        loading = true;
        const formData = new FormData();
        formData.set('title', title);
        formData.set('description', description);
        formData.set('video', files[0]);

        const result = await createPitch(formData);
        loading = false;
        if (result.success) {
            hideNewPitchModal();
        } else {
            console.error(result.error);
        }
    }
</script>

{#if loading}
    <p>Waiting...</p>
{/if}
<form on:submit|preventDefault={handleSubmit} class="space-y-4 text-secondary">
    <div>
        <label for="video" class="block text-sm font-medium">Video</label>
        <input type="file" accept="video/*" id="video" bind:files={files} class="w-full mt-1 mb-3 p-2 rounded bg-primary opacity-70 text-secondary" />
    </div>
    <div>
        <label for="title" class="block text-sm">Title</label>
        <input id="title" type="text" bind:value={title} class="w-full mt-1 mb-3 p-2 rounded bg-primary opacity-70 text-secondary" />
    </div>
    <div>
        <label for="description" class="block text-sm">Description</label>
        <textarea id="description" bind:value={description} rows="3" class="w-full mt-1 mb-3 p-2 rounded bg-primary opacity-70 text-secondary"></textarea>
    </div>
    <div class="flex space-x-4">
        <button class="w-full py-2 px-4 border bg-black hover:bg-secondary hover:text-black text-secondary rounded" on:click={onCancel}>Annuler</button>
        <button type="submit" class="w-full py-2 px-4 border hover:border-secondary hover:bg-black bg-secondary text-black hover:text-secondary rounded">Créer un pitch</button>
    </div>
</form>