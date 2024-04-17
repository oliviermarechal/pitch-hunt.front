<script lang="ts">
	import { register } from "../../actions/auth/registration.action";
	import { hideRegistrationForm, showLoginForm } from "../../stores/auth.store";

    export let onCancel: () => any;

    let email: string;
    let password: string;
    let error: string | undefined;

    const handleRegistration = async (email: string, password: string) => {
        try {
            const result = await register(email, password);
            if (result.success) {
                hideRegistrationForm();
            } else {
                error = result.error;
                setTimeout(() => {
                    error = undefined;
                }, 2000)
            }
        } catch (e) {
            console.error(e);
        }
    }

    const registrationToLogin = () => {
        hideRegistrationForm();
        showLoginForm();
    }
</script>
<form class="px-20">
    <div class="flex flex-col space-y-4">
        {#if error}
            <span class='text-red'>{error}</span>
        {/if}
        <div>
            <label for="email-login" class="text-secondary">E-mail</label>
            <input id="email-login" bind:value={email} type="text" placeholder="Enter your email" />
        </div>
        <div>
            <label for="password-login" class="text-secondary">Password</label>
            <input id="password-login" bind:value={password} type="password" placeholder="Password" />
        </div>
        <div class="flex flex-col space-y-1">
            <div class="flex justify-center space-x-4 mt-4">
                <button type="button" on:click={() => onCancel()} class="py-2 px-4 text-secondary border border-secondary bg-primary rounded">Cancel</button>
                <button type="button" on:click={() => handleRegistration(email, password)} class="py-2 px-4 text-primary bg-secondary rounded">Register</button>
            </div>
            <span class="text-center text-secondary">Already have account ? <button on:click={registrationToLogin}><u>login</u></button></span>
        </div>
    </div>
</form>


<style lang="postcss">
    input,
    input:-webkit-autofill {
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