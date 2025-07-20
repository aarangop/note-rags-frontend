<script lang="ts">
	import type { NoteViewMode } from '$lib/types';
	import MarkdownEditor from './MarkdownEditor.svelte';
	import NoteHeader from './NoteHeader.svelte';

	interface NoteEditorProps {
		fileName?: string;
		content?: string;
		placeholder?: string;
		saveTimeout?: number;
	}

	let {
		fileName = $bindable('Untitled Note'),
		content = $bindable(''),
		placeholder = 'Start writing your wonderful notes...'
	}: NoteEditorProps = $props();

	// Internal state for mode
	let currentMode = $state<NoteViewMode>('source');

	function toggleMode() {
		currentMode = currentMode === 'source' ? 'preview' : 'source';
	}
</script>

<div class="h-full">
	<NoteHeader bind:fileName mode={currentMode} onModeChange={toggleMode}></NoteHeader>
	<MarkdownEditor bind:content mode={currentMode} {placeholder} />
</div>
