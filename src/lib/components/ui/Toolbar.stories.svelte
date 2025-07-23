<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		AlignCenter,
		AlignLeft,
		AlignRight,
		Bold,
		Italic,
		Redo,
		Underline,
		Undo
	} from 'lucide-svelte';
	import ButtonGroup from './ButtonGroup.svelte';
	import IconButton from './IconButton.svelte';
	import Toolbar from './Toolbar.svelte';
	import ToolbarSeparator from './ToolbarSeparator.svelte';

	const { Story } = defineMeta({
		title: 'Components/UI/Toolbar',
		component: Toolbar,
		tags: ['autodocs']
	});
</script>

<Story name="Default (Top)">
	<Toolbar>
		<IconButton icon={Bold} variant="ghost" title="Bold" />
		<IconButton icon={Italic} variant="ghost" title="Italic" />
		<IconButton icon={Underline} variant="ghost" title="Underline" />
	</Toolbar>
</Story>

<Story name="Bottom Position">
	<Toolbar position="bottom">
		<IconButton icon={Bold} variant="ghost" title="Bold" />
		<IconButton icon={Italic} variant="ghost" title="Italic" />
		<IconButton icon={Underline} variant="ghost" title="Underline" />
	</Toolbar>
</Story>

<Story name="With Separators">
	<Toolbar>
		<IconButton icon={Undo} variant="ghost" title="Undo" />
		<IconButton icon={Redo} variant="ghost" title="Redo" />
		<ToolbarSeparator />
		<IconButton icon={Bold} variant="ghost" title="Bold" />
		<IconButton icon={Italic} variant="ghost" title="Italic" />
		<IconButton icon={Underline} variant="ghost" title="Underline" />
		<ToolbarSeparator />
		<IconButton icon={AlignLeft} variant="ghost" title="Align Left" />
		<IconButton icon={AlignCenter} variant="ghost" title="Align Center" />
		<IconButton icon={AlignRight} variant="ghost" title="Align Right" />
	</Toolbar>
</Story>

<Story name="With Button Groups">
	<Toolbar>
		<ButtonGroup>
			<IconButton icon={Bold} variant="ghost" active={true} title="Bold" />
			<IconButton icon={Italic} variant="ghost" title="Italic" />
			<IconButton icon={Underline} variant="ghost" title="Underline" />
		</ButtonGroup>
		<ToolbarSeparator />
		<ButtonGroup>
			<IconButton icon={AlignLeft} variant="ghost" title="Align Left" />
			<IconButton icon={AlignCenter} variant="ghost" active={true} title="Align Center" />
			<IconButton icon={AlignRight} variant="ghost" title="Align Right" />
		</ButtonGroup>
	</Toolbar>
</Story>

<Story name="Complex Editor Toolbar">
	<div class="w-full max-w-4xl">
		<Toolbar>
			<IconButton icon={Undo} variant="ghost" title="Undo" />
			<IconButton icon={Redo} variant="ghost" title="Redo" />
			<ToolbarSeparator />
			<ButtonGroup>
				<IconButton icon={Bold} variant="ghost" active={true} title="Bold" />
				<IconButton icon={Italic} variant="ghost" title="Italic" />
				<IconButton icon={Underline} variant="ghost" title="Underline" />
			</ButtonGroup>
			<ToolbarSeparator />
			<ButtonGroup>
				<IconButton icon={AlignLeft} variant="ghost" title="Align Left" />
				<IconButton icon={AlignCenter} variant="ghost" active={true} title="Align Center" />
				<IconButton icon={AlignRight} variant="ghost" title="Align Right" />
			</ButtonGroup>
		</Toolbar>
	</div>
</Story>
