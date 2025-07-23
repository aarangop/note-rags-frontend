<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InlineEditable from './InlineEditable.svelte';
	const { Story } = defineMeta({
		title: 'Components/UI/InlineEditable',
		component: InlineEditable,
		tags: ['autodocs']
	});
</script>

<Story
	name="Default"
	args={{
		value: 'Click to edit this text',
		placeholder: 'Enter text...'
	}}
></Story>

<Story
	name="Custom Text Class"
	args={{
		value: 'Custom styled text',
		textClass: 'text-lg font-medium text-blue-600'
	}}
></Story>

<Story
	name="With Max Length"
	args={{
		value: 'Short text',
		maxlength: 20,
		placeholder: 'Max 20 characters'
	}}
></Story>

<Story
	name="Non-editable"
	args={{
		value: 'This text cannot be edited',
		editable: false
	}}
></Story>

<Story
	name="Empty Value"
	args={{
		value: '',
		placeholder: 'Start typing to add text...'
	}}
></Story>

<Story
	name="Long Text with Ellipsis"
	args={{
		value:
			'This is a very long text that should be truncated with ellipsis when it exceeds the container width to demonstrate the overflow behavior'
	}}
></Story>

<Story
	name="Interactive Example"
	args={{
		value: 'Edit me!',
		placeholder: 'Enter your text...',
		maxlength: 50,
		onchange: (newValue) => {
			console.log('Value changed to:', newValue);
			alert(`New value: "${newValue}"`);
		}
	}}
></Story>
