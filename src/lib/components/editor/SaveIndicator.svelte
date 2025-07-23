<script lang="ts">
	interface SaveIndicatorProps {
		status: 'disconnected' | 'unsaved' | 'saved' | 'saving';
		onclick?: () => void;
	}

	let { status = 'saved', onclick = () => {} }: SaveIndicatorProps = $props();

	// Get status properties
	const statusConfig = $derived(
		{
			disconnected: {
				color: '#ef4444', // red
				title: 'No connection to server',
				clickable: false,
				pulse: false
			},
			unsaved: {
				color: '#f59e0b', // yellow/amber
				title: 'Unsaved changes - click to save',
				clickable: true,
				pulse: false
			},
			saved: {
				color: '#10b981', // green
				title: 'All changes saved',
				clickable: false,
				pulse: false
			},
			saving: {
				color: '#8b5cf6', // purple
				title: 'Saving...',
				clickable: false,
				pulse: true
			}
		}[status]
	);
</script>

<button
	class="save-indicator"
	class:clickable={statusConfig.clickable}
	class:pulse={statusConfig.pulse}
	style="--indicator-color: {statusConfig.color}"
	onclick={statusConfig.clickable ? onclick : undefined}
	title={statusConfig.title}
	disabled={!statusConfig.clickable}
>
	<div class="status-dot"></div>
</button>

<style>
	.save-indicator {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		border: none;
		border-radius: 6px;
		background: transparent;
		cursor: default;
		transition: all 0.15s ease;
	}

	.save-indicator.clickable {
		cursor: pointer;
	}

	.save-indicator.clickable:hover {
		background: rgba(0, 0, 0, 0.05);
	}

	.status-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: var(--indicator-color);
		transition: all 0.15s ease;
	}

	.save-indicator.pulse .status-dot {
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.8;
		}
	}

	.save-indicator:disabled {
		cursor: default;
	}
</style>
