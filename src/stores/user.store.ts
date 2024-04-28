import { get, writable } from 'svelte/store';
import type { Pitch } from './pitch.store';

export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    followed_pitches: Pitch[];
}

export const userStore = writable<User | null>(null);

export const isFollowing = (pitchId: string): boolean => {
    const followedPitches = get(userStore)?.followed_pitches;
    if (followedPitches && followedPitches.length > 0) {
        return !!followedPitches.find(p => p.id === pitchId);
    }

    return false;
}