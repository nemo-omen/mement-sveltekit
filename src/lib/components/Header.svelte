<script>
  import { goto } from '$app/navigation';
  import { onMount, afterUpdate } from 'svelte';
  import { userStore } from '$lib/stores/user.store.js';
  import MementIcon from './MementIcon.svelte';

  let email;
  let name;
  let userName;
  let errorMessage;

  async function logOut() {
    try {
      const response = fetch('/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: $userStore.email }),
      });

      if (!response.ok) {
        errorMessage = response.message;
      }

      $userStore = null;
      goto('/');
    } catch (error) {
      errorMessage = error.message;
    }
  }

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
      <nav>
        <a href="/profile">
          {$userStore.userName}
        </a>
        <button class="btn-link" on:click="{logOut}">Log Out</button>
      </nav>
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
