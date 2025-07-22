<script lang="ts">
	import type { ApiStatus } from '$lib/types/status';

	interface StatusIndicatorProps {
		status: ApiStatus;
	}

	let { status }: StatusIndicatorProps = $props();

	const statusColor = $derived(status.isHealthy ? 'green' : 'red');
	const statusText = $derived(status.isHealthy ? 'Healthy' : 'Unhealthy');
	const lastCheckedText = $derived(status.lastChecked.toLocaleTimeString());
</script>

<div class="status-card">
	<div class="status-header">
		<h3 class="api-name">{status.name}</h3>
		<div
			class="status-indicator"
			class:healthy={status.isHealthy}
			class:unhealthy={!status.isHealthy}
		>
			<span class="status-dot"></span>
			<span class="status-text">{statusText}</span>
		</div>
	</div>

	<div class="status-details">
		<div class="detail-item">
			<span class="detail-label">Last checked:</span>
			<span class="detail-value">{lastCheckedText}</span>
		</div>

		{#if status.responseTime}
			<div class="detail-item">
				<span class="detail-label">Response time:</span>
				<span class="detail-value">{status.responseTime}ms</span>
			</div>
		{/if}

		{#if status.error}
			<div class="detail-item error">
				<span class="detail-label">Error:</span>
				<span class="detail-value">{status.error}</span>
			</div>
		{/if}
	</div>
</div>

<style>
	.status-card {
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		padding: 1rem;
		background: white;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	}

	.status-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.api-name {
		margin: 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: #1f2937;
	}

	.status-indicator {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.status-indicator.healthy {
		background-color: #dcfce7;
		color: #166534;
	}

	.status-indicator.unhealthy {
		background-color: #fef2f2;
		color: #dc2626;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.healthy .status-dot {
		background-color: #22c55e;
	}

	.unhealthy .status-dot {
		background-color: #ef4444;
	}

	.status-details {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.detail-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.875rem;
	}

	.detail-label {
		color: #6b7280;
	}

	.detail-value {
		color: #1f2937;
		font-weight: 500;
	}

	.detail-item.error .detail-value {
		color: #dc2626;
		font-family: monospace;
		font-size: 0.75rem;
	}
</style>
