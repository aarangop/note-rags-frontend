<script lang="ts">
	import {
		Bold,
		Code,
		Heading1,
		Heading2,
		Heading3,
		Italic,
		List,
		ListOrdered,
		Quote,
		Redo,
		Strikethrough,
		Undo
	} from 'lucide-svelte';
	import ButtonGroup from '../ui/ButtonGroup.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import StatusDot from '../ui/StatusDot.svelte';
	import Toolbar from '../ui/Toolbar.svelte';
	import ToolbarSeparator from '../ui/ToolbarSeparator.svelte';

	interface EditorState {
		isBold: boolean;
		isItalic: boolean;
		isStrike: boolean;
		isCode: boolean;
		isH1: boolean;
		isH2: boolean;
		isH3: boolean;
		isBulletList: boolean;
		isOrderedList: boolean;
		isBlockquote: boolean;
		canUndo: boolean;
		canRedo: boolean;
	}

	interface EditorToolbarProps {
		editorState: EditorState;
		saveStatus: 'disconnected' | 'unsaved' | 'saved' | 'saving';
		onBold?: () => void;
		onItalic?: () => void;
		onStrike?: () => void;
		onCode?: () => void;
		onHeading?: (level: 1 | 2 | 3) => void;
		onBulletList?: () => void;
		onOrderedList?: () => void;
		onBlockquote?: () => void;
		onUndo?: () => void;
		onRedo?: () => void;
		onSave?: () => void;
	}

	let {
		editorState,
		saveStatus = 'saved',
		onBold = () => {},
		onItalic = () => {},
		onStrike = () => {},
		onCode = () => {},
		onHeading = () => {},
		onBulletList = () => {},
		onOrderedList = () => {},
		onBlockquote = () => {},
		onUndo = () => {},
		onRedo = () => {},
		onSave = () => {}
	}: EditorToolbarProps = $props();

	// Status dot configuration
	const statusTitles = {
		disconnected: 'No connection to server',
		unsaved: 'Unsaved changes - click to save',
		saved: 'All changes saved',
		saving: 'Saving...'
	};
</script>

<Toolbar>
	<!-- Formatting Controls -->
	<ButtonGroup>
		<IconButton icon={Bold} active={editorState.isBold} onclick={onBold} title="Bold (Ctrl+B)" />
		<IconButton
			icon={Italic}
			active={editorState.isItalic}
			onclick={onItalic}
			title="Italic (Ctrl+I)"
		/>
		<IconButton
			icon={Strikethrough}
			active={editorState.isStrike}
			onclick={onStrike}
			title="Strikethrough"
		/>
		<IconButton icon={Code} active={editorState.isCode} onclick={onCode} title="Inline Code" />
	</ButtonGroup>

	<ToolbarSeparator />

	<!-- Heading Controls -->
	<ButtonGroup>
		<IconButton
			icon={Heading1}
			active={editorState.isH1}
			onclick={() => onHeading(1)}
			title="Heading 1"
			disabled={false}
		/>
		<IconButton
			icon={Heading2}
			active={editorState.isH2}
			onclick={() => onHeading(2)}
			title="Heading 2"
		/>
		<IconButton
			icon={Heading3}
			active={editorState.isH3}
			onclick={() => onHeading(3)}
			title="Heading 3"
		/>
	</ButtonGroup>

	<ToolbarSeparator />

	<!-- List Controls -->
	<ButtonGroup>
		<IconButton
			icon={List}
			active={editorState.isBulletList}
			onclick={onBulletList}
			title="Bullet List"
		/>
		<IconButton
			icon={ListOrdered}
			active={editorState.isOrderedList}
			onclick={onOrderedList}
			title="Numbered List"
		/>
		<IconButton
			icon={Quote}
			active={editorState.isBlockquote}
			onclick={onBlockquote}
			title="Quote"
		/>
	</ButtonGroup>

	<ToolbarSeparator />

	<!-- History Controls -->
	<ButtonGroup>
		<IconButton
			icon={Undo}
			disabled={!editorState.canUndo}
			onclick={onUndo}
			title="Undo (Ctrl+Z)"
		/>
		<IconButton
			icon={Redo}
			disabled={!editorState.canRedo}
			onclick={onRedo}
			title="Redo (Ctrl+Y)"
		/>
	</ButtonGroup>

	<!-- Save Status - Push to right -->
	<div class="ml-auto">
		<StatusDot
			status={saveStatus}
			clickable={saveStatus === 'unsaved'}
			onclick={onSave}
			title={statusTitles[saveStatus]}
		/>
	</div>
</Toolbar>
