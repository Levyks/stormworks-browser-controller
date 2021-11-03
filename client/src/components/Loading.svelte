<script lang="ts">
  export let loading: boolean;
</script>

{#if loading}
<main>
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</main>
{:else}
  <slot></slot>
{/if}

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .spinner-border {
    width: 10rem;
    height: 10rem;
  }
</style>