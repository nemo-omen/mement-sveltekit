<script>
  import { editorStore } from '$lib/stores/editor.store.js';
  import { onMount, afterUpdate } from 'svelte';
  import { remark } from 'remark';
  import remarkGfm from 'remark-gfm';
  import remarkRehype from 'remark-rehype';
  import rehypeStringify from 'rehype-stringify';
  import DocumentPreviewToolbar from './DocumentPreviewToolbar.svelte';

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

<div class="preview-pane">
  <DocumentPreviewToolbar />
  <div class="preview-content">
    {#if content}
      <!-- {@html content} -->
      <div class="content">{@html content}</div>
    {/if}
  </div>
</div>

<style lang="scss">
  .preview-pane {
    border-left: 1px solid var(--primary-fg-muted);
    min-height: 100%;
    overflow-y: auto;
  }

  .preview-content {
    padding: 0.5rem 1rem;
  }

  :global(.content) {
    :global(ul) {
      :global(li) {
        margin-inline-start: 1rem;
      }
    }

    :global(ol) {
      :global(li) {
        margin-inline-start: 1rem;
      }
    }
  }
</style>
