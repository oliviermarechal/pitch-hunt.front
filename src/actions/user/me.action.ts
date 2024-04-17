import apiClient from "$lib/api"
import { userStore } from "../../stores/user.store"

export async function me() {
    const response = await apiClient.get(
        '/api/me',
        { headers: {
            'Content-Type': 'application/json'
        }},
    )

    if (response.status === 200) {
        userStore.set(response.data);
    }
}