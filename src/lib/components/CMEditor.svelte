<script>
  import CodeMirror6 from '$lib/components/CodeMirror6.svelte';
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  import { editorStore } from '$lib/stores/editor.store.js';
</script>

<div class="editor-pane">
  <CodeMirror6 />
</div>
