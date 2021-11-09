<script>
  import { browser } from '$app/env';
  import { onMount, afterUpdate } from 'svelte';
  import { cssVariables } from '$lib/util/actions/cssVariables.js';
  import IconButton from '$lib/components/IconButton.svelte';

  const iconSize = 1.75;
  let isDark = false;
  let toolbar;
  let observer;
  let toolbarWidth;
  $: fontSize = toolbarWidth / 400;

  function toggleDark() {
    isDark = !isDark;
  }

  onMount(() => {
    const isDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    isDark = isDarkQuery.matches;
  });
</script>

<div
  class="toolbar"
  bind:this="{toolbar}"
  bind:clientWidth="{toolbarWidth}"
  use:cssVariables="{{ fontSize: fontSize }}">
  {#if isDark}
    <IconButton name="lightmode" dispatchFn="toggleScheme" on:toggleScheme="{toggleDark}" />
  {:else}
    <IconButton name="darkmode" dispatchFn="toggleScheme" on:toggleScheme="{toggleDark}" />
  {/if}
</div>

<style lang="scss">
  .toolbar {
    justify-content: flex-end;
    font-size: calc(var(--fontSize) * 1em);
  }
</style>
