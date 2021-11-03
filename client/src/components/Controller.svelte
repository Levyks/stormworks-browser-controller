<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  
  import { available_layouts } from '../misc';
  import { socket } from '../stores';
  import type { Bus, BusBooleanChannels, BusNumberChannels } from '../typings';

  import Thumbstick from './Thumbstick.svelte';
  import Slider from './Slider.svelte';
  import Button from './Button.svelte';

  export let id;

  const interval_ms = 100;

  const components = {
    'thumbstick': Thumbstick,
    'slider': Slider,
    'button': Button,
  }

  let layout = available_layouts[id];

  let windowHeight;

  let bus: Bus = {
    boolean: new Array(32).fill(false) as BusBooleanChannels,
    number: new Array(32).fill(0) as BusNumberChannels,
  }

  onMount(() => {

    const interval = setInterval(() => {

      if(!$socket || !$socket.connected) {
        clearInterval(interval);
        alert('Connection lost');
        navigate('/client/menu');
        return;
      }

      $socket.emit('bus_update', bus);

    }, interval_ms);

    return () => {
      clearInterval(interval);
    }
  });

</script>

<svelte:window bind:innerHeight={windowHeight} />

<main style="height:{windowHeight}px;">
  {#each layout.components as component}
    <svelte:component this={components[component.type]} {component} bind:bus />
  {/each}
</main>

<style>
  main {
    position: relative;
  }
</style>

