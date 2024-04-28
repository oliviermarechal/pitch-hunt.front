<script lang="ts">
	import { onMount } from "svelte";

    export let videoUrl: string | undefined;
    let imageUrl = 'images/logo.png';
    let canvas: HTMLCanvasElement;
    let video: HTMLVideoElement;

    let defaultBg = videoUrl ? '' : 'default-bg';
    onMount(() => {
        if (canvas && videoUrl) {
            const context = canvas.getContext('2d');

            video.addEventListener('loadedmetadata', () => {
                video.currentTime = 0;
                
                video.addEventListener('seeked', () => {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;

                    if (context) {
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    }
                });
            });
        }
    })
</script>

<div class="thumbnail py-4 bg-center bg-cover flex items-center justify-center rounded-xl {defaultBg}">
    <video bind:this={video} src="{videoUrl}" class="invisible h-0"><track kind="captions"></video>
    {#if videoUrl}
        <div class="relative max-w-full max-h-full rounded-xl cursor-pointer">
            <canvas bind:this={canvas} class="canvas-thumbnail rounded-xl"></canvas>
            <div class="absolute inset-0 bg-black opacity-30 rounded-xl flex justify-center items-center"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-secondary bg-black rounded-full">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clip-rule="evenodd" />
            </svg>
        </div>
    {:else}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 cursor-pointer">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clip-rule="evenodd" />
        </svg>
    {/if}
</div>

<style>
    .thumbnail {
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center top;
    }

    .canvas-thumbnail {
        display: block;
        height: auto;
        width: auto;
        max-height: 180px;
        max-width: 100%;
    }

    .default-bg {
        background-image: url(images/logo.png);
    }
</style>