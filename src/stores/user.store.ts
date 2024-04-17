import { writable } from 'svelte/store';

export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
}

export const userStore = writable<User | null>(null);