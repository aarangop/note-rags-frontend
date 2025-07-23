<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import StatusIndicator from './StatusIndicator.svelte';

	const { Story } = defineMeta({
		title: 'Components/UI/StatusIndicator',
		component: StatusIndicator,
		tags: ['autodocs']
	});
</script>

<Story name="Healthy API">
	<StatusIndicator
		status={{
			name: 'Notes API',
			isHealthy: true,
			lastChecked: new Date(),
			responseTime: 150
		}}
	/>
</Story>

<Story name="Unhealthy API">
	<StatusIndicator
		status={{
			name: 'Notes API',
			isHealthy: false,
			lastChecked: new Date(),
			responseTime: 5000,
			error: 'Connection timeout'
		}}
	/>
</Story>

<Story name="API with Error">
	<StatusIndicator
		status={{
			name: 'Notes API',
			isHealthy: false,
			lastChecked: new Date(),
			error: 'HTTP 500: Internal Server Error'
		}}
	/>
</Story>

<Story name="Fast Response">
	<StatusIndicator
		status={{
			name: 'Notes API',
			isHealthy: true,
			lastChecked: new Date(),
			responseTime: 25
		}}
	/>
</Story>
