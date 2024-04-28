import apiClient from "$lib/api"
import { lastPublishedStore } from "../../stores/pitch.store";
import { userStore } from "../../stores/user.store";

export async function unfollow(pitchId: string) {
    const response = await apiClient.post(
        `/api/pitch/${pitchId}/unfollow`,
        {},
        { headers: {
            'Content-Type': 'application/json'
        }},
    )

    if (response.status === 200) {
        lastPublishedStore.update((store) => {
            const pitch = store.pitches.find((pitch) => pitch.pitch.id === pitchId);
            if (pitch) {
                pitch.pitch.nb_followers--;
            }

            return store;
        });

        userStore.update((user) => {
            if (user) {
                if (user?.followed_pitches && Array.isArray(user?.followed_pitches)) {
                    user.followed_pitches = [
                        ...user.followed_pitches.filter(p => p.id !== pitchId)
                    ];
                }
            }

            return user;
        })
    }
}