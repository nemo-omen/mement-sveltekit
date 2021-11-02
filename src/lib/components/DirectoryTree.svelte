<script>
  export let tree = {};
  const { id, name, bodyContent, created_at, updated_at, node_type, user_id } = tree?.data;
  const children = tree?.children;
</script>

{#if node_type === 'root' || node_type === 'directory'}
  <ul class="expanded-menu-list">
    <li class="li-dir" style="list-style-image: url(folder-3.svg)">
      {name}
      {#if children}
        {#each children as child}
          <svelte:self tree="{child}" />
        {/each}
      {/if}
    </li>
  </ul>
{:else}
  <li class="li-note" style=" list-style-image: url(file-3.svg)">
    {name}
    <!-- {#if children}
    {#each children as child}
      <svelte:self tree="{child}" />
    {/each}
  {/if} -->
  </li>
{/if}
