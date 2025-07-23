<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Download, Heart, Home, Plus, Search, Settings } from 'lucide-svelte';
	import IconButton from './IconButton.svelte';

	const { Story } = defineMeta({
		title: 'Components/UI/IconButton',
		component: IconButton,
		tags: ['autodocs']
	});
</script>

<Story
	name="Default"
	args={{
		icon: Search,
		title: 'Search'
	}}
></Story>

<Story name="All Sizes">
	<div class="flex items-center gap-4">
		<IconButton icon={Search} size="sm" title="Small" />
		<IconButton icon={Search} size="md" title="Medium" />
		<IconButton icon={Search} size="lg" title="Large" />
	</div>
</Story>

<Story name="All Variants">
	<div class="flex items-center gap-4">
		<IconButton icon={Home} variant="ghost" title="Ghost" />
		<IconButton icon={Plus} variant="primary" title="Primary" />
		<IconButton icon={Heart} variant="success" title="Success" />
		<IconButton icon={Settings} variant="danger" title="Danger" />
	</div>
</Story>

<Story name="Active States">
	<div class="flex items-center gap-4">
		<IconButton icon={Home} variant="ghost" active={true} title="Active Ghost" />
		<IconButton icon={Plus} variant="primary" active={true} title="Active Primary" />
		<IconButton icon={Heart} variant="success" active={true} title="Active Success" />
		<IconButton icon={Settings} variant="danger" active={true} title="Active Danger" />
	</div>
</Story>

<Story name="Disabled">
	<div class="flex items-center gap-4">
		<IconButton icon={Download} disabled={true} title="Disabled" />
		<IconButton icon={Plus} variant="primary" disabled={true} title="Disabled Primary" />
		<IconButton icon={Heart} variant="success" disabled={true} title="Disabled Success" />
	</div>
</Story>

<Story
	name="Interactive"
	args={{
		icon: Settings,
		variant: 'primary',
		title: 'Click me!',
		onclick: () => alert('IconButton clicked!')
	}}
></Story>
