import apiClient from "$lib/api"
import { myPitchesStore } from "../../stores/pitch.store"

export async function createPitch(pitchData: FormData): Promise<{ success: boolean, error?: string, id?: string }> {
    const response = await apiClient.post(
        '/api/pitch',
        pitchData,
        { headers: {
            'Content-Type': 'multipart/form-data',
        }},
    )

    if (response.status === 200) {
        myPitchesStore.update(store => ({...store, pitches: [response.data, ...store.pitches]}));
        return {id: response.data.id, success: true};
    }

    return {success: false, error: response.data.error };
}