<script lang="ts">
	import { onMount } from 'svelte';
	import { login } from '../actions/auth/login.action';
    import { userStore } from '../stores/user.store';
    import { displayLoginForm, displayRegistrationForm, showRegistrationForm } from '../stores/auth.store';
	import { me } from '../actions/user/me.action';
    import Modal from '../components/common/modal.svelte';
    import Login from '../components/auth/login.svelte';
    import Registration from '../components/auth/registration.svelte';
    import Menu from '../components/common/menu.svelte';
    import PitchForm from '../components/pitch/pitch-form.svelte';
	import { hideLoginForm, hideRegistrationForm, showLoginForm } from '../stores/auth.store';;
	import { hideNewPitchModal, openNewPitchModal, showNewPitchModal } from '../stores/pitch.store';
    import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public'
	import { goto } from '$app/navigation';
	import { googleAuth } from '../actions/auth/google-auth.action';

    if (typeof window !== 'undefined') {
        window.handlegoogleOneTapLogin = (response: any) => {
            googleAuth(response.credential);
        }
    }

    const handleLogin = async (email: string, password: string) => {
        try {
            await login(email, password);
            hideLoginForm();
        } catch (e) {
            console.error(e);
        }
    }

    const setupGoogleOneTap = () => {
        google.accounts.id.initialize({
            client_id: PUBLIC_GOOGLE_CLIENT_ID,
            callback: window.handlegoogleOneTapLogin
        });
        google.accounts.id.prompt();
    }

    onMount(async () => {
        if (localStorage && localStorage.getItem('token')) {
            try {
                await me();
            } catch (e) {
                goto('/');
                setupGoogleOneTap();
            }
        } else {
            goto('/');
            setupGoogleOneTap();
        }
    });
</script>

<svelte:head>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<header class="p-5 bg-black">
    <nav class="flex justify-between items-center w-full">
        <div id="logo" class="w-2/6"><a href="/"><img src="/images/logo.png" alt="logo Pitch hunt" /></a></div>
        <div id="navbar" class="relative flex flex-row items-center space-x-4">
            {#if $userStore}
                <button 
                    on:click={() => showNewPitchModal()} 
                    class="px-5 py-2 text-black bg-secondary hover:bg-black hover:text-secondary border hover:border-secondary rounded cursor-pointer sm:block hidden"
                >
                    Create pitch
                </button>
                <Menu />
            {:else}
                <button 
                    on:click={() => showLoginForm()} 
                    class="px-5 py-2 text-black bg-secondary hover:bg-black hover:text-secondary border hover:border-secondary rounded cursor-pointer"
                >
                    Login
                </button>
                <button 
                    on:click={() => showRegistrationForm()} 
                    class="px-5 py-2 text-black bg-secondary hover:bg-black hover:text-secondary border hover:border-secondary rounded cursor-pointer"
                >
                    Registration
                </button>
            {/if}
        </div>
    </nav>
</header>
<Modal open={$displayLoginForm} onClose={() => hideLoginForm()} zIndex='z-[100]'>
    <div slot="head">Please login</div>
    <div slot="body"><Login onCancel={hideLoginForm} handleLogin={handleLogin} /></div>
</Modal>
<Modal open={$displayRegistrationForm} onClose={() => hideRegistrationForm()} zIndex='z-[100]'>
    <div slot="head">Create account</div>
    <div slot="body"><Registration onCancel={hideRegistrationForm} /></div>
</Modal>
<Modal open={$openNewPitchModal} onClose={() => hideNewPitchModal()}>
    <div slot="head">Add pitch</div>
    <div slot="body"><PitchForm onCancel={hideNewPitchModal} /></div>
</Modal>