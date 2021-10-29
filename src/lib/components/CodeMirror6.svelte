<script>
  import { keymap, EditorView } from '@codemirror/view';
  import { EditorState } from '@codemirror/state';
  import { history, historyKeymap } from '@codemirror/history';
  import { defaultKeymap } from '@codemirror/commands';
  import { defaultHighlightStyle } from '@codemirror/highlight';
  import { closeBrackets } from '@codemirror/closebrackets';
  import { oneDark } from '@codemirror/theme-one-dark';
  // import { colorforth } from '@codemirror/theme-colorforth';
  import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter';
  import { markdown } from '@codemirror/lang-markdown';
  import { onMount } from 'svelte';
  import { browser } from '$app/env';

  let cmEditor;

  if (browser) {
    onMount(() => {
      let view = new EditorView({
        state: EditorState.create({
          extensions: [
            history(),
            markdown(),
            oneDark,
            lineNumbers(),
            highlightActiveLineGutter(),
            closeBrackets(),
            // defaultHighlightStyle,
            keymap.of([...defaultKeymap, ...historyKeymap]),
          ],
          doc: `Welcome to the editor!`,
        }),
        parent: cmEditor,
        contentHeight: 600,
      });
      const cmEdit = document.getElementById('editor');
      const baseHeight = cmEdit.offsetHeight;
      console.log(baseHeight);

      document.querySelector('.cm-scroller').style.offsetHeight = baseHeight;
      document.querySelector('.cm-content').style.offsetHeight = baseHeight;
      document.querySelector('.cm-gutters').style.offsetHeight = baseHeight;
      document.querySelector('.cm-editor').style.offsetHeight = baseHeight;
      // document.querySelector('.cm-wrap').style.offsetHeight = baseHeight;
      // const heightElements = [cmScroller, cmContent, cmGutter, cmWrap];

      // for (const element of heightElements) {
      //   element.style.height = baseHeight;
      // }
    });
  }
</script>

<div id="editor" bind:this="{cmEditor}"></div>

<style>
  #editor {
    min-height: 100%;
    /* display: flex; */
    /* background: tomato; */
    position: relative;
  }
  :global(.cm-content, .cm-gutter) {
    /* height: 1000px; */
    overflow: auto;
  }
  :global(.cm-gutters) {
    margin: 1px;
  }
  :global(.cm-scroller) {
    overflow: auto;
  }
  :global(.cm-wrap) {
    border: 1px solid silver;
  }
</style>
