<script lang="ts">
	import { onDestroy } from 'svelte';
	import EditorToolbar from './EditorToolbar.svelte';
	import RichTextEditor from './RichTextEditor.svelte';

	interface EditorState {
		isBold: boolean;
		isItalic: boolean;
		isStrike: boolean;
		isCode: boolean;
		isH1: boolean;
		isH2: boolean;
		isH3: boolean;
		isBulletList: boolean;
		isOrderedList: boolean;
		isBlockquote: boolean;
		canUndo: boolean;
		canRedo: boolean;
	}

	interface SelectionData {
		text: string;
		position: { x: number; y: number };
	}

	interface RichEditorProps {
		content?: string;
		placeholder?: string;
		mode?: 'source' | 'preview';
		noteId?: number | null;
		apiConnected?: boolean;
		onContentChange?: (content: string, json: any) => void;
		onSave?: (content: string, json: any) => Promise<void>;
	}

	let {
		content = $bindable(''),
		placeholder = 'Start writing your thoughts...',
		mode = 'preview',
		noteId = null,
		apiConnected = true,
		onContentChange = () => {},
		onSave = async () => {}
	}: RichEditorProps = $props();

	// Component state
	let editorState = $state<EditorState>({
		isBold: false,
		isItalic: false,
		isStrike: false,
		isCode: false,
		isH1: false,
		isH2: false,
		isH3: false,
		isBulletList: false,
		isOrderedList: false,
		isBlockquote: false,
		canUndo: false,
		canRedo: false
	});

	let textSelection = $state<SelectionData | null>(null);
	let isSaving = $state(false);
	let hasUnsavedChanges = $state(false);
	let richTextEditor: RichTextEditor;

	// Auto-save timer
	let autoSaveTimer: NodeJS.Timeout | null = null;
	const AUTO_SAVE_DELAY = 2000;

	// Calculate save status
	const saveStatus = $derived(() => {
		if (!apiConnected) return 'disconnected';
		if (isSaving) return 'saving';
		if (hasUnsavedChanges) return 'unsaved';
		return 'saved';
	});

	const currentSaveStatus = $derived(saveStatus());

	// Handle content changes from editor
	function handleContentChange(html: string, json: any) {
		content = html;
		onContentChange(html, json);

		// Mark as having unsaved changes
		hasUnsavedChanges = true;

		// Set up auto-save
		if (autoSaveTimer) {
			clearTimeout(autoSaveTimer);
		}
		autoSaveTimer = setTimeout(() => {
			handleAutoSave(html, json);
		}, AUTO_SAVE_DELAY);
	}

	// Handle editor state changes
	function handleEditorStateChange(state: EditorState) {
		editorState = state;
	}

	// Handle text selection
	function handleTextSelection(selection: SelectionData | null) {
		textSelection = selection;
	}

	// Auto-save functionality
	async function handleAutoSave(html: string, json: any) {
		if (!hasUnsavedChanges || !noteId || !apiConnected) return;

		try {
			await onSave(html, json);
			hasUnsavedChanges = false;
		} catch (error) {
			console.error('Auto-save failed:', error);
		}
	}

	// Manual save
	async function handleManualSave() {
		if (!richTextEditor || isSaving || !apiConnected) return;

		isSaving = true;
		try {
			const html = richTextEditor.getHTML();
			const json = richTextEditor.getJSON();
			await onSave(html, json);
			hasUnsavedChanges = false;
		} catch (error) {
			console.error('Manual save failed:', error);
		} finally {
			isSaving = false;
		}
	}

	// Toolbar event handlers
	function handleBold() {
		richTextEditor?.toggleBold();
	}

	function handleItalic() {
		richTextEditor?.toggleItalic();
	}

	function handleStrike() {
		richTextEditor?.toggleStrike();
	}

	function handleCode() {
		richTextEditor?.toggleCode();
	}

	function handleHeading(level: 1 | 2 | 3) {
		richTextEditor?.setHeading(level);
	}

	function handleBulletList() {
		richTextEditor?.toggleBulletList();
	}

	function handleOrderedList() {
		richTextEditor?.toggleOrderedList();
	}

	function handleBlockquote() {
		richTextEditor?.toggleBlockquote();
	}

	function handleUndo() {
		richTextEditor?.undo();
	}

	function handleRedo() {
		richTextEditor?.redo();
	}

	// AI Action handlers (placeholders for now)
	function handleAIAction(action: string) {
		if (!textSelection) return;

		console.log(`AI Action: ${action} on text: "${textSelection.text}"`);
		// Hide selection menu
		textSelection = null;

		// These will connect to your genai-api later:
		switch (action) {
			case 'research':
				// Call research API with textSelection.text
				break;
			case 'expand':
				// Call expand API with textSelection.text
				break;
			case 'improve':
				// Call improve API with textSelection.text
				break;
		}
	}

	// Cleanup
	onDestroy(() => {
		if (autoSaveTimer) {
			clearTimeout(autoSaveTimer);
		}
	});
</script>

<!-- Editor Container -->
<div class="rich-editor-container">
	<!-- Toolbar -->
	<EditorToolbar
		{editorState}
		saveStatus={currentSaveStatus}
		onBold={handleBold}
		onItalic={handleItalic}
		onStrike={handleStrike}
		onCode={handleCode}
		onHeading={handleHeading}
		onBulletList={handleBulletList}
		onOrderedList={handleOrderedList}
		onBlockquote={handleBlockquote}
		onUndo={handleUndo}
		onRedo={handleRedo}
		onSave={handleManualSave}
	/>

	<!-- Text Editor -->
	<RichTextEditor
		bind:this={richTextEditor}
		bind:content
		{placeholder}
		{mode}
		onContentChange={handleContentChange}
		onEditorStateChange={handleEditorStateChange}
		onTextSelection={handleTextSelection}
	/>

	<!-- AI Selection Menu -->
	{#if textSelection}
		<div
			class="ai-selection-menu"
			style="left: {textSelection.position.x}px; top: {textSelection.position.y}px;"
		>
			<div class="selection-preview">
				"{textSelection.text.slice(0, 50)}{textSelection.text.length > 50 ? '...' : ''}"
			</div>
			<div class="ai-actions">
				<button class="ai-action-btn research" onclick={() => handleAIAction('research')}>
					🔍 Research
				</button>
				<button class="ai-action-btn expand" onclick={() => handleAIAction('expand')}>
					📝 Expand
				</button>
				<button class="ai-action-btn improve" onclick={() => handleAIAction('improve')}>
					✨ Improve
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.rich-editor-container {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	/* AI Selection Menu */
	.ai-selection-menu {
		position: fixed;
		z-index: 1000;
		background: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
		padding: 0.75rem;
		min-width: 240px;
		transform: translateX(-50%);
	}

	.selection-preview {
		font-size: 0.75rem;
		color: #6b7280;
		background: #f3f4f6;
		padding: 0.5rem;
		border-radius: 4px;
		margin-bottom: 0.5rem;
		font-style: italic;
		border-left: 3px solid #3b82f6;
	}

	.ai-actions {
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
	}

	.ai-action-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		border: none;
		border-radius: 6px;
		background: #f8fafc;
		color: #1e293b;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.15s ease;
		text-align: left;
	}

	.ai-action-btn:hover {
		background: #e2e8f0;
		transform: translateY(-1px);
	}

	.ai-action-btn.research:hover {
		background: #dbeafe;
		color: #1e40af;
	}

	.ai-action-btn.expand:hover {
		background: #dcfce7;
		color: #166534;
	}

	.ai-action-btn.improve:hover {
		background: #fef3c7;
		color: #92400e;
	}
</style>
