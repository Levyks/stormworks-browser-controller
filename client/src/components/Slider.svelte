<script lang="ts">

  import { onMount, tick } from 'svelte';

  import { getPositionCss } from '../misc';
  import type { SliderLayoutCmp, Bus } from '../typings';

  export let component: SliderLayoutCmp;
  export let bus: Bus;

  let wrapper: HTMLDivElement;
  let slider: HTMLDivElement;
  let touchIdentifier: number;
  let currentPos: number;
  let offset: number;
  let dragging: boolean;

  let centeredPos: number;

  $: if(wrapper && slider) {

    centeredPos = Math.max(
      Math.min(
        (((component.default - component.min)/(component.max - component.min)) * wrapper.clientHeight) - slider.clientHeight / 2,
        wrapper.clientHeight - slider.clientHeight
      ),
      0
    );
  }

  onMount(() => {
    tick().then(() => {
      currentPos = centeredPos;
    });
  });

  function handleDown(e: MouseEvent | Touch) {
    dragging = true;
    offset = e.clientY
  }

  function handleTouchStart(e: TouchEvent) {
    const touch = e.changedTouches[0];
    touchIdentifier = touch.identifier;
    return handleDown(touch);
  }

  function handleMove(e: MouseEvent | Touch) {
    if(dragging) {

      const nextPos = offset - e.clientY + centeredPos;

      currentPos = Math.min(Math.max(nextPos, 0), wrapper.clientHeight - slider.clientHeight);

      

    }
  }

  function handleTouchMove(e: TouchEvent) {
    const touch = e.changedTouches[0];

    if(touch.identifier === touchIdentifier) {
      return handleMove(touch);
    }
  }

  function handleUp() {
    dragging = false;
    if(!component.sticky) currentPos = centeredPos;
  } 

  function handleTouchUp(e: TouchEvent) {
    const touch = e.changedTouches[0];
    if(touch.identifier === touchIdentifier) {
      return handleUp();
    }
  } 

  $: handleCurrentPosChange(currentPos);

  function handleCurrentPosChange(cp) {
    if(wrapper && slider) {
      const delta = component.max - component.min;
      bus.number[component.channel-1] = (cp / (wrapper.clientHeight - slider.clientHeight)) * delta + component.min;
    }
  }
</script>

<svelte:window 
  on:mouseup={handleUp} 
  on:touchend={handleTouchUp}
  on:mousemove={handleMove} 
  on:touchmove|nonpassive|preventDefault={handleTouchMove}
/>

<div 
  class="wrapper"
  bind:this={wrapper}
  style="
  width:{component.width}vw; 
  height:{component.height}%;
  {getPositionCss(component)}
  "
>
  <div class="rail"></div>
  <div 
    bind:this={slider}
    class="slider"
    
    on:mousedown={handleDown}
    on:touchstart={handleTouchStart}

    style="bottom:{currentPos}px;"

  ></div>
</div>

<style>
  .wrapper {
    position: absolute;
  }

  .rail {
    background-color: darkgrey;
    height: 100%;
    width: 2vw;
    margin: 0 auto;
  }

  .slider {
    position: absolute;
    width: 100%;
    height: 10vh;
    background-color: red;
  }
</style>