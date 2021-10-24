<script context="module">
  export async function load({ page, fetch, session, stuff }) {
    let name;
    let userName;
    let email;
    let id;

    return {
      props: {
        authenticated: session.user.authenticated,
        email: session.user.email,
      },
    };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import Login from '$lib/components/Login.svelte';
  import Register from '$lib/components/Register.svelte';
  import { userStore } from '$lib/stores/user.store.js';
  import { goto } from '$app/navigation';
  import MementIcon from '$lib/components/MementIcon.svelte';

  export let authenticated;
  export let email;

  let login = true;

  function sendToHome() {
    goto('/home');
  }

  function sendToLogin() {
    goto('/');
  }

  onMount(async () => {
    const response = await fetch('/auth/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    let data;

    if (response.ok) {
      data = await response.json();
    }

    console.log('data: ', data);

    let user = {
      id: data?.id,
      authenticated,
      email,
      name: data?.name,
      userName: data?.userName,
    };

    $userStore = user;

    if ($userStore.authenticated) {
      console.log('$userStore', $userStore);
      sendToHome();
    } else {
      $userStore = null;
      sendToLogin();
    }
  });
</script>

<section id="login">
  {#if $userStore === null}
    <div class="major-logo">
      <MementIcon />
    </div>
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
    margin-top: 2rem;
  }

  .major-logo {
    font-size: 10rem;
    color: var(--link);
  }
</style>
