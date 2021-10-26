<script>
  import { browser } from '$app/env';
  import Toolbar from '$lib/components/Toolbar.svelte';
  import Header from './Header.svelte';
  import { EditorView } from '@codemirror/view';
  import { EditorState } from '@codemirror/state';

  let editor;

  function logKeypress(event) {}

  function handleSelection(event) {
    const selection = document.getSelection();
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    // let selection = editor.value.substring(start, end);
    // selection = '[[' + selection + ']]';
    console.log(selection);
  }
</script>

<section id="editor-pane">
  <Toolbar />
  <div
    class="editor"
    on:keypress="{logKeypress}"
    on:select="{handleSelection}"
    bind:this="{editor}"
    contenteditable="true">
  </div>
</section>

<style lang="scss">
  .editor {
    font-size: 1rem;
    line-height: 1.5;
    font-family: 'Courier New', Courier, monospace;
    min-height: 90%;
    min-width: 100%;
    background-color: var(--primary-bg);
    color: var(--primary-fg);
    border: none;
    padding: 1rem;
    resize: none;
    overflow-y: scroll;
  }
  .editor:focus {
    background-color: rgba(var(--primary-fg), 0.1);
    outline: 3px solid rgba(var(--link-rgb), 0.3);
    outline-offset: -3px;
  }
</style>
