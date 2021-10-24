<script context="module">
  export async function load({ session }) {
    console.log('session.user', session);
    if (session.user.authenticated === true) {
      return {
        status: 302,
        redirect: '/home',
      };
    }
  }
</script>

<script>
  import Login from '$lib/components/Login.svelte';
  import Register from '$lib/components/Register.svelte';
  import { goto } from '$app/navigation';

  let login = true;

  function sendToHome() {
    goto('/home');
  }
</script>

{#if login === true}
  <h3>Login</h3>
  <button on:click="{() => (login = false)}">Register Instead</button>
  <Login on:success="{sendToHome}" />
{:else}
  <h3>Register</h3>
  <button on:click="{() => (login = true)}">Log In Instead</button>
  <Register on:success="{sendToHome}" />
{/if}
