<script context="module">
  export async function load({ page, fetch, session, stuff }) {
    return {
      props: {
        authenticated: session?.user.authenticated,
        email: session?.user.email,
      },
    };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import Login from '$lib/components/Login.svelte';
  import Register from '$lib/components/Register.svelte';
  import EditorSidebar from '$lib/components/EditorSidebar.svelte';
  import CMEditor from '$lib/components/CMEditor.svelte';
  import { userStore } from '$lib/stores/user.store.js';
  import MementIcon from '$lib/components/MementIcon.svelte';
  import { authService } from '$lib/machines/auth.machine.js';

  // export let user;
  export let email;
  export let authenticated;

  let login = true;

  if (authenticated === true) {
    authService.send('PREAUTH');
  }

  authService.onTransition((state) => {
    if (state.value === 'authorized') {
      // $userStore = user;
      goto('/editor');
    }
  });
</script>

<section id="login">
  <div class="major-logo">
    <MementIcon />
  </div>
  {#if login === true}
    <p>
      Login or
      <button on:click="{() => (login = false)}" class="btn-link">Register</button>
    </p>
    <Login />
  {:else}
    <p>
      Register or <button on:click="{() => (login = true)}" class="btn-link">Log In</button>
    </p>
    <Register />
  {/if}
</section>

<style lang="scss">
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
