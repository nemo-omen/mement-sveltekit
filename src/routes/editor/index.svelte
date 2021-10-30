<script context="module">
  export async function load({ page, fetch, session, stuff }) {
    const user = session?.user;

    return {
      props: {
        user,
      },
    };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { userStore } from '$lib/stores/user.store.js';
  import EditorSidebar from '$lib/components/EditorSidebar.svelte';
  import DocumentPreview from '$lib/components/DocumentPreview.svelte';
  import EditorToolbar from '$lib/components/EditorToolbar.svelte';
  import PreviewToolbar from '$lib/components/PreviewToolbar.svelte';
  let EditorComponent;

  export let user;

  if (browser) {
    onMount(async () => {
      // load CMEditor as dynamic module so we can
      // get around 'not a valid SSR component' errors
      const module = await import('$lib/components/CMEditor.svelte');
      EditorComponent = module.default;
    });
  }
</script>

<section id="workspace">
  <EditorSidebar />
  <section class="workspace-section">
    <div class="editor-header">
      <EditorToolbar />
      <PreviewToolbar />
    </div>
    <div class="editor-panes">
      <svelte:component this="{EditorComponent}" />
      <DocumentPreview />
    </div>
  </section>
</section>

<style>
  #workspace {
    display: grid;
    grid-template-columns: auto 1fr;
  }

  .editor-header,
  .editor-panes {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
</style>
