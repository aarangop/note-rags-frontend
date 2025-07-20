<script lang="ts">
	import { marked } from 'marked';

	interface MarkdownEditorProps {
		content?: string;
		placeholder?: string;
		mode?: 'source' | 'preview';
	}
	let {
		content = $bindable(''),
		placeholder = 'Start writing...',
		mode = 'preview'
	}: MarkdownEditorProps = $props();

	let currentMode = $state(mode);
	let markdownContent = $state(content);

	marked.setOptions({
		gfm: true,
		breaks: true
	});

	function markdownToHTML(markdown: string): string {
		return marked(markdown) as string;
	}

	$effect(() => {
		currentMode = mode;
	});
</script>

{#if currentMode === 'source'}
	<textarea
		bind:value={markdownContent}
		{placeholder}
		class="editor-focus w-full resize-none overflow-y-auto border-0 p-4 font-mono text-sm leading-relaxed"
		style="height: calc(100vh - 2rem);"
	></textarea>
{:else}
	<div class="editor-focus w-full resize-none overflow-y-auto border-0 p-4 text-sm leading-relaxed">
		{@html markdownToHTML(markdownContent)}
	</div>
{/if}

<style>
	.editor-focus:focus {
		outline: none !important;
		box-shadow: none !important;
		border: none !important;
	}
</style>
