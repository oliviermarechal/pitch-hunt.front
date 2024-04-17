import apiClient from "$lib/api"
import { lastPublishedStore } from "../../stores/pitch.store";

export async function like(pitchId: string, type: 'up' | 'down'): Promise<{success: boolean, error?: string}> {
    const response = await apiClient.post(
        `/api/pitch/${pitchId}/like`,
        { type: type },
        { headers: {
            'Content-Type': 'application/json'
        }},
    )

    if (response.status === 200) {
        lastPublishedStore.update((store) => {
            const pitchIndex = store.pitches.findIndex((pitch) => pitch.pitch.id === pitchId);
            if (pitchIndex !== -1) {
                store.pitches[pitchIndex].pitch = {
                    ...store.pitches[pitchIndex].pitch,
                    like: response.data.like,
                    dislike: response.data.dislike,
                };
                store.pitches[pitchIndex].user_liked = true;
                store.pitches[pitchIndex].type = type;
            }

            return store;
        });

        return {success: true};
    }

    return {success: false, error: response.data.error };
}