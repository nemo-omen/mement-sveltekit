<script>
  export let tree = {};
  const { id, name, node_type, parent_id } = tree?.data;
  const children = tree?.children;
  let expanded = false;

  function openFile(id) {
    // todo - set up a store that tracks the currently open document
    // only open doc if it is not currently open doc
    // if it IS the currently open docc, save currently open
    // to DB and query for new document from db
    console.log('open: ', id);
  }
  console.log(tree);
</script>

<details class="dir {parent_id ? 'child' : ''}">
  <summary>{name}</summary>
  {#if children}
    {#each children as child}
      {#if child.data.node_type === 'directory'}
        <svelte:self tree="{child}" />
      {:else}
        <div class="note child" on:click="{() => openFile(child.data.id)}">
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

  .dir summary,
  .note {
    display: grid;
    grid-template-columns: 1rem 10fr;
    grid-gap: 0.5em;
  }

  .dir > summary::before {
    content: '🗀';
    font-size: 1em;
  }

  .dir[open] > summary::before {
    content: '🗁';
    font-size: 1em;
  }

  .note::before {
    content: '🗎';
    font-size: 1em;
  }

  .child {
    border-left: 1px solid var(--primary-fg-muted);
  }

  details {
    overflow: hidden;
  }
</style>
