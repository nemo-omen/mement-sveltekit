<script>
  import { onMount, afterUpdate } from 'svelte';
  import { goto } from '$app/navigation';
  import { userStore } from '$lib/stores/user.store.js';

  onMount(() => {
    if ($userStore === null) {
      goto('/');
    }
  });
</script>

<h2>Home</h2>
