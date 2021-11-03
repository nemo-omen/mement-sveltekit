<script>
  import '$lib/styles/editor.css';
  import { keymap, EditorView } from '@codemirror/view';
  import { EditorState } from '@codemirror/state';
  import { history, historyKeymap } from '@codemirror/history';
  import { defaultKeymap } from '@codemirror/commands';
  import { basicSetup } from '@codemirror/basic-setup';
  import { mement } from '$lib/themes/mement.js';
  import { markdown } from '@codemirror/lang-markdown';
  import { onMount, afterUpdate } from 'svelte';
  import { browser } from '$app/env';
  import { editorStore, scrollStore } from '$lib/stores/editor.store.js';
  import { sampleMd } from '$lib/util/sample.md.js';

  let cmEditor;
  $: baseHeight = 0;
  let view;

  export function loadDoc(data) {
    view.setState(buildEditorState(data.bodyContent));
  }

  function buildEditorState(docContent) {
    return EditorState.create({
      extensions: [
        markdown(),
        basicSetup,
        mement,
        keymap.of([...defaultKeymap, ...historyKeymap]),
        EditorView.domEventHandlers({
          scroll(event, view) {
            if (!cmEditor?.matches(':hover')) return;
            const scroll = event.target.scrollTop;
            $scrollStore = { position: scroll };
          },
        }),
      ],
      doc: docContent,
    });
  }

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
        state: buildEditorState(sampleMd),
        dispatch: function (transaction) {
          view.update([transaction]);
          $editorStore = { content: transaction.state.doc.toString() };
          console.log('transaction state: ', transaction.state.selection);
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
