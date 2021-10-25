<script>
	import { userStore } from '$lib/stores/user.store.js';
	import { authService } from '$lib/machines/auth.machine.js';

	let name;
	let userName;
	let email;
	let password;
	let error;

	const register = async () => {
		error = undefined;
		authService.send('LOGIN');
		try {
			const response = await fetch('/auth/register', {
				method: 'POST',
				body: JSON.stringify({
					name,
					userName,
					email,
					password
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				console.log(await response.json());
				$userStore = { name, userName, email };
				authService.send('AUTH_SUCCESS');
			} else {
				authService.send('AUTH_FAILURE');
				error = 'Whoah! Something went wrong with registration.';
			}
		} catch (error) {
			authService.send('AUTH_FAILURE');
			console.error(error);
			error = 'Whoah! Something went wrong with registration.';
		}
	};
</script>

<form action="" on:submit|preventDefault={register} class="login-form">
	<div class="input-group">
		<label for="name">Name</label>
		<input type="text" name="name" bind:value={name} id="name" />
	</div>
	<div class="input-group">
		<label for="user-name">UserName</label>
		<input type="text" name="user-name" id="user-name" bind:value={userName} />
	</div>
	<div class="input-group">
		<label for="email">Email</label>
		<input type="email" name="email" id="email" bind:value={email} />
	</div>
	<div class="input-group">
		<label for="password">Password</label>
		<input type="password" name="password" id="password" bind:value={password} />
	</div>
	<input type="submit" value="Register" />
</form>

{#if error}
	<p>{error}</p>
{/if}
