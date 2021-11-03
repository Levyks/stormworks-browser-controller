<script lang="ts">
  import { io } from 'socket.io-client';
  import { navigate } from 'svelte-routing';

  import Loading from './Loading.svelte';
  import Select from 'svelte-select';
  
  import { available_layouts } from '../misc';
  import { socket } from '../stores';

  let hostname = window.location.hostname;
  let port = window.location.port || 80;

  let items = [];
  let loading = false;

  Object.values(available_layouts).forEach(layout => {
    items.push({
      value: layout.id, label: layout.name
    });
  });

  let value;

  $: handleValueChange(value);

  function handleValueChange(v) {
    const input = document.getElementById('layout') as HTMLInputElement;
    if(input) input.setCustomValidity(v ? '' : 'You need to choose a layout');
  }

  function handleSubmit() {
    loading = true;
    $socket = io(`http://${hostname}:${port}`);
    $socket.on('connect', () => {
      $socket.removeAllListeners('connect');
      navigate(`/client/controller/${value.value}`);
      loading = false;
    });
    $socket.on('connect_error', (err) => {
      alert("Could not connect to server, error: " + err.message);
      loading = false;
    });
  }

</script>

<Loading {loading}>
  <main class="container">
    <h1>Stormworks Controller</h1>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="row mb-3">
        <label for="hostname" class="col-sm-2 col-form-label">Hostname</label>
        <div class="col-sm-10">
          <input bind:value={hostname} class="form-control" id="hostname" required>
        </div>
      </div>
      <div class="row mb-3">
        <label for="port" class="col-sm-2 col-form-label">Socket.IO Port</label>
        <div class="col-sm-10">
          <input type="number" bind:value={port} class="form-control" id="port" required>
        </div>
      </div>    
      <div class="row mb-3">
        <label for="layout" class="col-sm-2 col-form-label">Layout</label>
        <div class="col-sm-10">
          <Select id="layout" {items} bind:value></Select>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Connect</button>
    </form>
    <div></div>
  </main>
</Loading>

<style>
  h1 {
    text-align: center;
  }

  main {
    height: 100vh;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>