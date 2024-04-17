import apiClient from "$lib/api"
import { myPitchesStore } from "../../stores/pitch.store"

export async function deletePitch(pitchId: string) {
    const response = await apiClient.delete(
        `/api/pitch/${pitchId}`,
        { headers: {
            'Content-Type': 'application/json'
        }},
    )

    if (response.status === 204) {
        myPitchesStore.update(store => ({
            ...store, 
            pitches: store.pitches.filter(pitch => pitch.id !== pitchId)
        }));

        return;
    }
}