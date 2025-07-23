<script lang="ts">
	interface IconButtonProps {
		icon: any; // Lucide icon component
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

	// Size classes
	const sizeClasses = {
		sm: 'p-1.5',
		md: 'p-2',
		lg: 'p-3'
	};

	// Icon sizes
	const iconSizes = {
		sm: 14,
		md: 16,
		lg: 20
	};

	// Variant classes
	const variantClasses = {
		ghost: 'text-slate-500 hover:text-slate-700 hover:bg-slate-100',
		primary: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50',
		success: 'text-green-600 hover:text-green-700 hover:bg-green-50',
		danger: 'text-red-600 hover:text-red-700 hover:bg-red-50'
	};

	// Active state classes
	const activeClasses = {
		ghost: 'bg-blue-600 text-white hover:bg-blue-700',
		primary: 'bg-blue-600 text-white hover:bg-blue-700',
		success: 'bg-green-600 text-white hover:bg-green-700',
		danger: 'bg-red-600 text-white hover:bg-red-700'
	};

	const buttonClasses = $derived(() => {
		const base =
			'inline-flex items-center justify-center rounded-md border-0 transition-all duration-150 font-medium';
		const sizeClass = sizeClasses[size];

		let stateClass: string;
		if (disabled) {
			stateClass = 'opacity-40 cursor-not-allowed text-slate-400';
		} else if (active) {
			stateClass = activeClasses[variant];
		} else {
			stateClass = variantClasses[variant];
		}

		return `${base} ${sizeClass} ${stateClass}`;
	});
</script>

<button
	class={buttonClasses}
	{disabled}
	{title}
	onclick={disabled ? undefined : onclick}
	{...restProps}
>
	<Icon size={iconSizes[size]} />
</button>
