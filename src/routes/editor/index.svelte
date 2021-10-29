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
  import { userStore } from '$lib/stores/user.store.js';
  import EditorSidebar from '$lib/components/EditorSidebar.svelte';
  import DocumentPreview from '$lib/components/DocumentPreview.svelte';
  let EditorComponent;

  export let user;

  onMount(async () => {
    // load CMEditor as dynamic module so we can
    // get around 'not a valid SSR component' errors
    const module = await import('$lib/components/CMEditor.svelte');
    EditorComponent = module.default;
  });
</script>

<section id="workspace">
  <EditorSidebar />
  <svelte:component this="{EditorComponent}" />
  <DocumentPreview />
</section>

<style>
  #workspace {
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    flex-grow: 1;
    min-height: 100%;
    min-width: 100%;
  }
</style>
