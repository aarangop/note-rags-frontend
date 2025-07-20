<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
	const { Story } = defineMeta({
		title: 'Components/UI/Button',
		component: Button,
		tags: ['autodocs']
	});
</script>

<Story name="Default">Default Button</Story>
