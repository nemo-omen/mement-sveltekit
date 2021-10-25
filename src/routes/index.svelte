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
  import Login from '$lib/components/Login.svelte';
  import Register from '$lib/components/Register.svelte';
  import { userStore } from '$lib/stores/user.store.js';
  import MementIcon from '$lib/components/MementIcon.svelte';
  import { authService } from '$lib/machines/auth.machine.js';

  export let authenticated;
  export let email;

  let login = true;

  authService.onTransition((state) => {
    if (state.value === 'authorized') {
      setUserStore();
    }
  });

  async function setUserStore() {
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

    let user = {
      id: data?.id,
      authenticated,
      email,
      name: data?.name,
      userName: data?.userName,
    };

    $userStore = user;
  }
</script>

{#if $authService.matches('authenticated')}
  <section id="home">
    <div class="major-logo">
      <MementIcon />
    </div>
  </section>
{:else}
  <section id="login">
    <div class="major-logo">
      <MementIcon />
    </div>
    {#if $userStore === null}
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
    {/if}
  </section>
{/if}

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
