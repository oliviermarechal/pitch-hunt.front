import apiClient from "$lib/api"

export async function videoPlayed(pitchId: string, percent: number) {
    await apiClient.post(
        `/api/pitch/${pitchId}/video-played`,
        { percent },
        { headers: {
            'Content-Type': 'application/json'
        }},
    )
}