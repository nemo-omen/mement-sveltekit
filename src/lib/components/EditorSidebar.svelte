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
  <div class="sidebar-icons {$menuService.matches('expanded') ? 'expanded' : 'collapsed'}">
    <IconButton name="doc" size="3" dispatchFn="expand" on:expand="{() => handleIconClick('docs')}" />
    <IconButton name="user" size="3" dispatchFn="expand" on:expand="{() => handleIconClick('user')}" />
    <IconButton name="settings" size="3" dispatchFn="expand" on:expand="{() => handleIconClick('settings')}" />
  </div>
  {#if $menuService.matches('expanded')}
    <div class="sidebar-expanded">
      {#if $menuService.context.currentMenu === 'docs'}
        <div class="sidebar-item">
          {$menuService.context.currentMenu}
        </div>
        <div class="sidebar-item">Something Else</div>
      {/if}
      {#if $menuService.context.currentMenu === 'user'}
        <div class="sidebar-item">
          {$menuService.context.currentMenu}
        </div>
      {/if}
      {#if $menuService.context.currentMenu === 'settings'}
        <div class="sidebar-item">
          {$menuService.context.currentMenu}
        </div>
      {/if}
    </div>
  {/if}
</aside>

<style>
  #workspace-sidebar {
    display: flex;
    border-right: 1px solid var(--primary-fg-muted);
  }
  .sidebar-icons {
    width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .expanded {
    border-right: 1px solid var(--primary-fg-muted);
  }

  .collapsed {
    border-right: none;
  }
  .sidebar-expanded {
    width: 10vw;
  }

  .sidebar-expanded > * + * {
    border-top: 1px solid var(--primary-fg-muted);
  }

  .sidebar-item {
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
