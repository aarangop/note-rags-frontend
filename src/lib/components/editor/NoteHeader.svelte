<script lang="ts">
	import type { NoteViewMode } from '$lib/types';
	import { Code, FileText } from 'lucide-svelte';
	import SegmentedControl from '../ui/SegmentedControl.svelte';

	interface NoteHeaderProps {
		onFileNameChange?: (event: Event) => void;
		onModeChange?: (newMode: string) => void;
		mode?: NoteViewMode;
		fileName: string;
	}

	let {
		fileName = $bindable(''),
		mode = 'preview',
		onModeChange = () => {}
	}: NoteHeaderProps = $props();

	let modeOptions = [
		{
			value: 'source',
			label: 'Source',
			icon: Code
		},
		{
			value: 'preview',
			label: 'Preview',
			icon: FileText
		}
	];
	let isEditingTitle = $state(false);

	function startEditing() {
		isEditingTitle = true;
	}

	function finishEditing() {
		isEditingTitle = false;
	}

	function handleTitleChange(event: Event) {
		fileName = (event.target as HTMLInputElement).value;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			finishEditing();
		}
	}
</script>

<div class="flex w-full items-center justify-between rounded-lg px-4 py-2 text-center">
	{#if isEditingTitle}
		<input
			type="text"
			value={fileName}
			oninput={handleTitleChange}
			onkeydown={handleKeyDown}
			onblur={finishEditing}
			class="note-title title-input -mx-1 min-h-[2.5rem] border-none p-2 placeholder-gray-400 outline-none"
		/>
	{:else}
		<button
			onclick={startEditing}
			aria-label="Edit note title"
			class="flex min-h-[2.5rem] items-center rounded px-1 hover:bg-gray-50"
		>
			<p class="note-title">{fileName}</p>
		</button>
	{/if}
	<SegmentedControl
		value={mode}
		options={modeOptions}
		iconPosition="only"
		showIcons={true}
		onchange={onModeChange}
	></SegmentedControl>
</div>

<style>
	@reference "tailwindcss";

	.note-title {
		@apply mt-6 mb-4 text-3xl font-bold text-gray-900;
	}

	.title-input:focus {
		outline: none !important;
		border: none !important;
		box-shadow: none !important;
	}
</style>
