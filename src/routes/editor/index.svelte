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
  import EditorSidebar from '$lib/components/EditorSidebar.svelte';
  import DocumentPreview from '$lib/components/DocumentPreview.svelte';
  import EditorToolbar from '$lib/components/EditorToolbar.svelte';
  import PreviewToolbar from '$lib/components/PreviewToolbar.svelte';
  import CodeMirror6 from '$lib/components/CodeMirror6.svelte';

  export let user;

  let editor;
  let preview;
  function scrollSync(first, second) {
    second.scrollTop = first.scrollTop;
  }
</script>

<section id="workspace">
  <EditorSidebar />
  <section class="workspace-section">
    <div id="workspace-header">
      <EditorToolbar />
      <PreviewToolbar />
    </div>
    <div id="workspace-panes">
      <div class="editor-pane" bind:this="{editor}">
        <CodeMirror6 />
      </div>
      <div class="preview-pane" bind:this="{preview}">
        <DocumentPreview />
      </div>
    </div>
  </section>
</section>

<style>
  #workspace {
    display: grid;
    grid-template-columns: auto 1fr;
  }

  #workspace-header,
  #workspace-panes {
    display: grid;
    grid-template-columns: 50% 50%;
    position: relative;
  }
  #workspace-header {
    position: relative;
    height: 3rem;
  }
  #workspace-panes {
    height: calc(100vh - 3rem);
  }
  .editor-pane,
  .preview-pane {
    position: relative;
    height: 100%;
    overflow: auto;
  }
</style>
