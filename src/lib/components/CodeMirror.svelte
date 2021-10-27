<script>
  import CodeMirror from 'codemirror';
  import './codemirror.css';

  import 'codemirror/theme/ayu-dark.css';
  import 'codemirror/mode/javascript/javascript.js';
  // import 'codemirror/mode/shell/shell.js';
  import 'codemirror/mode/handlebars/handlebars.js';
  import 'codemirror/mode/htmlmixed/htmlmixed.js';
  import 'codemirror/mode/xml/xml.js';
  import 'codemirror/mode/css/css.js';
  import 'codemirror/mode/markdown/markdown.js';
  import 'codemirror/addon/edit/closebrackets.js';
  import 'codemirror/addon/edit/closetag.js';
  import 'codemirror/addon/edit/continuelist.js';
  import 'codemirror/addon/comment/comment.js';
  import 'codemirror/addon/fold/foldcode.js';
  import 'codemirror/addon/fold/foldgutter.js';
  import 'codemirror/addon/fold/brace-fold.js';
  import 'codemirror/addon/fold/xml-fold.js';
  import 'codemirror/addon/fold/indent-fold.js';
  import 'codemirror/addon/fold/markdown-fold.js';
  import 'codemirror/addon/fold/comment-fold.js';
  import { onMount, createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let readonly = false;
  export let flex = false;
  export let lineNumbers = true;
  export let tab = true;
  let w;
  let h;
  let code = '';
  let mode;
  // We have to expose set and update methods, rather
  // than making this state-driven through props,
  // because it's difficult to update an editor
  // without resetting scroll otherwise
  export async function set(new_code, new_mode) {
    if (new_mode !== mode) {
      await createEditor((mode = new_mode));
    }
    code = new_code;
    updating_externally = true;
    if (editor) editor.setValue(code);
    updating_externally = false;
  }
  export function update(new_code) {
    code = new_code;
    if (editor) {
      const { left, top } = editor.getScrollInfo();
      editor.setValue((code = new_code));
      editor.scrollTo(left, top);
    }
  }

  export function resize() {
    editor.refresh();
  }

  export function focus() {
    editor.focus();
  }

  export function getHistory() {
    return editor.getHistory();
  }

  export function setHistory(history) {
    editor.setHistory(history);
  }

  export function clearHistory() {
    if (editor) editor.clearHistory();
  }

  const modes = {
    js: {
      name: 'javascript',
      json: false,
    },
    json: {
      name: 'javascript',
      json: true,
    },
    svelte: {
      name: 'handlebars',
      base: 'text/html',
    },
    md: {
      name: 'markdown',
    },
  };

  let refs = {};
  let editor;
  let updating_externally = false;
  let marker;
  let error_line;
  let destroyed = false;
  // let CodeMirror;
  $: if (editor && w && h) {
    editor.refresh();
  }
  $: {
    if (marker) marker.clear();
  }
  let previous_error_line;
  $: if (editor) {
    if (previous_error_line != null) {
      editor.removeLineClass(previous_error_line, 'wrap', 'error-line');
    }
    if (error_line && error_line !== previous_error_line) {
      editor.addLineClass(error_line, 'wrap', 'error-line');
      previous_error_line = error_line;
    }
  }

  onMount(() => {
    (async () => {
      await createEditor(mode || 'markdown');
      if (editor) editor.setValue(code || '');
    })();

    return () => {
      if (editor) editor.toTextArea();
    };
  });
  let first = true;
  async function createEditor(mode) {
    if (editor) {
      console.log('editor', editor);
      editor.toTextArea();
    }
    const opts = {
      theme: 'ayu-dark',
      lineNumbers,
      lineWrapping: true,
      indentWithTabs: true,
      indentUnit: 2,
      tabSize: 2,
      value: '',
      mode: modes[mode] || {
        name: mode,
      },
      readOnly: readonly,
      autoCloseBrackets: true,
      autoCloseTags: true,
      extraKeys: {
        Enter: 'newlineAndIndentContinueMarkdownList',
        'Ctrl-/': 'toggleComment',
        'Cmd-/': 'toggleComment',
        'Ctrl-Q': function (cm) {
          cm.foldCode(cm.getCursor());
        },
        'Cmd-Q': function (cm) {
          cm.foldCode(cm.getCursor());
        },
      },
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    };
    if (!tab) {
      opts.extraKeys['Tab'] = tab;
      opts.extraKeys['Shift-Tab'] = tab;
    }
    // Creating a text editor is a lot of work, so we yield
    // the main thread for a moment. This helps reduce jank
    if (first) await sleep(50);
    if (destroyed) return;
    editor = CodeMirror.fromTextArea(refs.editor, opts);
    editor.on('change', (instance) => {
      if (!updating_externally) {
        const value = instance.getValue();
        dispatch('change', { value });
      }
    });
    if (first) await sleep(50);
    editor.refresh();
    first = false;
  }
  function sleep(ms) {
    return new Promise((fulfil) => setTimeout(fulfil, ms));
  }
</script>

<div class="codemirror-container" class:flex bind:offsetWidth="{w}" bind:offsetHeight="{h}">
  <!-- svelte-ignore a11y-positive-tabindex -->
  <textarea bind:this="{refs.editor}" readonly value="{code}"></textarea>

  {#if !CodeMirror}
    <pre style="position: absolute; left: 0; top: 0">{code}</pre>
  {/if}
</div>

<style>
  .codemirror-container {
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    line-height: 1.5;
    font-size: 1.2rem;
    overflow: hidden;
  }
  .codemirror-container :global(.CodeMirror) {
    height: 100%;
    background: transparent;
    font: 400 1rem/1.7 var(--font-mono);
    color: var(--base);
  }
  .codemirror-container.flex :global(.CodeMirror) {
    height: auto;
  }
  .codemirror-container.flex :global(.CodeMirror-lines) {
    padding: 0;
  }
  .codemirror-container :global(.CodeMirror-gutters) {
    padding: 0 0.5rem 0 0.5rem;
    border: none;
  }
  .codemirror-container :global(.error-loc) {
    position: relative;
    border-bottom: 2px solid #da106e;
  }
  .codemirror-container :global(.error-line) {
    background-color: rgba(200, 0, 0, 0.05);
  }

  :global(.CodeMirror-cursors) {
    border-left-width: 3px !important;
  }

  textarea {
    visibility: hidden;
  }
  pre {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border: none;
    padding: 4px 4px 4px 60px;
    resize: none;
    font-family: var(--font-mono);
    font-size: 1.2rem;
    line-height: 1.7;
    user-select: none;
    pointer-events: none;
    color: #ccc;
    tab-size: 2;
    -moz-tab-size: 2;
  }
  .flex pre {
    padding: 0 0 0 4px;
    height: auto;
  }
</style>
