<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import EditorToolbar from './EditorToolbar.svelte';

	const { Story } = defineMeta({
		title: 'Components/Editor/EditorToolbar',
		component: EditorToolbar,
		tags: ['autodocs']
	});

	// Example editor state objects
	const defaultState = {
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
		canUndo: true,
		canRedo: false
	};

	const activeFormattingState = {
		isBold: true,
		isItalic: true,
		isStrike: false,
		isCode: false,
		isH1: false,
		isH2: true,
		isH3: false,
		isBulletList: false,
		isOrderedList: false,
		isBlockquote: false,
		canUndo: true,
		canRedo: true
	};

	const listState = {
		isBold: false,
		isItalic: false,
		isStrike: false,
		isCode: false,
		isH1: false,
		isH2: false,
		isH3: false,
		isBulletList: true,
		isOrderedList: false,
		isBlockquote: false,
		canUndo: true,
		canRedo: false
	};
</script>

<Story
	name="Default State"
	args={{
		editorState: defaultState,
		saveStatus: 'saved'
	}}
></Story>

<Story
	name="With Active Formatting"
	args={{
		editorState: activeFormattingState,
		saveStatus: 'saved'
	}}
></Story>

<Story
	name="With List Active"
	args={{
		editorState: listState,
		saveStatus: 'saved'
	}}
></Story>

<Story
	name="Unsaved Changes"
	args={{
		editorState: defaultState,
		saveStatus: 'unsaved',
		onSave: () => alert('Saving...')
	}}
></Story>

<Story
	name="Saving"
	args={{
		editorState: defaultState,
		saveStatus: 'saving'
	}}
></Story>

<Story
	name="Disconnected"
	args={{
		editorState: defaultState,
		saveStatus: 'disconnected'
	}}
></Story>

<Story
	name="Interactive Example"
	args={{
		editorState: defaultState,
		saveStatus: 'unsaved',
		onBold: () => alert('Bold clicked'),
		onItalic: () => alert('Italic clicked'),
		onHeading: (level) => alert(`Heading ${level} clicked`),
		onUndo: () => alert('Undo clicked'),
		onRedo: () => alert('Redo clicked'),
		onSave: () => alert('Save clicked')
	}}
></Story>
