<script lang="ts">
	import { onMount } from "svelte";
	import { hideLoginForm, showRegistrationForm } from "../../stores/auth.store";
    import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public'

    export let handleLogin: (email: string, password: string) => any;
    export let onCancel: () => any;

    let email: string;
    let password: string;
    onMount(() => {
        google.accounts.id.initialize({
            client_id: PUBLIC_GOOGLE_CLIENT_ID,
            callback: window.handlegoogleOneTapLogin
        });
        google.accounts.id.renderButton(
            document.getElementById("googleButton"),
            { theme: "filled_black", size: "large", text: "continue_with", locale: "en-US" }
        );
    })

    const loginToRegistration = () => {
        hideLoginForm();
        showRegistrationForm();
    }
</script>

<svelte:head>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<form class="h-70 py-4 md:py-16 px-4 sm:px-12 md:px-24">
    <div class="flex flex-col space-y-4">
        <div>
            <label for="email-login" class="text-secondary">E-mail</label>
            <input id="email-login" bind:value={email} type="text" placeholder="Enter your email" />
        </div>
        <div>
            <label for="password-login" class="text-secondary">Password</label>
            <input id="password-login" bind:value={password} type="password" placeholder="Password" />
        </div>
        <div>
            <div id="googleButton" class="flex justify-center w-full"></div>
        </div>
        <div class="flex flex-col space-y-1">
            <div class="flex flex-col sm:flex-row justify-center space-x-0 space-y-4 sm:space-x-4 sm:space-y-0 mt-4">
                <button type="button" on:click={() => onCancel()} class="py-2 px-4 text-secondary border border-secondary bg-primary rounded hover:border-secondary hover:bg-secondary hover:text-primary">Cancel</button>
                <button type="button" on:click={() => handleLogin(email, password)} class="py-2 px-4 text-primary border border-secondary bg-secondary rounded hover:border hover:bg-primary hover:text-secondary">Login</button>
            </div>
            <span class="text-center text-secondary">Or create account <button on:click={loginToRegistration}><u>here</u></button></span>
        </div>
    </div>
</form>

<style lang="postcss">
    input {
        @apply w-full mt-1 mb-3 p-2 rounded bg-primary opacity-70 text-secondary;
        background: radial-gradient(circle at 100% 100%, #000000 0, #000000 3px, transparent 3px) 0% 0%/8px 8px no-repeat,
              radial-gradient(circle at 0 100%, #000000 0, #000000 3px, transparent 3px) 100% 0%/8px 8px no-repeat,
              radial-gradient(circle at 100% 0, #000000 0, #000000 3px, transparent 3px) 0% 100%/8px 8px no-repeat,
              radial-gradient(circle at 0 0, #000000 0, #000000 3px, transparent 3px) 100% 100%/8px 8px no-repeat,
              linear-gradient(#000000, #000000) 50% 50%/calc(100% - 5px) calc(100% - 6px) no-repeat,
              linear-gradient(#000000, #000000) 50% 50%/calc(100% - 6px) calc(100% - 5px) no-repeat,
              linear-gradient(15deg, #fcee07 35%, transparent 35%, transparent 65%, #fcee07 65%)
    }
</style>