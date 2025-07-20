<script lang="ts">
	interface ButtonProps {
		variant?: 'primary' | 'secondary' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		children: any;
	}

	let {
		variant = 'secondary',
		size = 'md',
		disabled = false,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

<button class="button button-{variant} button-{size}" {disabled} {...restProps}>
	{@render children()}
</button>

<style>
	@reference "tailwindcss";

	.button {
		@apply inline-flex items-center justify-center rounded-md font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none;
	}

	.button-sm {
		@apply px-3 py-1 text-sm;
	}

	.button-md {
		@apply px-4 py-2 text-sm;
	}

	.button-lg {
		@apply px-6 py-3 text-base;
	}

	.button-primary {
		@apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
	}

	.button-secondary {
		@apply bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500;
	}

	.button-ghost {
		@apply bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500;
	}

	.button:disabled {
		@apply cursor-not-allowed opacity-50;
	}
</style>
