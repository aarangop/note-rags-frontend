<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import RichTextEditor from './RichTextEditor.svelte';

	const { Story } = defineMeta({
		title: 'Components/Editor/RichTextEditor',
		component: RichTextEditor,
		tags: ['autodocs'],
		args: {
			onchange: fn(),
			onstatechange: fn(),
			onselection: fn()
		}
	});
</script>

<Story
	name="Default"
	args={{
		content: '',
		placeholder: 'Start writing...'
	}}
></Story>

<Story
	name="With Content"
	args={{
		content:
			'<h1>Welcome to the Editor</h1><p>This is a <strong>rich text editor</strong> with <em>formatting</em> capabilities.</p><ul><li>You can create lists</li><li>Apply formatting</li><li>And much more!</li></ul>',
		placeholder: 'Start writing...'
	}}
></Story>

<Story
	name="Source Mode"
	args={{
		content: '<h1>Welcome</h1><p>This is in <strong>source mode</strong>.</p>',
		mode: 'source'
	}}
></Story>

<Story
	name="Preview Mode"
	args={{
		content: '<h1>Welcome</h1><p>This is in <strong>preview mode</strong>.</p>',
		mode: 'preview'
	}}
></Story>

<Story
	name="Custom Placeholder"
	args={{
		content: '',
		placeholder: 'Enter your thoughts here...'
	}}
></Story>

<Story
	name="Interactive Example"
	args={{
		content: '',
		placeholder: 'Start writing...'
	}}
></Story>
