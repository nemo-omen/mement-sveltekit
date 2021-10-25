<script>
	import { onMount, afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores/user.store.js';
	import { authService } from '$lib/machines/auth.machine.js';
	onMount(() => {
		// if ($userStore === null) {
		// 	goto('/');
		// }
		if ($authService.value === 'unauthorized') goto('/');
	});
</script>

<h2>Home</h2>
