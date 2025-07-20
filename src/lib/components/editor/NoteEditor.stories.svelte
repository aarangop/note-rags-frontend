<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NoteEditor from './NoteEditor.svelte';

	const { Story } = defineMeta({
		title: 'Components/Editor/NoteEditor',
		component: NoteEditor,
		tags: ['autodocs']
	});
</script>

<Story name="Source Mode Empty"></Story>
<Story
	name="Source Mode with Content"
	args={{
		fileName: 'Sample Note with Content',
		content: '# Header 1\nThis is some content\n## Header 2\n More content.'
	}}
></Story>
