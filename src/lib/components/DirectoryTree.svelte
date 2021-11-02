<script>
  export let tree = {};
  const { id, name, bodyContent, created_at, updated_at, node_type, user_id } = tree?.data;
  const children = tree?.children;
  console.log(tree);
</script>

<ul class="expanded-menu-list">
  <li class="li-dir {tree.data.parent_id ? 'menu-child' : ''}">
    {name}
    {#if children}
      {#each children as child}
        {#if child.data.node_type === 'directory'}
          <svelte:self tree="{child}" />
        {:else}
          <li class="li-note menu-child">{child.data.name}</li>
        {/if}
      {/each}
    {/if}
  </li>
</ul>

<style lang="scss">
  .expanded-menu-list li {
    color: var(--link);
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

  li.menu-child {
    margin-inline-start: 0.5em;
  }
</style>
