<script lang="ts">
	import NoteHeader from './NoteHeader.svelte';
	import RichEditor from './RichEditor.svelte';

	interface NoteEditorProps {
		// Note data
		noteId?: number | null;
		title?: string;
		content?: string;

		// Editor settings
		placeholder?: string;
		titleEditable?: boolean;

		// API/Connection status
		apiConnected?: boolean;

		// Event handlers
		onTitleChange?: (newTitle: string) => void;
		onContentChange?: (content: string, json: any) => void;
		onSave?: (noteData: { title: string; content: string; json: any }) => Promise<void>;
	}

	let {
		noteId = null,
		title = $bindable('Untitled Note'),
		content = $bindable(''),
		placeholder = 'Start writing your thoughts...',
		titleEditable = true,
		apiConnected = true,
		onTitleChange = () => {},
		onContentChange = () => {},
		onSave = async () => {}
	}: NoteEditorProps = $props();

	// Internal state for coordinating saves
	let pendingTitle = $state(title);
	let pendingContent = $state(content);
	let pendingJson = $state({});

	// Handle title changes
	function handleTitleChange(newTitle: string) {
		title = newTitle;
		pendingTitle = newTitle;
		onTitleChange(newTitle);
	}

	// Handle content changes
	function handleContentChange(newContent: string, json: any) {
		content = newContent;
		pendingContent = newContent;
		pendingJson = json;
		onContentChange(newContent, json);
	}

	// Handle save - combines title and content
	async function handleSave(htmlContent: string, json: any) {
		const noteData = {
			title: pendingTitle,
			content: htmlContent,
			json: json
		};

		await onSave(noteData);
	}
</script>

<div class="note-editor-container">
	<!-- Header with title -->
	<NoteHeader
		bind:title={pendingTitle}
		editable={titleEditable}
		onTitleChange={handleTitleChange}
		placeholder="Enter note title..."
	/>

	<!-- Rich text editor -->
	<div class="editor-wrapper">
		<RichEditor
			bind:content={pendingContent}
			{placeholder}
			mode="preview"
			{noteId}
			{apiConnected}
			onContentChange={handleContentChange}
			onSave={handleSave}
		/>
	</div>
</div>

<style>
	.note-editor-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #ffffff;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}

	.editor-wrapper {
		flex: 1;
		min-height: 0; /* Important for flex child to shrink */
	}
</style>
