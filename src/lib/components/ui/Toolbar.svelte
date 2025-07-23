<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ToolbarProps {
		children: Snippet;
		position?: 'top' | 'bottom';
	}

	let { children, position = 'top' }: ToolbarProps = $props();

	const positionClasses = {
		top: 'rounded-t-lg border-b',
		bottom: 'rounded-b-lg border-t'
	};
</script>

<div
	class="flex flex-wrap items-center gap-2 border-slate-200 bg-slate-50 px-4 py-3 {positionClasses[
		position
	]}"
>
	{@render children()}
</div>
