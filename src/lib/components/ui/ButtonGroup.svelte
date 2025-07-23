<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonGroupProps {
		children: Snippet;
		gap?: 'none' | 'sm' | 'md';
	}

	let { children, gap = 'sm' }: ButtonGroupProps = $props();

	const gapClasses = {
		none: 'gap-0',
		sm: 'gap-1',
		md: 'gap-2'
	};
</script>

<div class="flex items-center {gapClasses[gap]}">
	{@render children()}
</div>
