<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Link from './Link.svelte';

	const { Story } = defineMeta({
		title: 'Components/UI/Link',
		component: Link,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ href: 'https://example.com' }}>Default Link</Story>

<Story
	name="External Link"
	args={{
		href: 'https://svelte.dev',
		target: '_blank'
	}}
>
	Visit Svelte
</Story>
