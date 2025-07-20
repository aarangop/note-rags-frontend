<script lang="ts">
	interface SegmentOption {
		value: string;
		label: string;
		icon?: any;
	}
	interface SegmentedControlProps {
		options: SegmentOption[];
		value: string;
		showIcons?: boolean;
		iconPosition?: 'left' | 'right' | 'only';
		onchange?: (value: string) => void;
	}

	let {
		options,
		value,
		showIcons = true,
		iconPosition = 'left',
		onchange = () => {}
	}: SegmentedControlProps = $props();

	let currentValue = $state(value);

	function handleToggle(selectedValue: string) {
		if (currentValue !== selectedValue) {
			currentValue = selectedValue;
			onchange(selectedValue);
		}
	}
</script>

<div class="segmented-control">
	{#each options as option}
		<button
			class="segment {currentValue === option.value ? 'active' : ''}"
			onclick={() => handleToggle(option.value)}
		>
			{#if iconPosition === 'only' && option.icon}
				{@const Icon = option.icon}
				<Icon class="h-4 w-4"></Icon>
			{:else}
				{#if showIcons && option.icon && iconPosition === 'left'}
					{@const Icon = option.icon}
					<Icon class="icon"></Icon>
				{/if}
				<span>
					{option.label}
				</span>
				{#if showIcons && option.icon && iconPosition === 'right'}
					{@const Icon = option.icon}
					<Icon class="icon"></Icon>
				{/if}
			{/if}
		</button>
	{/each}
</div>

<style>
	@reference "tailwindcss";

	.icon {
		@apply h-2 w-2;
	}

	.segmented-control {
		@apply inline-flex h-10 rounded-lg bg-gray-100 p-1;
	}

	.segment {
		@apply rounded-md px-3 py-1 text-sm font-medium transition-all duration-150;
		@apply text-gray-600 hover:text-gray-900;
		@apply flex items-center justify-center gap-1;
	}

	.segment:not(.active) {
		@apply cursor-pointer;
	}

	.segment.active {
		@apply bg-white text-gray-900 shadow-sm hover:cursor-auto;
	}
</style>
