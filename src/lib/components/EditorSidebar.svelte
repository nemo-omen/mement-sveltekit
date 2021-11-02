<script>
  import { onMount } from 'svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import { menuService } from '$lib/machines/menu.machine.js';
  import { userStore } from '$lib/stores/user.store.js';

  $: dirs = [];
  $: notes = [];
  $: tree = {};

  menuService.onTransition((state) => {
    console.log('context: ', state.context);
    console.log('value: ', state.value);
  });

  function handleIconClick(key) {
    menuService.send({ type: 'CLICK', key });
  }

  async function getDir(id) {
    try {
      const response = await fetch(`/dir/${id}`);

      if (!response.ok) {
        throw new Error('Something went wrong while fetching directory data.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getDirs() {
    try {
      const response = await fetch(`/dirs`);

      if (!response.ok) {
        throw new Error('Something went wrong while fetching directory data.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getNotes() {
    try {
      const response = await fetch('/notes');
      if (!response.ok) {
        throw new Error('Something went wrong while fetching notes.');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  onMount(async () => {
    notes = await getNotes();

    console.log(notes);
    // const root = notes.filter((note) => note.node_type === 'root');
    // tree[root.id] = { ...root, children: [] };

    // notes.forEach((note) => {
    //   if (note.node_type === 'directory') {
    //     tree[note.parent_id].children.push({ ...note, children: [] });
    //   } else {
    //     tree[note.parent_id].children.push({ ...note });
    //   }
    // });

    // console.log('tree: ', tree);
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
          {$menuService.context.currentMenu}
          <ul class="expanded-menu-list">
            {#each Object.values(tree) as node}
              <li>{node.name}</li>
              {#if node.children}
                <ul>
                  {#each node.children as child}
                    <li>{child.name ? child.name : child.title}</li>
                  {/each}
                </ul>
              {/if}
            {/each}
          </ul>
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
    width: 20ch;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .sidebar-expanded > * + * {
    border-top: 1px solid var(--primary-fg-muted);
  }

  .sidebar-item {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    justify-content: center;
    align-items: center;
  }
</style>
