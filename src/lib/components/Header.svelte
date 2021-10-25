<script>
	import { userStore } from '$lib/stores/user.store.js';
	import MementIcon from './MementIcon.svelte';
	import Nav from '$lib/components/Nav.svelte';
</script>

<header>
	<div id="site-icon">
		<a href="/">
			<MementIcon />
		</a>
	</div>
	<div class="user-control">
		{#if $userStore}
			<Nav />
		{/if}
	</div>
</header>

<style lang="scss">
	header {
		padding: 1rem 2rem;
		justify-content: space-between;
		border-bottom: 1px solid var(--primary-fg-muted);
	}
	#site-icon {
		font-size: 2rem;
	}
	#site-icon a {
		color: var(--link);
		transition: all 0.3s east-out;
	}
	#site-icon a:hover {
		color: #ff6347;
	}
</style>
