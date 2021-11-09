<script>
  import { onMount, afterUpdate } from 'svelte';
  import IconButton from '$lib/components/IconButton.svelte';

  $: iconSize = 1;
  let toolbar;
  let toolbarWidth;

  let observer;

  function handleClick(event) {
    console.log(event);
  }

  onMount(() => {
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
</script>

<div class="toolbar" bind:this="{toolbar}">
  <!-- <div class="toolbar" bind:this="{toolbar}" use:cssVariables="{{ iconSize: iconSize }}"> -->
  <IconButton name="bold" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="italic" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="heading" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="strikethrough" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="ul" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="ol" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="checklist" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="quote" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="code" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="table" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="link" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="image" dispatchFn="click" on:click="{handleClick}" />
</div>

<style lang="scss">
  .toolbar {
    justify-content: space-between;
  }
</style>
