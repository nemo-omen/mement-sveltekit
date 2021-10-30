<script>
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  import IconButton from '$lib/components/IconButton.svelte';

  const iconSize = 1.75;
  let isDark = false;

  function toggleDark() {
    isDark = !isDark;
  }

  if (browser) {
    onMount(() => {
      const isDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
      isDark = isDarkQuery.matches;
    });
  }
</script>

<div class="toolbar">
  {#if isDark}
    <IconButton name="lightmode" size="{iconSize}" dispatchFn="toggleScheme" on:toggleScheme="{toggleDark}" />
  {:else}
    <IconButton name="darkmode" size="{iconSize}" dispatchFn="toggleScheme" on:toggleScheme="{toggleDark}" />
  {/if}
</div>

<style lang="scss">
  .toolbar {
    display: flex;
    justify-content: flex-end;
    padding-inline: 2rem;
    border-bottom: 1px solid var(--primary-fg-muted);
  }
</style>
