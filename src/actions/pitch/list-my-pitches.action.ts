import apiClient from "$lib/api"
import { myPitchesStore } from "../../stores/pitch.store"

export async function listMyPitches() {
    myPitchesStore.update(store => ({...store, loading: true}));
    const response = await apiClient.get(
        '/api/pitch/my-pitches',
        { headers: {
            'Content-Type': 'application/json'
        }},
    )

    if (response.status === 200) {
        myPitchesStore.set({pitches: response.data, loading: false});
        return;
    }

    myPitchesStore.set({pitches: response.data, loading: false, error: "Error during fetching pitches. Please try again later."});
}