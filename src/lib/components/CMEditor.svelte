<script>
  // import CodeMirror from '$lib/components/CodeMirror.svelte';
  import CodeMirror6 from '$lib/components/CodeMirror6.svelte';
  import 'codemirror/mode/markdown/markdown.js';
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  import { editorStore } from '$lib/stores/editor.store.js';
  import Toolbar from '$lib/components/Toolbar.svelte';

  let editor;
  let CM;
  onMount(async () => {
    const module = await import('$lib/components/CodeMirror.svelte');
    CM = module.default;
  });

  function updateChange(event) {
    $editorStore = { content: event.detail.value };
  }
</script>

<div class="editor-pane">
  <Toolbar />
  <!-- <svelte:component this="{CM}" on:change="{updateChange}" /> -->
  <CodeMirror6 />
  <!-- <CodeMirror
    bind:this="{editor}"
    on:change="{(e) => {
      console.log('e', e.detail.value);
    }}" /> -->
</div>
