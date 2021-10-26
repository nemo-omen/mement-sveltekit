import sveltePreprocess from 'svelte-preprocess';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess(),
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    // target: document.body,
    vite: () => ({
      plugins: [
        monacoEditorPlugin,
      ]
    }),
  },
};

export default config;
