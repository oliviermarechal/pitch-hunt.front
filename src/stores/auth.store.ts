import { writable } from 'svelte/store';

export const displayLoginForm = writable<boolean>(false);
export const displayRegistrationForm = writable<boolean>(false);

export function showLoginForm() {
    displayLoginForm.set(true);
}

export function hideLoginForm() {
    displayLoginForm.set(false);
}

export function showRegistrationForm() {
    displayRegistrationForm.set(true);
}

export function hideRegistrationForm() {
    displayRegistrationForm.set(false);
}