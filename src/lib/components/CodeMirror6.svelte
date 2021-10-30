<script>
  import '$lib/styles/editor.css';
  import { keymap, EditorView } from '@codemirror/view';
  import { EditorState } from '@codemirror/state';
  import { history, historyKeymap } from '@codemirror/history';
  import { defaultKeymap } from '@codemirror/commands';
  import { closeBrackets } from '@codemirror/closebrackets';
  import { basicSetup } from '@codemirror/basic-setup';
  import { mement } from '$lib/themes/mement.js';
  // import { dracula } from '$lib/themes/dracula.js';
  import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter';
  import { markdown } from '@codemirror/lang-markdown';
  import { onMount, afterUpdate } from 'svelte';
  import { browser } from '$app/env';
  import { editorStore } from '$lib/stores/editor.store.js';
  import { sampleMd } from './sample.md.js';

  let cmEditor;
  $: baseHeight = 0;
  let view;

  function cssVariables(node, variables) {
    setCssVariables(node, variables);

    return {
      update(variables) {
        setCssVariables(node, variables);
      },
    };
  }

  function setCssVariables(node, variables) {
    for (const name in variables) {
      node.style.setProperty(`--${name}`, variables[name]);
    }
  }

  if (browser) {
    onMount(() => {
      view = new EditorView({
        state: EditorState.create({
          extensions: [
            // history(),
            markdown(),
            basicSetup,
            // dracula,
            mement,
            // lineNumbers(),
            // highlightActiveLineGutter(),
            // closeBrackets(),
            keymap.of([...defaultKeymap, ...historyKeymap]),
          ],
          doc: sampleMd,
        }),
        dispatch: function (transaction) {
          view.update([transaction]);
          $editorStore = { content: transaction.state.doc.toString() };
          // console.log('transaction state: ', transaction.state.doc.toString());
        },
        parent: cmEditor,
        lineWrapping: true,
      });

      const cmEdit = document.getElementById('editor');
      baseHeight = cmEdit.offsetHeight;
      console.log('baseHeight: ', baseHeight);
      $editorStore = { content: view.state.doc.toString() };
    }); // onMount

    afterUpdate(() => {
      const cmEdit = document.getElementById('editor');
      baseHeight = cmEdit.offsetHeight;
      $editorStore = { content: view.state.doc.toString() };
    });
  } // if(browser)
</script>

<div id="editor" bind:this="{cmEditor}" use:cssVariables="{{ baseHeight }}"></div>

<style>
  /* :global(.cm-scroller) { */
  /* height: calc(var(--baseHeight) * 1px) !important; */
  /* } */
</style>
