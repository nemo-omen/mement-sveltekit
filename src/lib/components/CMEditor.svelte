<script>
  import CodeMirror from '$lib/components/CodeMirror.svelte';
  import 'codemirror/mode/markdown/markdown.js';
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  import Toolbar from '$lib/components/Toolbar.svelte';

  let editor;
  let CM;
  onMount(async () => {
    const module = await import('$lib/components/CodeMirror.svelte');
    CM = module.default;
  });
</script>

<div class="editor-pane">
  <Toolbar />
  <svelte:component this="{CM}" />
  <!-- <CodeMirror
    bind:this="{editor}"
    on:change="{(e) => {
      console.log('e', e.detail.value);
    }}" /> -->
</div>
