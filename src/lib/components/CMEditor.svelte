<script>
  import CodeMirror6 from '$lib/components/CodeMirror6.svelte';
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  import { editorStore } from '$lib/stores/editor.store.js';
  import Toolbar from '$lib/components/Toolbar.svelte';
</script>

<div class="editor-pane">
  <Toolbar />
  <CodeMirror6 />
</div>

<style>
  .editor-pane {
    /* overflow-y: scroll; */
  }
</style>
