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
  import Split from 'split-grid';
  import { onMount } from 'svelte';
  import EditorSidebar from '$lib/components/EditorSidebar.svelte';
  import DocumentPreview from '$lib/components/DocumentPreview.svelte';
  import EditorToolbar from '$lib/components/EditorToolbar.svelte';
  import PreviewToolbar from '$lib/components/PreviewToolbar.svelte';
  import CodeMirror6 from '$lib/components/CodeMirror6.svelte';

  export let user;

  let editor;
  let cmEd;
  let preview;
  let tempDoc;
  let gutter;

  function scrollSync(first, second) {
    second.scrollTop = first.scrollTop;
  }

  function handleLoadDoc(event) {
    // console.log('loadDoc event received: ', event.detail);
    cmEd.loadDoc(event.detail);
  }

  onMount(() => {
    Split({
      columnGutters: [
        {
          track: 1,
          element: gutter,
        },
      ],
    });
  });
</script>

<section id="workspace">
  <EditorSidebar on:loadDoc="{handleLoadDoc}" />
  <!-- <div id="workspace-header"></div> -->
  <div id="workspace-panes" class="split">
    <div class="editor-pane" bind:this="{editor}">
      <div class="pane-header">
        <EditorToolbar />
      </div>
      <CodeMirror6 bind:this="{cmEd}" />
    </div>

    <div class="gutter-col gutter-col-1" bind:this="{gutter}"></div>

    <div class="preview-pane" bind:this="{preview}">
      <div class="pane-header">
        <PreviewToolbar />
      </div>
      <DocumentPreview />
    </div>
  </div>
</section>

<style>
  #workspace {
    display: grid;
    grid-template-columns: auto 1fr;
  }

  /* #workspace-header, */
  #workspace-panes {
    display: grid;
    grid-template-columns: 1fr 5px 1fr;
    position: relative;
  }
  #workspace-header {
    position: relative;
    height: 3rem;
  }
  #workspace-panes {
    height: 100vh;
  }
  .editor-pane,
  .preview-pane {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: auto;
    z-index: 50;
  }

  .pane-header {
    position: sticky;
    top: 0px;
    z-index: 100;
    background-color: var(--primary-bg);
  }

  .gutter-col {
    /* grid-row: 1/-1; */
    cursor: col-resize;
    /* background-color: var(--primary-fg-muted); */
  }

  .gutter-col-1 {
    /* grid-column: 1; */
    background-color: var(--primary-fg-muted);
    /* border: 1px solid var(--primary-fg-muted); */
  }
</style>
