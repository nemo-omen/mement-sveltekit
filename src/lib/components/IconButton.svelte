<script>
  import { createEventDispatcher } from 'svelte';
  import Icon from './Icon.svelte';
  const dispatch = createEventDispatcher();

  export let name = '';
  export let size = 1;

  $: observedSize = size;

  export let dispatchFn = '';

  function sendDispatch() {
    dispatch(dispatchFn);
  }
</script>

<button class="icon-button" on:click="{sendDispatch}">
  <Icon name="{name}" />
</button>

<style>
  .icon-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    color: var(--link);
    border: none;
    transition: all 0.3s ease-out;
    padding: 0.5rem;
    font-size: inherit;
  }
  .icon-button:hover {
    color: var(--hover);
  }
</style>
