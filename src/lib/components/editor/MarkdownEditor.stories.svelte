<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MarkdownEditor from './MarkdownEditor.svelte';
	const { Story } = defineMeta({
		title: 'Components/Editor/MarkdownEditor',
		component: MarkdownEditor,
		tags: ['autodocs']
	});
	let loremIpsum =
		'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.';
</script>

<Story name="Default" args={{ content: 'This is some text' }}></Story>
<Story name="Longer text" args={{ content: loremIpsum }}></Story>
<Story name="Preview Mode" args={{ content: '# Header 1\nSome content', mode: 'preview' }}></Story>
