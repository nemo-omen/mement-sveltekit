<script>
  import { onMount } from 'svelte';
  import Login from '$lib/components/Login.svelte';
  import Register from '$lib/components/Register.svelte';
  import { userStore } from '$lib/stores/user.store.js';
  import { goto } from '$app/navigation';

  let login = true;

  function sendToHome() {
    goto('/home');
  }

  onMount(() => {
    if ($userStore) {
      sendToHome();
    }
  });
</script>

<section id="login">
  {#if $userStore === null}
    {#if login === true}
      <p>
        Login or
        <button on:click="{() => (login = false)}" class="btn-link">Register</button>
      </p>
      <Login on:success="{sendToHome}" />
    {:else}
      <p>
        Register or <button on:click="{() => (login = true)}" class="btn-link">Log In</button>
      </p>
      <Register on:success="{sendToHome}" />
    {/if}
  {/if}
</section>

<style>
  #login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-top: 15vh;
  }
</style>
