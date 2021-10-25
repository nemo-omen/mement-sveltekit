<script>
  import { authService } from '$lib/machines/auth.machine.js';
  import { userStore } from '$lib/stores/user.store.js';
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import '$lib/styles/reset.css';
  import '$lib/styles/global.css';
  import Header from '$lib/components/Header.svelte';

  authService.onTransition((state) => {
    console.log(state.value);
    // if (state.value === 'authorized') {
    // 	if (browser) {
    // 		goto('/home');
    // 	}
    // }

    if (state.value === 'unauthorized') {
      $userStore = null;
      if (browser) {
        goto('/');
      }
    }
  });
</script>

<Header />

<main>
  <slot />
</main>
