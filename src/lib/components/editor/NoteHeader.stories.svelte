<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NoteHeader from './NoteHeader.svelte';
	const { Story } = defineMeta({
		title: 'Components/Editor/NoteHeader',
		component: NoteHeader,
		tags: ['autodocs']
	});
</script>

<Story
	name="Default"
	args={{
		mode: 'preview',
		fileName: 'Story Note'
	}}
></Story>
