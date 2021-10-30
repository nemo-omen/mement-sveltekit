<script>
  import IconButton from '$lib/components/IconButton.svelte';

  const iconSize = 1.75;

  function handleClick(event) {
    console.log(event);
  }
</script>

<div class="toolbar">
  <IconButton name="bold" size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="italic" size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="heading" size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="strikethrough" size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="ul" size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="ol" size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="checklist" size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="quote" size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="code" size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="table" size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="link" size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
  <IconButton name="image" size="{iconSize}" dispatchFn="click" on:click="{handleClick}" />
</div>

<style lang="scss">
  .toolbar {
    display: flex;
    justify-content: space-around;
    padding-inline: 2rem;
    border-bottom: 1px solid var(--primary-fg-muted);
  }
</style>
