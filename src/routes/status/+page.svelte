<script lang="ts">
	import { genAIApiStatusCheck } from '$lib/api/genai/service';
	import { notesApiStatusCheck } from '$lib/api/notes/service';
	import StatusIndicator from '$lib/components/ui/StatusIndicator.svelte';
	import type { ApiStatus } from '$lib/types/status';
	import { onDestroy, onMount } from 'svelte';

	let apiStatuses: ApiStatus[] = $state([
		{
			name: 'Notes API',
			isHealthy: false,
			lastChecked: new Date(),
			responseTime: undefined,
			error: undefined
		},
		{
			name: 'Chat API',
			isHealthy: false,
			lastChecked: new Date(),
			responseTime: undefined,
			error: undefined
		}
	]);

	let refreshInterval: ReturnType<typeof setInterval> | undefined;
	let isChecking = $state(false);
	let autoRefresh = $state(true);
	const REFRESH_INTERVAL_MS = 30000; // 30 seconds

	async function checkAllApis() {
		if (isChecking) return;

		isChecking = true;

		// Check Notes API
		try {
			const result = await notesApiStatusCheck.checkHealth();
			apiStatuses[0] = {
				...apiStatuses[0],
				isHealthy: result.isHealthy,
				lastChecked: new Date(),
				responseTime: result.responseTime,
				error: result.error
			};
		} catch (err) {
			apiStatuses[0] = {
				...apiStatuses[0],
				isHealthy: false,
				lastChecked: new Date(),
				error: err instanceof Error ? err.message : 'Unknown error'
			};
		}

		// Check Chat API
		try {
			const result = await genAIApiStatusCheck.checkHealth();
			apiStatuses[1] = {
				...apiStatuses[1],
				isHealthy: result.isHealthy,
				lastChecked: new Date(),
				responseTime: result.responseTime,
				error: result.error
			};
		} catch (err) {
			apiStatuses[1] = {
				...apiStatuses[1],
				isHealthy: false,
				lastChecked: new Date(),
				error: err instanceof Error ? err.message : 'Unknown error'
			};
		}

		isChecking = false;
	}

	function startAutoRefresh() {
		if (refreshInterval) clearInterval(refreshInterval);
		refreshInterval = setInterval(checkAllApis, REFRESH_INTERVAL_MS);
	}

	function stopAutoRefresh() {
		if (refreshInterval) {
			clearInterval(refreshInterval);
			refreshInterval = undefined;
		}
	}

	function toggleAutoRefresh() {
		autoRefresh = !autoRefresh;
		if (autoRefresh) {
			startAutoRefresh();
		} else {
			stopAutoRefresh();
		}
	}

	onMount(() => {
		checkAllApis();
		if (autoRefresh) {
			startAutoRefresh();
		}
	});

	onDestroy(() => {
		stopAutoRefresh();
	});
</script>

<div class="flex w-full flex-col gap-6 p-8">
	<div class="flex flex-row items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">API Status Dashboard</h1>
		<div class="flex gap-3">
			<button class="btn btn-secondary" onclick={checkAllApis} disabled={isChecking}>
				{isChecking ? 'Checking...' : 'Refresh Now'}
			</button>
			<button
				class="btn {autoRefresh ? 'btn-primary' : 'btn-secondary'}"
				onclick={toggleAutoRefresh}
			>
				{autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
			</button>
		</div>
	</div>

	{#if autoRefresh}
		<div class="refresh-info">
			<span class="text-sm text-gray-600">
				Auto-refreshing every {REFRESH_INTERVAL_MS / 1000} seconds
			</span>
		</div>
	{/if}

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each apiStatuses as status}
			<StatusIndicator {status} />
		{/each}
	</div>
</div>

<style>
	.btn {
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		border: 1px solid transparent;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-primary {
		background-color: #3b82f6;
		color: white;
		border-color: #3b82f6;
	}

	.btn-primary:hover:not(:disabled) {
		background-color: #2563eb;
		border-color: #2563eb;
	}

	.btn-secondary {
		background-color: white;
		color: #374151;
		border-color: #d1d5db;
	}

	.btn-secondary:hover:not(:disabled) {
		background-color: #f9fafb;
		border-color: #9ca3af;
	}

	.refresh-info {
		padding: 0.75rem;
		background-color: #f0f9ff;
		border: 1px solid #bae6fd;
		border-radius: 0.375rem;
	}
</style>
