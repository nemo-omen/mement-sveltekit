<script>
  import { arrayToTree } from 'performant-array-to-tree';
  import { onMount } from 'svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import DirectoryTree from '$lib/components/DirectoryTree.svelte';
  import { menuService } from '$lib/machines/menu.machine.js';
  import { userStore } from '$lib/stores/user.store.js';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  $: notes = [];
  $: tree = {};

  menuService.onTransition((state) => {
    // console.log('context: ', state.context);
    // console.log('value: ', state.value);
  });

  function handleIconClick(key) {
    menuService.send({ type: 'CLICK', key });
  }

  async function getNotes() {
    try {
      const response = await fetch('/notes');
      if (!response.ok) {
        throw new Error('Something went wrong while fetching notes.');
      }

      const data = await response.json();

      // reverse sort by `node_type` so notes with a type of 'note'
      // appear in array before those with a type of 'directory'
      // - this also means that 'root' will appear first!
      data.sort((a, b) => (a.node_type < b.node_type ? 1 : -1));

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  onMount(async () => {
    notes = await getNotes();
    // console.log(notes);
    const treeArray = arrayToTree(notes, { parentId: 'parent_id' });
    tree = treeArray[0];
  });
</script>

<aside id="workspace-sidebar">
  <div class="sidebar-icons {$menuService.matches('expanded') ? 'expanded' : 'collapsed'}">
    <IconButton name="mement" size="2" dispatchFn="expand" on:expand="{() => handleIconClick('main')}" />
    <IconButton name="doc" size="2" dispatchFn="expand" on:expand="{() => handleIconClick('docs')}" />
    <IconButton name="user" size="2" dispatchFn="expand" on:expand="{() => handleIconClick('user')}" />
    <IconButton name="settings" size="2" dispatchFn="expand" on:expand="{() => handleIconClick('settings')}" />
  </div>
  {#if $menuService.matches('expanded')}
    <div class="sidebar-expanded">
      {#if $menuService.context.currentMenu === 'main'}
        <div class="sidebar-item">
          <p>Logged in as</p>
          <a href="/profile">{$userStore.userName}</a>
        </div>
        <div class="sidebar-item">Something Else</div>
      {/if}
      {#if $menuService.context.currentMenu === 'docs'}
        <div class="sidebar-item">
          <DirectoryTree tree="{tree}" on:loadDoc />
        </div>
      {/if}
      {#if $menuService.context.currentMenu === 'user'}
        <div class="sidebar-item"></div>
      {/if}
      {#if $menuService.context.currentMenu === 'settings'}
        <div class="sidebar-item"></div>
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
    /* width: 50px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-block: 1rem;
  }

  .expanded {
    border-right: 1px solid var(--primary-fg-muted);
  }

  .collapsed {
    border-right: none;
  }
  .sidebar-expanded {
    max-width: 15em;
    min-width: 12em;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1rem;
  }

  .sidebar-expanded > * + * {
    border-top: 1px solid var(--primary-fg-muted);
  }

  .sidebar-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    justify-content: center;
    align-items: flex-start;
  }
</style>
