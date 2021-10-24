<script>
  import { createEventDispatcher } from 'svelte';
  import { userStore } from '$lib/stores/user.store.js';

  const dispatch = createEventDispatcher();

  let name;
  let userName;
  let email;
  let password;
  let error;

  const register = async () => {
    error = undefined;
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name,
          userName,
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log(await response.json());
        $userStore = { name, userName, email };
        dispatch('success');
      } else {
        error = 'An error occurred.';
      }
    } catch (error) {
      console.error(error);
      error = 'An error occurred';
    }
  };
</script>

<h2>Register</h2>

<form action="" on:submit|preventDefault="{register}">
  <div class="input-group">
    <label for="name">Name</label>
    <input type="text" name="name" bind:value="{name}" id="name" />
  </div>
  <div class="input-group">
    <label for="user-name">UserName</label>
    <input
      type="text"
      name="user-name"
      id="user-name"
      bind:value="{userName}" />
  </div>
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
  <input type="submit" value="Register" />
</form>

{#if error}
  <p>{error}</p>
{/if}
