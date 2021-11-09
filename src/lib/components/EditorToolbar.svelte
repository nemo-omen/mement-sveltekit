<script>
  import { onMount, afterUpdate } from 'svelte';
  import IconButton from '$lib/components/IconButton.svelte';

  $: iconSize = 1.75;
  let toolbar;
  let toolbarWidth;

  function handleClick(event) {
    console.log(event);
  }

  onMount(() => {
    toolbarWidth = toolbar.clientWidth;
    const half = toolbarWidth / 2;
    iconSize = toolbarWidth / half;
  });

  afterUpdate(() => {
    toolbarWidth = toolbar.clientWidth;
    const half = toolbarWidth / 2;
    iconSize = toolbarWidth / half;
    console.log(iconSize);
  });
</script>

<div class="toolbar" bind:this="{toolbar}">
  <IconButton name="bold" bind:size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="italic" bind:size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="heading" bind:size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="strikethrough" bind:size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="ul" bind:size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="ol" bind:size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="checklist" bind:size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="quote" bind:size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="code" bind:size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="table" bind:size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="link" bind:size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="image" bind:size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
</div>

<style lang="scss">
  .toolbar {
    display: flex;
    justify-content: space-between;
    padding-inline: clamp(1rem, 2vw, 2rem);
    border-bottom: 1px solid var(--primary-fg-muted);
  }
</style>
