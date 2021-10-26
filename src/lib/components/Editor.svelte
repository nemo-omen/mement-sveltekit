<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import * as monaco from 'monaco-editor';
  // import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  // import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
  // import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
  // import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
  // import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
  import Toolbar from '$lib/components/Toolbar.svelte';

  let editor;

  if (browser) {
    // self.MonacoEnvironment = {
    // 	getWorker(_, label) {
    // 		if (label === 'json') {
    // 			return new jsonWorker();
    // 		}
    // 		if (label === 'css' || label === 'scss' || label === 'less') {
    // 			return new cssWorker();
    // 		}
    // 		if (label === 'html' || label === 'handlebars' || label === 'razor') {
    // 			return new htmlWorker();
    // 		}
    // 		if (label === 'typescript' || label === 'javascript') {
    // 			return new tsWorker();
    // 		}
    // 		return new editorWorker();
    // 	}
    // };

    onMount(() => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      console.log('matchMedia dark?: ', isDark);

      monaco.editor.defineTheme('mementTheme', {
        base: isDark ? 'vs-dark' : 'vs',
        inherit: true,
        rules: [{ background: '#eff1f3ff' }],
        colors: {
          'editor.foreground': isDark ? '#eff1f3ff' : '#0f131a',
          'editor.background': isDark ? '#0f131a' : '#eff1f3ff',
          'editorOverviewRuler.border': 'none',
          // 'minimap.background': isDark ? '#eff1f3ff' : '#0f131a',
          // 'minimap.foreground': isDark ? '#0f131a' : '#eff1f3ff',
        },
      });

      monaco.editor.setTheme('mementTheme');

      monaco.editor.create(editor, {
        value: '## Welcome to the Editor!!',
        language: 'markdown',
        minimap: {
          enabled: false,
        },
      });
    });
  }
</script>

<section id="editor-pane">
  <Toolbar />
  <div class="editor" bind:this="{editor}"></div>
</section>

<style lang="scss">
  .editor-pane {
    display: flex;
    flex-direction: column;
    min-width: 100%;
  }
  .editor {
    font-size: 1rem;
    line-height: 1.5;
    min-height: 100%;
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
