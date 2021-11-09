<script>
  import { onMount, afterUpdate } from 'svelte';
  import { cssVariables } from '$lib/util/actions/cssVariables.js';
  import IconButton from '$lib/components/IconButton.svelte';

  $: iconSize = 1;
  let toolbar;
  let toolbarWidth;
  $: fontSize = toolbarWidth / 30;

  function handleClick(event) {
    console.log(event);
  }
</script>

<div
  class="toolbar"
  bind:this="{toolbar}"
  bind:clientWidth="{toolbarWidth}"
  use:cssVariables="{{ fontSize: fontSize }}">
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
    font-size: calc(var(--fontSize) * 1px);
  }
</style>
