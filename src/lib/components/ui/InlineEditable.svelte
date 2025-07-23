<script lang="ts">
	import { Check, PenLine, X } from 'lucide-svelte';
	import IconButton from './IconButton.svelte';

	interface InlineEditableProps {
		value?: string;
		placeholder?: string;
		editable?: boolean;
		maxlength?: number;
		textClass?: string;
		onchange?: (newValue: string) => void;
	}

	let {
		value = $bindable(''),
		placeholder = 'Enter text...',
		editable = true,
		maxlength = 200,
		textClass = 'text-2xl font-semibold text-gray-900',
		onchange = () => {}
	}: InlineEditableProps = $props();

	let isEditing = $state(false);
	let editingValue = $state(value);
	let inputElement = $state<HTMLInputElement>();

	// Update editing value when prop changes
	$effect(() => {
		editingValue = value;
	});

	function startEditing() {
		if (!editable) return;
		isEditing = true;
		editingValue = value;
		setTimeout(() => {
			inputElement?.focus();
			inputElement?.select();
		}, 0);
	}

	function saveValue() {
		const newValue = editingValue.trim();
		if (newValue && newValue !== value) {
			value = newValue;
			onchange(newValue);
		} else if (!newValue) {
			editingValue = value;
		}
		isEditing = false;
	}

	function cancelEditing() {
		editingValue = value;
		isEditing = false;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			saveValue();
		} else if (event.key === 'Escape') {
			event.preventDefault();
			cancelEditing();
		}
	}

	function handleTextKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			startEditing();
		}
	}
</script>

{#if isEditing}
	<!-- Editing Mode -->
	<div class="flex w-full items-center gap-2">
		<input
			bind:this={inputElement}
			bind:value={editingValue}
			onkeydown={handleKeyDown}
			onblur={saveValue}
			class="flex-1 rounded-md border-2 border-blue-500 bg-white px-3 py-2 text-2xl font-semibold text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
			{placeholder}
			{maxlength}
		/>
		<div class="flex gap-1">
			<IconButton
				icon={Check}
				variant="success"
				size="sm"
				onclick={saveValue}
				title="Save (Enter)"
			/>
			<IconButton
				icon={X}
				variant="danger"
				size="sm"
				onclick={cancelEditing}
				title="Cancel (Escape)"
			/>
		</div>
	</div>
{:else}
	<!-- Display Mode -->
	<div class="group flex items-center gap-3">
		<h1
			class="{textClass} max-w-full overflow-hidden text-ellipsis whitespace-nowrap {editable
				? 'cursor-pointer rounded px-2 py-1 hover:bg-gray-100 focus:bg-gray-100 focus:outline-2 focus:outline-blue-500'
				: ''}"
			onclick={startEditing}
			onkeydown={handleTextKeyDown}
			role={editable ? 'button' : undefined}
			tabindex={editable ? 0 : undefined}
		>
			{value}
		</h1>
		{#if editable}
			<div class="opacity-0 transition-opacity duration-150 group-hover:opacity-100">
				<IconButton
					icon={PenLine}
					variant="ghost"
					size="sm"
					onclick={startEditing}
					title="Edit text"
				/>
			</div>
		{/if}
	</div>
{/if}
