<script>
  import IconButton from '$lib/components/IconButton.svelte';
  import { menuService } from '$lib/machines/menu.machine.js';
  let expanded = false;

  menuService.onTransition((state) => {
    console.log('context: ', state.context);
    console.log('value: ', state.value);
  });

  function handleIconClick(key) {
    menuService.send({ type: 'CLICK', key });
  }
</script>

<aside id="workspace-sidebar">
  <div class="sidebar-icons">
    <IconButton name="doc" size="3" dispatchFn="expand" on:expand="{() => handleIconClick('docs')}" />
    <IconButton name="user" size="3" dispatchFn="expand" on:expand="{() => handleIconClick('user')}" />
  </div>
  {#if $menuService.matches('expanded')}
    {$menuService.context.currentMenu}
  {/if}
</aside>

<style>
  #workspace-sidebar {
    width: 50px;
    display: flex;
  }
  .sidebar-icons {
    border-right: 1px solid var(--primary-fg-muted);
  }
</style>
