<!-- <script context="module">
  export async function load({ session }) {
    console.log('session.user', session);
    if (!session.user.authenticated || !session.user.email) {
      return {
        status: 302,
        redirect: '/',
      };
    }
    return {
      props: {
        user: session.user,
      },
    };
  }
</script> -->
<script>
  import { userStore } from '$lib/stores/user.store.js';
  // $userStore = user;
</script>

<h2>Home</h2>

{#if $userStore !== null}
  <p>You made it, {$userStore?.name}!</p>
{/if}
