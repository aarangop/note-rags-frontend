<script lang="ts">
	import { Editor } from '@tiptap/core';
	import Placeholder from '@tiptap/extension-placeholder';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';

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

	interface RichTextEditorProps {
		content?: string;
		placeholder?: string;
		mode?: 'source' | 'preview';
		onContentChange?: (content: string, json: any) => void;
		onEditorStateChange?: (state: EditorState) => void;
		onTextSelection?: (selection: SelectionData | null) => void;
	}

	let {
		content = $bindable(''),
		placeholder = 'Start writing your thoughts...',
		mode = 'preview',
		onContentChange = () => {},
		onEditorStateChange = () => {},
		onTextSelection = () => {}
	}: RichTextEditorProps = $props();

	let editorElement: HTMLElement;
	let editor: Editor;

	// Initialize TipTap editor
	onMount(() => {
		editor = new Editor({
			element: editorElement,
			extensions: [
				StarterKit.configure({
					heading: {
						levels: [1, 2, 3, 4, 5, 6]
					},
					bulletList: {
						keepMarks: true,
						keepAttributes: false
					},
					orderedList: {
						keepMarks: true,
						keepAttributes: false
					}
				}),
				Placeholder.configure({
					placeholder: placeholder,
					emptyEditorClass: 'is-editor-empty'
				})
			],
			content: content,
			editorProps: {
				attributes: {
					class: 'rich-editor-content'
				},
				handleDOMEvents: {
					mouseup: (view, event) => {
						handleTextSelection();
						return false;
					},
					keyup: (view, event) => {
						handleTextSelection();
						return false;
					}
				}
			},
			onUpdate: ({ editor }) => {
				const html = editor.getHTML();
				const json = editor.getJSON();
				content = html;
				onContentChange(html, json);
				updateEditorState();
			},
			onCreate: ({ editor }) => {
				updateEditorState();
			},
			onSelectionUpdate: ({ editor }) => {
				updateEditorState();
			}
		});
	});

	// Update editor state and notify parent
	function updateEditorState() {
		if (!editor) return;

		const state: EditorState = {
			isBold: editor.isActive('bold'),
			isItalic: editor.isActive('italic'),
			isStrike: editor.isActive('strike'),
			isCode: editor.isActive('code'),
			isH1: editor.isActive('heading', { level: 1 }),
			isH2: editor.isActive('heading', { level: 2 }),
			isH3: editor.isActive('heading', { level: 3 }),
			isBulletList: editor.isActive('bulletList'),
			isOrderedList: editor.isActive('orderedList'),
			isBlockquote: editor.isActive('blockquote'),
			canUndo: editor.can().undo(),
			canRedo: editor.can().redo()
		};

		onEditorStateChange(state);
	}

	// Handle text selection for AI features
	function handleTextSelection() {
		if (!editor) return;

		const { from, to } = editor.state.selection;
		const text = editor.state.doc.textBetween(from, to, ' ');

		if (text && text.trim().length > 0) {
			// Get selection position
			const selection = window.getSelection();
			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0);
				const rect = range.getBoundingClientRect();

				onTextSelection({
					text: text.trim(),
					position: {
						x: rect.left + rect.width / 2,
						y: rect.top - 10
					}
				});
			}
		} else {
			onTextSelection(null);
		}
	}

	// Expose editor methods for parent component
	export function toggleBold() {
		editor?.chain().focus().toggleBold().run();
	}

	export function toggleItalic() {
		editor?.chain().focus().toggleItalic().run();
	}

	export function toggleStrike() {
		editor?.chain().focus().toggleStrike().run();
	}

	export function toggleCode() {
		editor?.chain().focus().toggleCode().run();
	}

	export function setHeading(level: 1 | 2 | 3) {
		editor?.chain().focus().toggleHeading({ level }).run();
	}

	export function toggleBulletList() {
		editor?.chain().focus().toggleBulletList().run();
	}

	export function toggleOrderedList() {
		editor?.chain().focus().toggleOrderedList().run();
	}

	export function toggleBlockquote() {
		editor?.chain().focus().toggleBlockquote().run();
	}

	export function undo() {
		editor?.chain().focus().undo().run();
	}

	export function redo() {
		editor?.chain().focus().redo().run();
	}

	export function getHTML(): string {
		return editor?.getHTML() || '';
	}

	export function getJSON(): any {
		return editor?.getJSON() || {};
	}

	// Handle mode changes
	$effect(() => {
		if (editor && mode === 'source') {
			const html = editor.getHTML();
			console.log('Source mode - HTML content:', html);
		}
	});

	// Cleanup
	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div bind:this={editorElement} class="rich-text-editor" class:source-mode={mode === 'source'}></div>

<style>
	.rich-text-editor {
		flex: 1;
		height: 100%;
		overflow-y: auto;
		border-radius: 0 0 8px 8px;
	}

	/* Modern TipTap Editor Styling */
	:global(.rich-editor-content) {
		outline: none;
		padding: 1.5rem;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			sans-serif;
		font-size: 16px;
		line-height: 1.6;
		color: #1f2937;
		background: #ffffff;
		border-radius: 8px;
		min-height: calc(100vh - 8rem);
	}

	/* Typography Styles */
	:global(.rich-editor-content h1) {
		font-size: 2.5rem;
		font-weight: 700;
		color: #111827;
		margin: 2rem 0 1rem 0;
		line-height: 1.2;
	}

	:global(.rich-editor-content h2) {
		font-size: 2rem;
		font-weight: 600;
		color: #1f2937;
		margin: 1.75rem 0 0.75rem 0;
		line-height: 1.3;
	}

	:global(.rich-editor-content h3) {
		font-size: 1.5rem;
		font-weight: 600;
		color: #374151;
		margin: 1.5rem 0 0.5rem 0;
		line-height: 1.4;
	}

	:global(.rich-editor-content h4) {
		font-size: 1.25rem;
		font-weight: 500;
		color: #4b5563;
		margin: 1.25rem 0 0.5rem 0;
	}

	:global(.rich-editor-content h5) {
		font-size: 1.125rem;
		font-weight: 500;
		color: #6b7280;
		margin: 1rem 0 0.25rem 0;
	}

	:global(.rich-editor-content h6) {
		font-size: 1rem;
		font-weight: 500;
		color: #9ca3af;
		margin: 1rem 0 0.25rem 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	:global(.rich-editor-content p) {
		margin: 0.75rem 0;
		color: #374151;
	}

	/* List Styles */
	:global(.rich-editor-content ul, .rich-editor-content ol) {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	:global(.rich-editor-content ul li) {
		list-style-type: disc;
		margin: 0.25rem 0;
		color: #4b5563;
	}

	:global(.rich-editor-content ol li) {
		list-style-type: decimal;
		margin: 0.25rem 0;
		color: #4b5563;
	}

	/* Inline Formatting */
	:global(.rich-editor-content strong) {
		font-weight: 600;
		color: #111827;
	}

	:global(.rich-editor-content em) {
		font-style: italic;
		color: #374151;
	}

	:global(.rich-editor-content code) {
		background: #f3f4f6;
		color: #dc2626;
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
		font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
		font-size: 0.875rem;
	}

	/* Blockquote */
	:global(.rich-editor-content blockquote) {
		border-left: 4px solid #e5e7eb;
		padding-left: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		color: #6b7280;
		background: #f9fafb;
		padding: 1rem 1rem 1rem 1.5rem;
		border-radius: 0 0.5rem 0.5rem 0;
	}

	/* Placeholder Styling */
	:global(.rich-editor-content.is-editor-empty::before) {
		content: attr(data-placeholder);
		float: left;
		color: #9ca3af;
		pointer-events: none;
		height: 0;
	}

	/* Source Mode Styling */
	.source-mode :global(.rich-editor-content) {
		font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
		font-size: 14px;
		background: #1e1e1e;
		color: #d4d4d4;
	}
</style>
