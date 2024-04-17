import apiClient from "$lib/api"
import { userStore } from "../../stores/user.store"

export async function register(email: string, password: string): Promise<{success: boolean, error?: string}>{
    const response = await apiClient.post(
        '/api/registration',
        { email, password },
        { headers: {
            'Content-Type': 'application/json'
        }},
    )

    if (response.status === 201) {
        const {token, user } = response.data;
        if (localStorage) localStorage.setItem('token', token);
        userStore.set(user);
        return { success: true }
    }

    return { success: false, error: response.data.message };
}