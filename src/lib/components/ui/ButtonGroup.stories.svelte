<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from 'lucide-svelte';
	import Button from './Button.svelte';
	import ButtonGroup from './ButtonGroup.svelte';
	import IconButton from './IconButton.svelte';

	const { Story } = defineMeta({
		title: 'Components/UI/ButtonGroup',
		component: ButtonGroup,
		tags: ['autodocs']
	});
</script>

<Story name="Default with Buttons">
	<ButtonGroup>
		<Button variant="secondary">First</Button>
		<Button variant="secondary">Second</Button>
		<Button variant="secondary">Third</Button>
	</ButtonGroup>
</Story>

<Story name="With Icon Buttons">
	<ButtonGroup>
		<IconButton icon={Bold} variant="ghost" title="Bold" />
		<IconButton icon={Italic} variant="ghost" title="Italic" />
		<IconButton icon={Underline} variant="ghost" title="Underline" />
	</ButtonGroup>
</Story>

<Story name="Mixed Buttons">
	<ButtonGroup>
		<Button variant="secondary">Save</Button>
		<IconButton icon={Bold} variant="ghost" title="Bold" />
		<IconButton icon={Italic} variant="ghost" title="Italic" />
		<Button variant="secondary">Cancel</Button>
	</ButtonGroup>
</Story>

<Story name="No Gap">
	<ButtonGroup gap="none">
		<IconButton icon={AlignLeft} variant="ghost" title="Align Left" />
		<IconButton icon={AlignCenter} variant="ghost" title="Align Center" />
		<IconButton icon={AlignRight} variant="ghost" title="Align Right" />
	</ButtonGroup>
</Story>

<Story name="Medium Gap">
	<ButtonGroup gap="md">
		<Button variant="secondary">First</Button>
		<Button variant="secondary">Second</Button>
		<Button variant="secondary">Third</Button>
	</ButtonGroup>
</Story>

<Story name="Toolbar Example">
	<ButtonGroup gap="sm">
		<IconButton icon={Bold} variant="ghost" active={true} title="Bold" />
		<IconButton icon={Italic} variant="ghost" title="Italic" />
		<IconButton icon={Underline} variant="ghost" title="Underline" />
	</ButtonGroup>
</Story>
