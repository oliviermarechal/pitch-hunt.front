import apiClient from "$lib/api"
import { myPitchesStore } from "../../stores/pitch.store"

export async function publishPitch(pitchId: string) {
    const response = await apiClient.post(
        `/api/pitch/${pitchId}/publish`,
        {},
        { headers: {
            'Content-Type': 'application/json'
        }},
    )

    if (response.status === 200) {
        myPitchesStore.update(store => ({
            ...store, 
            pitches: store.pitches.map(pitch => pitch.id !== response.data.id ? pitch : {...pitch, status: 'published'})
        }));

        return;
    }
}