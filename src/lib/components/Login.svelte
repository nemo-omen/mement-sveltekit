<script>
  import { userStore } from '$lib/stores/user.store.js';
  import { authService } from '$lib/machines/auth.machine.js';

  let email;
  let password;
  let error;

  const login = async () => {
    authService.send('LOGIN');
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
        authService.send('AUTH_SUCCESS');
      } else {
        authService.send('AUTH_FAILURE');
        error = response.message;
      }
    } catch (error) {
      authService.send('AUTH_FAILURE');
      console.error(error);
      error = error.message;
    }
  };
</script>

<form action="" on:submit|preventDefault="{login}" class="login-form">
  <div class="input-group">
    <label for="email">Email</label>
    <input type="email" name="email" id="email" bind:value="{email}" />
  </div>
  <div class="input-group">
    <label for="password">Password</label>
    <input type="password" name="password" id="password" bind:value="{password}" />
  </div>
  <input type="submit" value="Login" />
</form>

{#if error}
  <p>{error}</p>
{/if}
