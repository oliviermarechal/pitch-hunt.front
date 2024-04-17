import apiClient from "$lib/api"
import { userStore } from "../../stores/user.store"

export async function login(email: string, password: string) {
    const response = await apiClient.post(
        '/api/login',
        { email, password },
        { headers: {
            'Content-Type': 'application/json'
        }},
    )

    if (response.status === 200) {
        const {token, user } = response.data;
        if (localStorage) localStorage.setItem('token', token);
        userStore.set(user);
    }
    // TODO Manage errors
}