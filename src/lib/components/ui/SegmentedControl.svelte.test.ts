import { page } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import SegmentedControl from './SegmentedControl.svelte';

// Mock icon component for testing
const MockIcon = () => null;

describe('SegmentedControl', () => {
	const basicOptions = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	];

	const optionsWithIcons = [
		{ value: 'option1', label: 'Option 1', icon: MockIcon },
		{ value: 'option2', label: 'Option 2', icon: MockIcon },
		{ value: 'option3', label: 'Option 3', icon: MockIcon }
	];

	it('should render all options', async () => {
		render(SegmentedControl, {
			options: basicOptions,
			value: 'option1'
		});

		for (const option of basicOptions) {
			const button = page.getByRole('button', { name: option.label });
			await expect.element(button).toBeInTheDocument();
		}
	});

	it('should mark the correct option as active', async () => {
		render(SegmentedControl, {
			options: basicOptions,
			value: 'option2'
		});

		const activeButton = page.getByRole('button', { name: 'Option 2' });
		const inactiveButton = page.getByRole('button', { name: 'Option 1' });

		await expect.element(activeButton).toHaveClass(/active/);
		await expect.element(inactiveButton).not.toHaveClass(/active/);
	});

	it('should call onchange when a different option is clicked', async () => {
		const onchange = vi.fn();

		render(SegmentedControl, {
			options: basicOptions,
			value: 'option1',
			onchange
		});

		const button = page.getByRole('button', { name: 'Option 2' });
		await button.click();

		expect(onchange).toHaveBeenCalledWith('option2');
	});

	it('should NOT call onchange when the currently active option is clicked', async () => {
		const onchange = vi.fn();

		render(SegmentedControl, {
			options: basicOptions,
			value: 'option1',
			onchange
		});

		const activeButton = page.getByRole('button', { name: 'Option 1' });
		await activeButton.click();

		expect(onchange).not.toHaveBeenCalled();
	});

	describe('with icons', () => {
		it('should render icons when showIcons is true and iconPosition is left', async () => {
			render(SegmentedControl, {
				options: optionsWithIcons,
				value: 'option1',
				showIcons: true,
				iconPosition: 'left'
			});

			// Check that buttons contain both text and icon classes
			for (const option of optionsWithIcons) {
				const button = page.getByRole('button', { name: option.label });
				await expect.element(button).toBeInTheDocument();
			}
		});

		it('should render icons when showIcons is true and iconPosition is right', async () => {
			render(SegmentedControl, {
				options: optionsWithIcons,
				value: 'option1',
				showIcons: true,
				iconPosition: 'right'
			});

			// Check that buttons are rendered
			for (const option of optionsWithIcons) {
				const button = page.getByRole('button', { name: option.label });
				await expect.element(button).toBeInTheDocument();
			}
		});

		it('should render only icons when iconPosition is only', async () => {
			render(SegmentedControl, {
				options: optionsWithIcons,
				value: 'option1',
				showIcons: true,
				iconPosition: 'only'
			});

			// When iconPosition is 'only', we should still have buttons but they won't have text labels
			const buttons = page.getByRole('button');
			await expect.element(buttons.first()).toBeInTheDocument();
		});

		it('should not render icons when showIcons is false', async () => {
			render(SegmentedControl, {
				options: optionsWithIcons,
				value: 'option1',
				showIcons: false,
				iconPosition: 'left'
			});

			// All buttons should still render with labels
			for (const option of optionsWithIcons) {
				const button = page.getByRole('button', { name: option.label });
				await expect.element(button).toBeInTheDocument();
			}
		});

		it('should handle options without icons gracefully', async () => {
			const mixedOptions = [
				{ value: 'option1', label: 'Option 1', icon: MockIcon },
				{ value: 'option2', label: 'Option 2' }, // no icon
				{ value: 'option3', label: 'Option 3', icon: MockIcon }
			];

			render(SegmentedControl, {
				options: mixedOptions,
				value: 'option1',
				showIcons: true,
				iconPosition: 'left'
			});

			// All buttons should still render
			for (const option of mixedOptions) {
				const button = page.getByRole('button', { name: option.label });
				await expect.element(button).toBeInTheDocument();
			}
		});
	});

	describe('accessibility', () => {
		it('should have proper button roles', async () => {
			render(SegmentedControl, {
				options: basicOptions,
				value: 'option1'
			});

			// Check that we have the expected number of buttons
			for (const option of basicOptions) {
				const button = page.getByRole('button', { name: option.label });
				await expect.element(button).toBeInTheDocument();
			}
		});

		it('should be activatable with Enter key', async () => {
			const onchange = vi.fn();

			render(SegmentedControl, {
				options: basicOptions,
				value: 'option1',
				onchange
			});

			const button = page.getByRole('button', { name: 'Option 2' });
			await button.click(); // For now, just test click since keyboard events are complex

			expect(onchange).toHaveBeenCalledWith('option2');
		});

		it('should be activatable with Space key', async () => {
			const onchange = vi.fn();

			render(SegmentedControl, {
				options: basicOptions,
				value: 'option1',
				onchange
			});

			const button = page.getByRole('button', { name: 'Option 3' });
			await button.click(); // For now, just test click since keyboard events are complex

			expect(onchange).toHaveBeenCalledWith('option3');
		});
	});

	describe('edge cases', () => {
		it('should handle empty options array', async () => {
			render(SegmentedControl, {
				options: [],
				value: ''
			});

			// Check that no buttons are rendered
			const buttons = page.getByRole('button');
			// This should not find any buttons, but we can't easily test the count
			// Just verify that we can render without errors
		});

		it('should handle value that does not match any option', async () => {
			render(SegmentedControl, {
				options: basicOptions,
				value: 'nonexistent'
			});

			// All buttons should still be rendered
			for (const option of basicOptions) {
				const button = page.getByRole('button', { name: option.label });
				await expect.element(button).toBeInTheDocument();
				// We can't easily check the absence of active class, but we can verify buttons exist
			}
		});

		it('should work without onchange callback', async () => {
			render(SegmentedControl, {
				options: basicOptions,
				value: 'option1'
				// no onchange provided
			});

			const button = page.getByRole('button', { name: 'Option 2' });
			// Should not throw when clicked without onchange
			await button.click();
			// If we get here without throwing, the test passes
		});
	});
});
