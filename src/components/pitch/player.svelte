<script lang="ts">
    import Plyr from 'plyr';
    import 'plyr/dist/plyr.css';
	  import { onDestroy, onMount } from 'svelte';
  
    let player: Plyr | null = null;
    export let videoUrl: string | undefined;
  
    onMount(() => {
      if (videoUrl === null) return;

      player = new Plyr('#player', {
        controls: ['play', 'progress', 'current-time', 'mute', 'settings', 'volume', 'fullscreen'],
        settings: ['quality', 'speed'],
        autoplay: true,
        loop: {
          active: false
        },
      });
    });
  
    onDestroy(() => {
      player?.destroy();
    });
  </script>
  
  <video id="player" playsinline controls muted class="video-player">
    <source src="{videoUrl}" type="video/mp4" />
  </video>

  <style>
    .video-player {
      max-height: 70vh;
      object-fit: contain;
    }
  </style>