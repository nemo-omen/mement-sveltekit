<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  import { userStore } from '$lib/stores/user.store.js';

  let email;
  let password;
  let error;

  const login = async () => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        $userStore = data.user;
        dispatch('success');
      } else {
        error = response.message;
      }
    } catch (error) {
      console.error(error);
      error = error.message;
    }
  };
</script>

<h2>Login</h2>

<form action="" on:submit|preventDefault="{login}">
  <div class="input-group">
    <label for="email">Email</label>
    <input type="email" name="email" id="email" bind:value="{email}" />
  </div>
  <div class="input-group">
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      bind:value="{password}" />
  </div>
  <input type="submit" value="Login" />
</form>

{#if error}
  <p>{error}</p>
{/if}
