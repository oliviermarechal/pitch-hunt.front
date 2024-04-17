import { writable } from 'svelte/store';

export interface Pitch {
    id: string;
    title: string;
    description: string;
    user_id: string;
    status: 'draft' | 'published';
    like: number;
    dislike: number;
    created_at: string;
    video?: {
        id: string;
        url: string;
        duration: number;
    }
}

export const lastPublishedStore = writable<{pitches: {pitch: Pitch, user_liked: boolean, type: 'up' | 'down'}[], loading: boolean, error?: string}>({ pitches: [], loading: false });
export const myPitchesStore = writable<{pitches: Pitch[], loading: boolean, error?: string}>({ pitches: [], loading: false });
export const openNewPitchModal = writable<boolean>(false);

export function showNewPitchModal() {
    openNewPitchModal.set(true);
}

export function hideNewPitchModal() {
    openNewPitchModal.set(false);
}