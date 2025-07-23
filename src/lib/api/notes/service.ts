import type { StatusCheck } from '$lib/types/status';
import notesClient from './client';
import type { components } from './types';

// Result types for better error handling
export type LoadNoteSuccess<T = unknown> = {
	success: true;
	data: T;
};

export type LoadNoteError = {
	success: false;
	error: {
		type: 'validation' | 'not_found' | 'server_error' | 'network_error' | 'unknown';
		message: string;
		details?: unknown;
	};
};

export type LoadNoteResult<T = unknown> = LoadNoteSuccess<T> | LoadNoteError;

export const notesApiStatusCheck: StatusCheck = {
	async checkHealth() {
		const startTime = Date.now();
		try {
			const { data, error } = await notesClient.GET('/health/');
			const responseTime = Date.now() - startTime;

			if (error) {
				return {
					isHealthy: false,
					responseTime,
					error: `API Error: ${JSON.stringify(error)}`
				};
			}

			return {
				isHealthy: true,
				responseTime
			};
		} catch (err) {
			const responseTime = Date.now() - startTime;
			return {
				isHealthy: false,
				responseTime,
				error: err instanceof Error ? err.message : 'Unknown error'
			};
		}
	}
};

export async function loadNote(id: number): Promise<LoadNoteResult> {
	try {
		const { data, error, response } = await notesClient.GET('/notes/{id}', {
			params: {
				path: { id }
			}
		});

		if (error) {
			// Handle different types of API errors
			if (response?.status === 404) {
				return {
					success: false,
					error: {
						type: 'not_found',
						message: `Note with ID ${id} not found`,
						details: error
					}
				};
			}

			if (response?.status === 422) {
				// Validation error - extract meaningful message
				const validationError = error as components['schemas']['HTTPValidationError'];
				const firstError = validationError.detail?.[0];
				const message = firstError
					? `Validation error: ${firstError.msg} (${firstError.type})`
					: 'Invalid request parameters';

				return {
					success: false,
					error: {
						type: 'validation',
						message,
						details: validationError.detail
					}
				};
			}

			if (response?.status && response.status >= 500) {
				return {
					success: false,
					error: {
						type: 'server_error',
						message: 'Server error occurred while loading the note',
						details: error
					}
				};
			}

			// Other API errors
			return {
				success: false,
				error: {
					type: 'unknown',
					message: 'An unexpected error occurred',
					details: error
				}
			};
		}

		// Success case
		return {
			success: true,
			data
		};
	} catch (err) {
		// Network or other runtime errors
		return {
			success: false,
			error: {
				type: 'network_error',
				message: err instanceof Error ? err.message : 'Network error occurred',
				details: err
			}
		};
	}
}
