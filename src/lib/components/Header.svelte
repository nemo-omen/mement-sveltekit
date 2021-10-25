<script>
  import { userStore } from '$lib/stores/user.store.js';
  import { goto } from '$app/navigation';
  import { createEventDispatcher } from 'svelte';
  import MementIcon from './MementIcon.svelte';
  import Nav from '$lib/components/Nav.svelte';

  const dispatch = createEventDispatcher();

  function goToLogin() {
    console.log('FUUUUUCK!');
    $userStore = null;
    goto('/');
  }
</script>

<header>
  <div id="site-icon">
    <a href="/">
      <MementIcon />
    </a>
  </div>
  <div class="user-control">
    {#if $userStore}
      <Nav on:logout="{goToLogin}" />
    {/if}
  </div>
</header>

<style lang="scss">
  header {
    padding: 1rem 2rem;
    justify-content: space-between;
    border-bottom: 1px solid var(--primary-fg-muted);
  }
  #site-icon {
    font-size: 2rem;
  }
  #site-icon a {
    color: var(--link);
    transition: all 0.3s east-out;
  }
  #site-icon a:hover {
    color: #ff6347;
  }
</style>
