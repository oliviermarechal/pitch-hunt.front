<script lang="ts">
    import Plyr from 'plyr';
    import 'plyr/dist/plyr.css';
    import { onDestroy, onMount } from 'svelte';
	import { videoPlayed } from '../../actions/analytics';
  
    export let videoUrl: string | undefined;
    export let pitchId: string;

    let player: Plyr | null = null;
    let bestProgress = 0;
    
    const handleTimeUpdate = () => {
        if (!player) return;
        const currentTime = player.currentTime;
        const duration = player.duration;

        const progress = Math.ceil((currentTime / duration) * 100);
        if (progress > bestProgress) {
            bestProgress = progress;
        }
    }


    onMount(() => {
        if (videoUrl === null) return;

        player = new Plyr('#player', {
            controls: ['play', 'progress', 'current-time', 'mute', 'settings', 'volume', 'fullscreen'],
            settings: ['quality', 'speed'],
            autoplay: false,
            loop: {
                active: false
            },
        });
        player.on('timeupdate', handleTimeUpdate);
    });
  
    onDestroy(() => {
        if (bestProgress > 2) {
            videoPlayed(pitchId, bestProgress);
        }

        player?.off('timeupdate', handleTimeUpdate);
        player?.destroy();
    });
</script>
  
<video id="player" playsinline controls muted class="video-player rounded-xl">
    <source src="{videoUrl}" type="video/mp4" />
</video>


<style>
    .video-player {
        max-height: 70vh;
        object-fit: contain;
    }
</style>