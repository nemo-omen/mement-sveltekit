<script>
	import { onMount, afterUpdate } from 'svelte';
	import { userStore } from '$lib/stores/user.store.js';
	import MementIcon from './MementIcon.svelte';

	let email;
	let name;
	let userName;

	onMount(() => {
		email = $userStore.email;
		name = $userStore.name;
		userName = $userStore.userName;
	});
</script>

<header>
	<div id="site-icon">
		<a href="/">
			<MementIcon />
		</a>
	</div>
	<div class="user-control">
		{#if $userStore}
			<a href="/profile">
				{$userStore.userName}
			</a>
		{/if}
	</div>
</header>

<style>
	header {
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
	}
	#site-icon {
		font-size: 3rem;
	}
	#site-icon a {
		color: black;
		transition: all 0.3s east-out;
	}
	#site-icon a:hover {
		color: tomato;
	}
</style>
