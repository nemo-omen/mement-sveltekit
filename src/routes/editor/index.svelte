<script context="module">
  // export const ssr = false;
  export async function load({ page, fetch, session, stuff }) {
    let user = {
      id: '',
      name: '',
      userName: '',
      email: '',
      authenticated: false,
    };

    try {
      const response = await fetch('http://localhost:3000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session?.user.email }),
      });

      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();

      user = {
        id: data.id || '',
        name: data.name || '',
        userName: data.userName || '',
        email: session.user.email || '',
        authenticated: session.user.authenticated,
      };
    } catch (error) {
      console.error(error);
    }

    return {
      props: {
        user,
      },
    };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { userStore } from '$lib/stores/user.store.js';
  import EditorSidebar from '$lib/components/EditorSidebar.svelte';
  // import CMEditor from '$lib/components/CMEditor.svelte';

  export let user;
  let EditorComponent;

  onMount(async () => {
    // const module = await import('$lib/components/CMEditor.svelte');
    // EditorComponent = module.default;
    $userStore = user;
  });
</script>

<section id="workspace">
  <EditorSidebar />
  <!-- <CMEditor /> -->
  <!-- <svelte:component this="{EditorComponent}" /> -->
</section>

<style>
  #workspace {
    display: grid;
    grid-template-columns: auto 1fr;
    flex-grow: 1;
    min-height: 100%;
    min-width: 100%;
  }
</style>
