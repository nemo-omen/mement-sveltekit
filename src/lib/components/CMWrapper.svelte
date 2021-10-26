<script>
	import CodeMirror from './CMEditor.svelte';
	import { onMount } from 'svelte';
	let loadDone = false;
	let edConfigMD = {
		language: 'markdown',
		lineNumbers: true,
		lineWrapping: true,
		lineHighlight: true
	};

	let cm;

	function textChange(e) {
		text = e.detail.data.value;
	}
	function editorChange(e) {
		cm = e.detail.data;
	}
</script>

<div id="editor">
	<CodeMirror
		height="300px"
		width="500px"
		config={edConfigMD}
		initFinished="{loadDone};"
		on:textChange={textChange}
		on:editorChange={editorChange}
	/>
</div>

<style>
	#editor {
		width: 100%;
	}
</style>
