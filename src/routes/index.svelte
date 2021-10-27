<script context="module">
  export let ssr = false;
  export async function load({ page, fetch, session, stuff }) {
    let name;
    let userName;
    let email;
    let authenticated;
    let id;

    email = session.user.email;
    authenticated = session.user.authenticated;

    try {
      const response = await fetch('/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      });

      const data = await response.json();

      userName = data.userName;
      name = data.name;
      id = data.id;
    } catch (error) {
      console.error(error);
    }

    return {
      props: {
        user: {
          authenticated: authenticated,
          email: email,
          name: name,
          userName: userName,
          id: id,
        },
      },
    };
  }
</script>

<script>
  import Login from '$lib/components/Login.svelte';
  import Register from '$lib/components/Register.svelte';
  import EditorSidebar from '$lib/components/EditorSidebar.svelte';
  import Editor from '$lib/components/Editor.svelte';
  import { userStore } from '$lib/stores/user.store.js';
  import MementIcon from '$lib/components/MementIcon.svelte';
  import { authService } from '$lib/machines/auth.machine.js';

  // export let authenticated;
  // export let email;
  export let user;
  // $userStore = user;

  let login = true;

  if (user.authenticated) {
    authService.send('PREAUTH');
  }

  authService.onTransition((state) => {
    if (state.value === 'authorized') {
      $userStore = user;
    }
  });

  // async function setUserStore() {
  //   // const response = await fetch('/auth/user', {
  //   const response = await fetch('/auth', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email }),
  //   });

  //   let data;

  //   if (response.ok) {
  //     data = await response.json();
  //   }

  //   let user = {
  //     id: data?.id,
  //     authenticated,
  //     email,
  //     name: data?.name,
  //     userName: data?.userName,
  //   };

  //   $userStore = user;
  // }
</script>

{#if $authService.matches('authorized')}
  <section id="workspace">
    <EditorSidebar />
    <Editor />
    <!-- <CMEditor /> -->
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

  #workspace {
    display: grid;
    grid-template-columns: auto 1fr;
    flex-grow: 1;
    min-height: 100%;
    min-width: 100%;
  }
</style>
