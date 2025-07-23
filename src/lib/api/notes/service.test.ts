import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the client module before importing the service
vi.mock('./client', () => ({
	default: {
		GET: vi.fn()
	}
}));

// Now import the service after the mock is set up
import notesClient from './client';
import { loadNote } from './service';

// Mock data for testing
const mockNote = {
	id: 1,
	title: 'Test Note',
	content: 'This is a test note content',
	created_at: '2025-07-22T10:00:00Z',
	updated_at: '2025-07-22T10:00:00Z',
	document_type: 'note'
};

describe('loadNote', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should return success result with note data when API call is successful', async () => {
		// Arrange
		const noteId = 1;
		(notesClient.GET as any).mockResolvedValue({
			data: mockNote,
			error: null,
			response: { status: 200 }
		});

		// Act
		const result = await loadNote(noteId);

		// Assert
		expect(notesClient.GET).toHaveBeenCalledWith('/notes/{id}', {
			params: {
				path: { id: noteId }
			}
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toEqual(mockNote);
		}
	});

	it('should return not_found error when API returns 404', async () => {
		// Arrange
		const noteId = 1;
		(notesClient.GET as any).mockResolvedValue({
			data: null,
			error: { detail: 'Note not found' },
			response: { status: 404 }
		});

		// Act
		const result = await loadNote(noteId);

		// Assert
		expect(notesClient.GET).toHaveBeenCalledWith('/notes/{id}', {
			params: {
				path: { id: noteId }
			}
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.type).toBe('not_found');
			expect(result.error.message).toBe(`Note with ID ${noteId} not found`);
			expect(result.error.details).toEqual({ detail: 'Note not found' });
		}
	});

	it('should return validation error when API returns 422', async () => {
		// Arrange
		const noteId = 999;
		const validationError = {
			detail: [
				{
					type: 'int_parsing',
					loc: ['path', 'id'],
					msg: 'Input should be a valid integer',
					input: 'invalid'
				}
			]
		};
		(notesClient.GET as any).mockResolvedValue({
			data: null,
			error: validationError,
			response: { status: 422 }
		});

		// Act
		const result = await loadNote(noteId);

		// Assert
		expect(notesClient.GET).toHaveBeenCalledWith('/notes/{id}', {
			params: {
				path: { id: noteId }
			}
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.type).toBe('validation');
			expect(result.error.message).toBe(
				'Validation error: Input should be a valid integer (int_parsing)'
			);
			expect(result.error.details).toEqual(validationError.detail);
		}
	});

	it('should return server_error when API returns 500', async () => {
		// Arrange
		const noteId = 1;
		(notesClient.GET as any).mockResolvedValue({
			data: null,
			error: { detail: 'Internal server error' },
			response: { status: 500 }
		});

		// Act
		const result = await loadNote(noteId);

		// Assert
		expect(notesClient.GET).toHaveBeenCalledWith('/notes/{id}', {
			params: {
				path: { id: noteId }
			}
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.type).toBe('server_error');
			expect(result.error.message).toBe('Server error occurred while loading the note');
		}
	});

	it('should return network_error when network request throws an exception', async () => {
		// Arrange
		const noteId = 1;
		(notesClient.GET as any).mockRejectedValue(new Error('Network connection failed'));

		// Act
		const result = await loadNote(noteId);

		// Assert
		expect(notesClient.GET).toHaveBeenCalledWith('/notes/{id}', {
			params: {
				path: { id: noteId }
			}
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.type).toBe('network_error');
			expect(result.error.message).toBe('Network connection failed');
		}
	});

	it('should handle different note IDs correctly', async () => {
		// Arrange
		const noteId = 42;
		const customNote = { ...mockNote, id: noteId, title: 'Custom Note' };
		(notesClient.GET as any).mockResolvedValue({
			data: customNote,
			error: null,
			response: { status: 200 }
		});

		// Act
		const result = await loadNote(noteId);

		// Assert
		expect(notesClient.GET).toHaveBeenCalledWith('/notes/{id}', {
			params: {
				path: { id: noteId }
			}
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toEqual(customNote);
		}
	});

	it('should return unknown error for unexpected API errors', async () => {
		// Arrange
		const noteId = 1;
		(notesClient.GET as any).mockResolvedValue({
			data: null,
			error: { detail: 'Some unexpected error' },
			response: { status: 418 } // I'm a teapot
		});

		// Act
		const result = await loadNote(noteId);

		// Assert
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.type).toBe('unknown');
			expect(result.error.message).toBe('An unexpected error occurred');
		}
	});

	it('should handle validation errors without detail array', async () => {
		// Arrange
		const noteId = 1;
		(notesClient.GET as any).mockResolvedValue({
			data: null,
			error: { detail: [] }, // Empty detail array
			response: { status: 422 }
		});

		// Act
		const result = await loadNote(noteId);

		// Assert
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.type).toBe('validation');
			expect(result.error.message).toBe('Invalid request parameters');
		}
	});
});
