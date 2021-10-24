<script>
	import { onMount } from 'svelte';
	import Login from '$lib/components/Login.svelte';
	import Register from '$lib/components/Register.svelte';
	import { userStore } from '$lib/stores/user.store.js';
	import { goto } from '$app/navigation';

	let login = true;

	function sendToHome() {
		goto('/home');
	}

	onMount(() => {
		if ($userStore) {
			sendToHome();
		}
	});
</script>

{#if login === true}
	<h3>Login</h3>
	<button on:click={() => (login = false)}>Register Instead</button>
	<Login on:success={sendToHome} />
{:else}
	<h3>Register</h3>
	<button on:click={() => (login = true)}>Log In Instead</button>
	<Register on:success={sendToHome} />
{/if}
