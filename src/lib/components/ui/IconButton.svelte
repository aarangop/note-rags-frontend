<!-- src/lib/components/ui/IconButton.svelte -->
<script lang="ts">
	interface IconButtonProps {
		icon: any;
		size?: 'sm' | 'md' | 'lg';
		variant?: 'ghost' | 'primary' | 'success' | 'danger';
		active?: boolean;
		disabled?: boolean;
		title?: string;
		onclick?: () => void;
	}

	let {
		icon: Icon,
		size = 'md',
		variant = 'ghost',
		active = false,
		disabled = false,
		title,
		onclick = () => {},
		...restProps
	}: IconButtonProps = $props();

	// Log for debugging
	$effect(() => {
		console.log(`IconButton ${title}: active=${active}, variant=${variant}, disabled=${disabled}`);
	});
</script>

<button
	class="icon-button"
	class:size-sm={size === 'sm'}
	class:size-md={size === 'md'}
	class:size-lg={size === 'lg'}
	class:variant-ghost={variant === 'ghost'}
	class:variant-primary={variant === 'primary'}
	class:variant-success={variant === 'success'}
	class:variant-danger={variant === 'danger'}
	class:active
	class:disabled
	{disabled}
	{title}
	onclick={disabled ? undefined : onclick}
	{...restProps}
>
	<Icon size={size === 'sm' ? 14 : size === 'md' ? 16 : 20} />
</button>

<style>
	@reference "tailwindcss";

	.icon-button {
		@apply inline-flex cursor-pointer items-center justify-center rounded-md border-0 bg-transparent font-medium transition-all duration-150;
	}

	/* Sizes */
	.size-sm {
		@apply p-1.5;
	}

	.size-md {
		@apply p-2;
	}

	.size-lg {
		@apply p-3;
	}

	/* Variant - Ghost */
	.variant-ghost {
		@apply text-slate-500;
	}

	.variant-ghost:hover:not(.disabled) {
		@apply bg-slate-100 text-slate-700;
	}

	.variant-ghost.active {
		@apply bg-blue-600 text-white;
	}

	.variant-ghost.active:hover:not(.disabled) {
		@apply bg-blue-700;
	}

	/* Variant - Primary */
	.variant-primary {
		@apply text-blue-600;
	}

	.variant-primary:hover:not(.disabled) {
		@apply bg-blue-50 text-blue-700;
	}

	.variant-primary.active {
		@apply bg-blue-600 text-white;
	}

	.variant-primary.active:hover:not(.disabled) {
		@apply bg-blue-700;
	}

	/* Variant - Success */
	.variant-success {
		@apply text-green-600;
	}

	.variant-success:hover:not(.disabled) {
		@apply bg-green-50 text-green-700;
	}

	.variant-success.active {
		@apply bg-green-600 text-white;
	}

	.variant-success.active:hover:not(.disabled) {
		@apply bg-green-700;
	}

	/* Variant - Danger */
	.variant-danger {
		@apply text-red-600;
	}

	.variant-danger:hover:not(.disabled) {
		@apply bg-red-50 text-red-700;
	}

	.variant-danger.active {
		@apply bg-red-600 text-white;
	}

	.variant-danger.active:hover:not(.disabled) {
		@apply bg-red-700;
	}

	/* Disabled state */
	.disabled {
		@apply pointer-events-none cursor-not-allowed opacity-40;
	}
</style>
