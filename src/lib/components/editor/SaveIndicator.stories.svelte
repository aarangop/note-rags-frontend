<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SaveIndicator from './SaveIndicator.svelte';

	const { Story } = defineMeta({
		title: 'Components/Editor/SaveIndicator',
		component: SaveIndicator,
		tags: ['autodocs']
	});
</script>

<Story
	name="Saved"
	args={{
		status: 'saved'
	}}
></Story>

<Story
	name="Unsaved (Clickable)"
	args={{
		status: 'unsaved',
		onclick: () => alert('Saving...')
	}}
></Story>

<Story
	name="Saving"
	args={{
		status: 'saving'
	}}
></Story>

<Story
	name="Disconnected"
	args={{
		status: 'disconnected'
	}}
></Story>

<Story name="All States">
	<div class="flex items-center gap-6">
		<div class="flex flex-col items-center gap-2">
			<SaveIndicator status="saved" />
			<span class="text-xs text-gray-600">Saved</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<SaveIndicator status="unsaved" onclick={() => alert('Saving...')} />
			<span class="text-xs text-gray-600">Unsaved</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<SaveIndicator status="saving" />
			<span class="text-xs text-gray-600">Saving</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<SaveIndicator status="disconnected" />
			<span class="text-xs text-gray-600">Disconnected</span>
		</div>
	</div>
</Story>

<Story name="In Context">
	<div class="flex items-center justify-between rounded-lg border bg-gray-50 p-4">
		<h3 class="text-lg font-semibold">My Document</h3>
		<SaveIndicator status="unsaved" onclick={() => alert('Saving document...')} />
	</div>
</Story>
