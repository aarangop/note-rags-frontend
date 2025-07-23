<script lang="ts">
	import InlineEditable from '../ui/InlineEditable.svelte';

	interface NoteHeaderProps {
		title?: string;
		editable?: boolean;
		onTitleChange?: (newTitle: string) => void;
		placeholder?: string;
	}

	let {
		title = $bindable('Untitled Note'),
		editable = true,
		onTitleChange = () => {},
		placeholder = 'Enter note title...'
	}: NoteHeaderProps = $props();
</script>

<div class="border-b border-gray-200 bg-white px-6 py-4">
	<InlineEditable
		bind:value={title}
		{placeholder}
		{editable}
		maxlength={200}
		textClass="text-xl font-semibold text-gray-900"
		onchange={onTitleChange}
	/>
</div>
