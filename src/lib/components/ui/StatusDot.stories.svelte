<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import StatusDot from './StatusDot.svelte';

	const { Story } = defineMeta({
		title: 'Components/UI/StatusDot',
		component: StatusDot,
		tags: ['autodocs']
	});
</script>

<Story
	name="Default (Saved)"
	args={{
		status: 'saved',
		title: 'Document saved'
	}}
></Story>

<Story name="All States">
	<div class="flex items-center gap-4">
		<div class="flex flex-col items-center gap-2">
			<StatusDot status="saved" title="Saved" />
			<span class="text-xs text-gray-600">Saved</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<StatusDot status="unsaved" title="Unsaved changes" />
			<span class="text-xs text-gray-600">Unsaved</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<StatusDot status="saving" title="Saving..." />
			<span class="text-xs text-gray-600">Saving</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<StatusDot status="disconnected" title="Connection lost" />
			<span class="text-xs text-gray-600">Disconnected</span>
		</div>
	</div>
</Story>

<Story name="Clickable">
	<div class="flex items-center gap-4">
		<StatusDot
			status="unsaved"
			clickable={true}
			title="Click to save"
			onclick={() => alert('Saving document...')}
		/>
		<StatusDot
			status="disconnected"
			clickable={true}
			title="Click to reconnect"
			onclick={() => alert('Reconnecting...')}
		/>
	</div>
</Story>

<Story name="In Use Example">
	<div class="flex items-center justify-between rounded-lg bg-gray-50 p-4">
		<span class="text-sm font-medium">Document Status</span>
		<StatusDot status="saving" title="Auto-saving..." />
	</div>
</Story>
