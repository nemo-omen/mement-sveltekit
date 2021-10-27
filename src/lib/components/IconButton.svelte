<script>
  import { createEventDispatcher } from 'svelte';
  import Icon from './Icon.svelte';
  const dispatch = createEventDispatcher();

  export let name = '';
  export let size = 1;

  export let dispatchFn = '';

  function sendDispatch() {
    dispatch(dispatchFn);
  }
</script>

<button class="icon-button" style="font-size: {size}rem" on:click="{sendDispatch}">
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
    font-size: 1.5rem;
    padding: 0.5rem;
  }
  .icon-button:hover {
    color: var(--hover);
    /* background-color: rgba(var(--link-rgb), 0.3); */
  }
</style>
