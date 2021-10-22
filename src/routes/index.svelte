<script context="module">
	export async function load({ page, fetch, session }) {
		const url = '/user.json';
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: 'Jeff'
			})
		});
		if (response.ok) {
			return {
				props: {
					data: await response.json()
				}
			};
		}
		return {
			status: response.status,
			error: new Error('Nope!')
		};
	}
</script>

<script>
	import { onMount } from 'svelte';
	export let data;
	console.log();

	onMount(async () => {
		const postResponse = await fetch('/user.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				thing: 'Whatever'
			})
		});

		if (!postResponse.ok) {
			console.log('Post response not ok.');
		}

		const data = await postResponse.json();
		console.log('message from POST: ', data.message);
	});
</script>

<h2>{data.message}</h2>
