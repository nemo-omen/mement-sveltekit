<script>
  import '$lib/styles/preview.scss';
  import { editorStore } from '$lib/stores/editor.store.js';
  import { onMount, afterUpdate } from 'svelte';
  import { remark } from 'remark';
  import remarkGfm from 'remark-gfm';
  import remarkRehype from 'remark-rehype';
  import rehypeStringify from 'rehype-stringify';

  $: content = '';

  $: unParsed = $editorStore.content;

  function parseContent(mdString) {}
  onMount(() => {
    remark()
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(unParsed)
      .then((file) => {
        content = String(file);
      });
  });

  afterUpdate(() => {
    remark()
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(unParsed)
      .then((file) => {
        content = String(file);
      });
    // console.log($editorStore.doc);
  });
</script>

<div class="preview-doc">
  <div class="preview-content flow">
    {#if content}
      <!-- {@html content} -->
      <div class="content flow">{@html content}</div>
    {/if}
  </div>
</div>

<style lang="scss">
  .preview-doc {
    overflow-y: scroll;
    max-height: 94vh;
  }
  .preview-content {
    padding: 1rem;
  }
</style>
