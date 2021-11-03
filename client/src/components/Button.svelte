<script lang="ts">
  import { getPositionCss } from '../misc';
  import type { Bus, ButtonLayoutCmp } from '../typings';

  export let component: ButtonLayoutCmp;
  export let bus: Bus;

  let pressing: boolean = false;

  function pressingDown() {
    if(!component.toggle) pressing = true;
    else pressing = !pressing;
  }

  function notPressingDown() {
    if(!component.toggle) pressing = false;
  }

  $: handlePressingChange(pressing);

  function handlePressingChange(p: boolean) {
    console.log(p);
    bus.boolean[component.channel-1] = p;
  }

</script>

<button

  class:pressing

  on:mousedown={pressingDown}
  on:mouseup={notPressingDown}
  on:mouseleave={notPressingDown}

  on:touchstart={pressingDown}
  on:touchend={notPressingDown}

  style="
  width:{component.width}vw;
  height:{component.height}vw;
  {getPositionCss(component, true)}
  "
>
{component.label}
</button>

<style>
  button {
    position: absolute;
    font-size: 4vw;
    font-weight: 500;
    background-color: #657ad8;
    color: #fff;

    border-radius: 10px;
    border-style: outset;

    -webkit-user-select: none;
    -moz-user-select: none;
  }

  button:active, .pressing {
    background-color: #2eb3ff;
  }
</style>