<script>
	import Toolbar from '$lib/components/Toolbar.svelte';
	import Header from './Header.svelte';
	function logKeypress(event) {
		if (event.key === '[') {
			console.log('left bracket!!');
		} else if (event.key === ']') {
			console.log('right bracket!!');
		}
	}

	function handleSelection(event) {
		console.log(document.getSelection());
	}
</script>

<section id="editor-pane">
	<Toolbar />
	<textarea class="editor" on:keypress={logKeypress} on:select={handleSelection} />
</section>

<style lang="scss">
	.editor {
		font-size: 1rem;
		line-height: 1.5;
		font-family: 'Courier New', Courier, monospace;
		min-height: 90%;
		min-width: 100%;
		background-color: var(--primary-bg);
		color: var(--primary-fg);
		border: none;
		padding: 1rem;
		resize: none;
		overflow-y: scroll;
	}
	.editor:focus {
		background-color: rgba(var(--primary-fg), 0.1);
		outline: 3px solid rgba(var(--link-rgb), 0.3);
		outline-offset: -3px;
	}
</style>
