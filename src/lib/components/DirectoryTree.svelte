<script>
  export let tree = {};
  const { id, name, bodyContent, created_at, updated_at, node_type, user_id, parent_id } = tree?.data;
  const children = tree?.children;
  let expanded = false;

  function toggleExpanded() {
    expanded = !expanded;
    console.log('expanded: ', expanded);
  }
  console.log(tree);
</script>

<details class="dir">
  <summary>{name}</summary>
  {#if children}
    {#each children as child}
      {#if child.data.node_type === 'directory'}
        <svelte:self tree="{child}" />
      {:else}
        <div class="note">
          {child.data.name}
        </div>
      {/if}
    {/each}
  {/if}
</details>

<style lang="scss">
  details summary,
  .note {
    color: var(--link);
    cursor: pointer;
  }

  details > * + * {
    padding-inline-start: 0.5em;
  }

  details summary:hover,
  .note:hover {
    color: var(--hover);
    cursor: pointer;
  }

  details summary > * {
    display: inline;
  }

  .dir > summary::marker {
    content: '🗀 ';
    font-size: 1em;
  }

  .dir[open] > summary::marker {
    content: '🗁 ';
    font-size: 1em;
  }

  .note::before {
    content: '🗎 ';
    font-size: 1em;
  }
</style>
