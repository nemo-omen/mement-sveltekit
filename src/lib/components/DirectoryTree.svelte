<script>
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  import { directoryStore, documentStore } from '$lib/stores/editor.store.js';
  export let tree = {};
  const { id, name, node_type, parent_id } = tree?.data;
  const children = tree?.children;
  $: open = false;

  async function openFile(fileId) {
    // todo - set up a store that tracks the currently open document
    // only open doc if it is not currently open doc
    // if it IS the currently open doc, save currently open
    // to DB and query for new document from db
    try {
      const response = await fetch(`/notes/${fileId}`);
      const data = await response.json();
      if (data) $documentStore = { ...data };
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggle(event) {
    let det = event.target;
    if (det.open) {
      if (browser) {
        // console.log('open: ', id);
        open = true;
        $directoryStore[id] = 'open';
        // console.log($directoryStore);
        window.localStorage.setItem('mement_dirs', JSON.stringify($directoryStore));
      }
    } else {
      if (browser) {
        console.log('closed: ', id);
        open = false;
        $directoryStore[id] = 'closed';
        // console.log($directoryStore);
        window.localStorage.setItem('mement_dirs', JSON.stringify($directoryStore));
      }
    }
  }

  onMount(() => {
    const storedDirState = JSON.parse(window.localStorage.getItem('mement_dirs'));
    open = storedDirState[id] === 'open';
  });
</script>

<details class="dir {parent_id ? 'child' : ''}" on:toggle="{handleToggle}" open="{open}">
  <summary>{name}</summary>
  {#if children}
    {#each children as child}
      {#if child.data.node_type === 'directory'}
        <svelte:self tree="{child}" />
      {:else}
        <div class="note child" on:click="{() => openFile(child.data.id)}" open="{open}">
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
