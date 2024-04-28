import apiClient from "$lib/api"

export async function pitchOpened(pitchId: string) {
    await apiClient.post(
        `/api/pitch/${pitchId}/opened`,
        {},
        { headers: {
            'Content-Type': 'application/json'
        }},
    )
}