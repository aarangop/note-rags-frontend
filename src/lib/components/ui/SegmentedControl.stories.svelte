<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Code, FileText } from 'lucide-svelte';
	import SegmentedControl from './SegmentedControl.svelte';

	const { Story } = defineMeta({
		title: 'Components/UI/SegmentedControl',
		component: SegmentedControl,
		tags: ['autodocs']
	});
</script>

<Story
	name="Default"
	args={{
		options: [
			{ value: '1', label: 'Option 1' },
			{ value: '2', label: 'Option 2' },
			{ value: '3', label: 'Option 3' }
		],
		value: 'Option 1'
	}}
></Story>

<Story
	name="With Icons"
	args={{
		showIcons: true,
		options: [
			{
				value: 'source',
				label: 'Source Mode',
				icon: Code
			},
			{
				value: 'preview',
				label: 'Preview Mode',
				icon: FileText
			}
		],
		value: 'source'
	}}
></Story>

<Story
	name="Icons Only"
	args={{
		showIcons: true,
		iconPosition: 'only',
		options: [
			{
				value: 'source',
				label: 'Source Mode',
				icon: Code
			},
			{
				value: 'preview',
				label: 'Preview Mode',
				icon: FileText
			}
		],
		value: 'source'
	}}
></Story>
