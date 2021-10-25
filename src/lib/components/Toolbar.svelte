<script>
	import Icon from '$lib/components/Icon.svelte';
</script>

<div class="toolbar">
	<button class="toolbar-button">
		<Icon name="bold" />
	</button>
	<button class="toolbar-button">
		<Icon name="italic" />
	</button>
	<button class="toolbar-button">
		<Icon name="heading" />
	</button>
	<button class="toolbar-button">
		<Icon name="strikethrough" />
	</button>
	<button class="toolbar-button">
		<Icon name="ul" />
	</button>
	<button class="toolbar-button">
		<Icon name="ol" />
	</button>
	<button class="toolbar-button">
		<Icon name="checklist" />
	</button>
	<button class="toolbar-button">
		<Icon name="quote" />
	</button>
	<button class="toolbar-button">
		<Icon name="code" />
	</button>
	<button class="toolbar-button">
		<Icon name="table" />
	</button>
	<button class="toolbar-button">
		<Icon name="link" />
	</button>
	<button class="toolbar-button">
		<Icon name="image" />
	</button>
</div>

<style lang="scss">
	.toolbar {
		display: flex;
		border-bottom: 1px solid var(--primary-fg-muted);
	}
	.toolbar-button {
		display: flex;
		justify-content: center;
		align-items: center;
		background: transparent;
		color: var(--link);
		border: none;
		transition: all 0.3s ease-out;
		font-size: 1.5rem;
		padding: 0.5rem;
	}
	.toolbar-button:hover {
		color: var(--primary-bg);
		background-color: rgba(var(--link-rgb), 0.3);
	}
</style>
