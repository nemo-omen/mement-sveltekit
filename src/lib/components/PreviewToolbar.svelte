<script>
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  import IconButton from '$lib/components/IconButton.svelte';

  const iconSize = 1.75;
  let isDark = false;
  let toolbar;
  let observer;

  function toggleDark() {
    isDark = !isDark;
  }

  if (browser) {
    onMount(() => {
      const isDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
      isDark = isDarkQuery.matches;

      observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.contentBoxSize) {
            const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;
            toolbar.style.fontSize = Math.max(1.5, contentBoxSize.inlineSize / 450) + 'em';
          } else {
            toolbar.style.fontSize = Math.max(1.5, entry.contentRect.width / 450) + 'em';
          }
        }
      });

      observer.observe(toolbar);
    });
  }
</script>

<div class="toolbar" bind:this="{toolbar}">
  {#if isDark}
    <IconButton name="lightmode" dispatchFn="toggleScheme" on:toggleScheme="{toggleDark}" />
  {:else}
    <IconButton name="darkmode" dispatchFn="toggleScheme" on:toggleScheme="{toggleDark}" />
  {/if}
</div>

<style lang="scss">
  .toolbar {
    justify-content: flex-end;
  }
</style>
