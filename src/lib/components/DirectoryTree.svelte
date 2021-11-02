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

<!-- <ul class="expanded-menu-list">
  <li class="li-dir {tree.data.parent_id ? 'menu-child' : ''}" on:click="{toggleExpanded}">
    {name}
    {#if children}
      {#each children as child}
        {#if child.data.node_type === 'directory'}
          <svelte:self tree="{child}" on:click="{child.children.length > 0 ? toggleExpanded : null}" />
        {:else}
          <li class="li-note menu-child">{child.data.name}</li>
        {/if}
      {/each}
    {/if}
  </li>
</ul> -->

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

  .expanded-menu-list li {
    color: var(--link);
    cursor: pointer;
  }

  .expanded-menu-list li:hover {
    color: var(--hover);
  }

  .li-dir,
  .li-dir ul {
    background-color: var(--primary-bg-muted);
  }

  .li-dir::marker {
    content: '🗀 ';
    font-size: 1em;
  }

  .li-note::marker {
    content: '🗎 ';
    font-size: 1em;
  }

  .child {
    margin-inline-start: 0.5em;
  }
</style>
