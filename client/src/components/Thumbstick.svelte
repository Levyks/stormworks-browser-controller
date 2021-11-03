<script lang="ts">
  import { getPositionCss, limitPosition, subCoordinates } from '../misc';
  import type { ThumbstickLayoutCmp, Coordinates, Bus } from '../typings';

  export let component: ThumbstickLayoutCmp;
  export let bus: Bus;

  const innerSizeFactor = 1.6;

  let wrapper: HTMLDivElement;
  let stick: HTMLDivElement;

  let windowWidth: number;

  let dragging = false;

  let offset: Coordinates;
  let centeredPos: Coordinates;
  let currentPos: Coordinates;

  let diameterBorder: number;
  let diameterWrapper: number;
  let diameterStick: number;
  let radiusLimit: number;
  let touchIdentifier: number;

  $: {
    diameterBorder = component.diameter;
    diameterWrapper = (diameterBorder * innerSizeFactor) / ((2*innerSizeFactor)-1);
    diameterStick = diameterWrapper / innerSizeFactor;
  }

  $: handleWindowResize(windowWidth)

  function handleWindowResize(width) {
    if(stick && wrapper) {
      
      centeredPos = {
        x: (wrapper.clientWidth - stick.clientWidth)/2,
        y: (wrapper.clientHeight - stick.clientHeight)/2
      };

      currentPos = centeredPos;

      radiusLimit = wrapper.clientWidth - stick.clientWidth;
    }
  }

  function handleDown(e: MouseEvent | Touch) {
    dragging = true;
    offset = {
      x: stick.offsetLeft - e.clientX,
      y: stick.offsetTop - e.clientY
    }
  }

  function handleTouchStart(e: TouchEvent) {
    const touch = e.changedTouches[0];
    touchIdentifier = touch.identifier;
    return handleDown(touch);
  }

  function handleMove(e: MouseEvent | Touch) {
    if(dragging) {

      const nextPos = {
        x: e.clientX + offset.x,
        y: e.clientY + offset.y
      };

      currentPos = limitPosition(centeredPos, nextPos, radiusLimit);


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
    currentPos = centeredPos;
  } 

  function handleTouchUp(e: TouchEvent) {
    const touch = e.changedTouches[0];
    if(touch.identifier === touchIdentifier) {
      console.log(subCoordinates(currentPos, centeredPos));
      return handleUp();
    }
  } 

  $: if(centeredPos) handleCurrentPosChange(currentPos);

  function handleCurrentPosChange(cp) {
    bus.number[component.channelX-1] = subCoordinates(cp, centeredPos).x / radiusLimit;
    bus.number[component.channelY-1] = -subCoordinates(cp, centeredPos).y / radiusLimit;
  }

</script>

<svelte:window 
  on:mouseup={handleUp} 
  on:touchend={handleTouchUp}
  on:mousemove={handleMove} 
  on:touchmove|nonpassive|preventDefault={handleTouchMove}
  bind:innerWidth={windowWidth}
/>

<div 
  class="tborder"
  style="
  width:{diameterBorder}vw; 
  height:{diameterBorder}vw;
  {getPositionCss(component)}
  "
>
  <div 
    class="wrapper" 
    bind:this={wrapper}
    style="
      width:{diameterWrapper}vw; 
      height:{diameterWrapper}vw;
    "
  >
    <div 
      class="stick" 
      bind:this={stick}

      on:mousedown={handleDown}
      on:touchstart={handleTouchStart}

      style="
        width:{diameterStick}vw;
        height:{diameterStick}vw;
        left: {currentPos?.x}px;
        top: {currentPos?.y}px;
      "
    />
  </div>
</div>

<style>

  .tborder {
    position: absolute;

    border-radius: 50%;
    border: 1px solid #b5b5b5;
  }

  .wrapper {
    position: absolute;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    border-radius: 50%;
    background-color: darkgray;
  }

  .stick {
    position: absolute;

    background-color: green;
    border-radius: 50%;
  }
</style>