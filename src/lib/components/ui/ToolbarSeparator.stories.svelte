<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Bold, Italic, Underline } from 'lucide-svelte';
	import IconButton from './IconButton.svelte';
	import ToolbarSeparator from './ToolbarSeparator.svelte';

	const { Story } = defineMeta({
		title: 'Components/UI/ToolbarSeparator',
		component: ToolbarSeparator,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<ToolbarSeparator />
</Story>

<Story name="In Context">
	<div class="flex items-center gap-2 rounded-lg bg-slate-50 p-4">
		<IconButton icon={Bold} variant="ghost" title="Bold" />
		<IconButton icon={Italic} variant="ghost" title="Italic" />
		<ToolbarSeparator />
		<IconButton icon={Underline} variant="ghost" title="Underline" />
	</div>
</Story>
