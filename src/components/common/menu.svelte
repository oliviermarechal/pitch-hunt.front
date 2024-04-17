<script lang="ts">
    import { onMount } from 'svelte';
    import { userStore } from '../../stores/user.store';
    import { goto } from '$app/navigation';

    let dropdownOpen = false;
  
    const toggleDropdown = () => {
      dropdownOpen = !dropdownOpen;
    };

    const handleLogout = () => {
        if (typeof localStorage !== undefined) {
            localStorage.removeItem('token');
            userStore.set(null);
            goto('/')
        }
    }
  
    onMount(() => {
        const handleClickOutside = (event: any) => {
            if (!event.target.closest('.dropdown')) {
                dropdownOpen = false;
            }
        };
  
        document.addEventListener('click', handleClickOutside);
  
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
</script>
  
<div class="relative inline-block text-left">
    <div class="dropdown">
        <button
            class="rounded-full focus:outline-none"
            on:click={toggleDropdown}
        >
            <img
            src="images/avatar/p2.png"
            alt="avatar"
            class="w-16 h-16 rounded-full border border-secondary"
            />
        </button>
        {#if dropdownOpen}
            <div
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black ring-1 ring-secondary ring-opacity-5 text-secondary"
            >
                <div class="py-1 mx-4 text-left" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <a
                        href="/profile"
                        on:click={toggleDropdown}
                        class="block px-4 py-2 text-sm rounded hover:border-secondary border-black border"
                        role="menuitem">
                        Profile
                    </a>
                    <hr class="border-t border-gray-200 my-2" />
                    <button
                        class="w-full block text-left px-4 py-2 text-sm rounded hover:border-secondary border-primary border"
                        role="menuitem"
                        on:click={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        {/if}
    </div>
</div>