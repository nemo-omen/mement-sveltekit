<script>
  export let tree = {};
  const { id, name, bodyContent, created_at, updated_at, node_type, user_id } = tree?.data;
  const children = tree?.children;
</script>

<ul class="expanded-menu-list">
  <li class="{node_type === 'root' ? 'li-dir' : node_type === 'directory' ? 'li-dir' : 'li-note'}">
    {name}
    {#if children}
      {#each children as child}
        <svelte:self tree="{child}" />
      {/each}
    {/if}
  </li>
</ul>

<style>
  .li-note {
    list-style-image: url('images/file-3.svg');
  }
  .li-dir {
    list-style-image: url('images/folder-3.svg');
  }
</style>
