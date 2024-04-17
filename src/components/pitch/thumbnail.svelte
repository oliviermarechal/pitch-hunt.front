<script lang="ts">
    export let imageUrl = 'images/logo.png';
</script>

<div class="thumbnail w-50 h-50 bg-center bg-cover flex items-center justify-center" style="background-image: url({imageUrl});">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 cursor-pointer">
        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clip-rule="evenodd" />
    </svg>
</div>

<style>
    .thumbnail {
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center top;
    }
</style>