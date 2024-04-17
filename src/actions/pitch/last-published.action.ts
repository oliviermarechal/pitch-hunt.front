import apiClient from "$lib/api"
import { lastPublishedStore } from "../../stores/pitch.store"

export async function getLastPublished() {
    lastPublishedStore.update(store => ({...store, loading: true}));
    const response = await apiClient.get(
        '/api/pitch/last-published',
        { headers: {
            'Content-Type': 'application/json'
        }},
    )

    if (response.status === 200) {
        lastPublishedStore.set({pitches: response.data, loading: false});
        return;
    }

    lastPublishedStore.set({pitches: response.data, loading: false, error: "Error during fetching pitches. Please try again later."});
}