<script>
	import { onMount } from 'svelte';
	import { basicSetup, EditorState, EditorView } from '@codemirror/basic-setup';
	import { markdown } from '@codemirror/lang-markdown';
	import { keymap } from '@codemirror/view';
	import { defaultKeymap } from '@codemirror/commands';
	// import { myHighlightStyle } from './highlight';
	import { defaultHighlightStyle } from '@codemirror/highlight';
	import { history, historyKeymap } from '@codemirror/history';
	// import { myTheme } from './theme';
	import { githubDark } from '@ddietr/codemirror-themes/theme/github-dark';

	let editor;
	onMount(() => {
		const initialState = EditorState.create({
			doc: '',
			extensions: [
				basicSetup,
				markdown(),
				history(),
				keymap.of([...defaultKeymap, ...historyKeymap]),
				githubDark,
				// myHighlightStyle
				defaultHighlightStyle
			]
		});

		const view = new EditorView({
			parent: editor,
			state: initialState
		});
		window.view = view;
	});
</script>

<div id="editor" bind:this={editor} />

<style>
	#editor {
		min-width: 100%;
		min-height: 100%;
	}
</style>
