<script lang="ts">
	interface StatusDotProps {
		status: 'disconnected' | 'unsaved' | 'saved' | 'saving';
		clickable?: boolean;
		onclick?: () => void;
		title?: string;
	}

	let { status = 'saved', clickable = false, onclick = () => {}, title }: StatusDotProps = $props();

	const statusConfig = {
		disconnected: { color: 'bg-red-500', pulse: false },
		unsaved: { color: 'bg-amber-500', pulse: false },
		saved: { color: 'bg-green-500', pulse: false },
		saving: { color: 'bg-purple-500', pulse: true }
	};

	const config = statusConfig[status];
	const baseClasses = 'w-3 h-3 rounded-full transition-all duration-150';
	const clickableClasses = clickable ? 'cursor-pointer hover:scale-110' : '';
	const pulseClasses = config.pulse ? 'animate-pulse' : '';
</script>

<button
	class="flex items-center justify-center rounded-md p-2 transition-colors duration-150 {clickable
		? 'hover:bg-black/5'
		: ''}"
	disabled={!clickable}
	onclick={clickable ? onclick : undefined}
	{title}
>
	<div class="{baseClasses} {config.color} {clickableClasses} {pulseClasses}"></div>
</button>
