import apiClient from "$lib/api"
import { userStore } from "../../stores/user.store";

export async function googleAuth(idToken: string) {
    const response = await apiClient.post(
        '/api/google-auth',
        { id_token: idToken},
        { headers: {
            'Content-Type': 'application/json'
        }},
    )
    
    if (response.status === 200) {
        const {token, user } = response.data;
        if (localStorage) localStorage.setItem('token', token);
        userStore.set(user);
    }
}