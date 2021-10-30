<script>
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  import Icon from '$lib/components/Icon.svelte';

  let isDark = false;

  if (browser) {
    onMount(() => {
      const isDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
      isDark = isDarkQuery.matches;
    });
  }
</script>

<div class="toolbar">
  <button class="toolbar-button">
    {#if isDark}
      <Icon name="lightmode" />
    {:else}
      <Icon name="darkmode" />
    {/if}
  </button>
</div>

<style lang="scss">
  .toolbar {
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid var(--primary-fg-muted);
  }
  .toolbar-button {
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
  .toolbar-button:hover {
    color: var(--primary-bg);
    background-color: rgba(var(--link-rgb), 0.3);
  }
</style>
