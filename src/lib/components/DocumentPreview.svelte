<script>
  import { editorStore } from '$lib/stores/editor.store.js';
  import { onMount, afterUpdate } from 'svelte';
  import { remark } from 'remark';
  import remarkRehype from 'remark-rehype';
  import rehypeStringify from 'rehype-stringify';

  $: content = '';

  $: unParsed = $editorStore.content;

  function parseContent(mdString) {}

  $: parsed = remark()
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(unParsed)
    .then((file) => {
      content = String(file);
    });
</script>

<div class="preview-pane">
  {#if content}
    <!-- {@html content} -->
    <div class="content">{@html content}</div>
  {/if}
</div>

<style lang="scss">
  .preview-pane {
    border-left: 1px solid var(--primary-fg-muted);
    min-height: 100%;
    padding: 1rem;
    overflow-y: auto;
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
