<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		target?: string;
		rel?: string;
		children: Snippet;
		[key: string]: any;
	}

	let {
		href,
		target = '_self',
		rel = '',
		variant = 'primary',
		children,
		class: className = '',
		...restProps
	}: Props = $props();
</script>

<a class="btn preset-filled {className}" {href} {target} {rel} {...restProps}>
	{@render children?.()}
</a>
