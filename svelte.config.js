import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess(),
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    // target: document.body,
    ssr: false,
    vite: () => ({
      optimizeDeps: {
        include: ['remark', 'remark-gfm', 'remark-rehype', 'rehype-stringify'],
        keepNames: true,
      },
    }),
  },
};

export default config;
