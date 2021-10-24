<script>
  import { onMount, afterUpdate } from 'svelte';
  import { userStore } from '$lib/stores/user.store.js';
  import MementIcon from './MementIcon.svelte';

  let email;
  let name;
  let userName;

  onMount(() => {
    if ($userStore) {
      email = $userStore.email;
      name = $userStore.name;
      userName = $userStore.userName;
    }
  });
</script>

<header>
  <div id="site-icon">
    <a href="/">
      <MementIcon />
    </a>
  </div>
  <div class="user-control">
    {#if $userStore}
      <a href="/profile">
        {$userStore.userName}
      </a>
    {/if}
  </div>
</header>

<style>
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

  .user-control {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .user-control a {
    text-decoration: none;
  }
</style>
