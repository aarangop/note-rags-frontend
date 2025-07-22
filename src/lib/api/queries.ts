import { apiConfig } from '../config/api';
import { genAIClient } from './genai/client';

export interface QueryRequest {
	question: string;
}

export interface QueryResponse {
	question: string;
	response: string;
	context: string[];
	tokens: number;
}

export interface StreamChunk {
	type: 'context' | 'answer' | 'complete' | 'error';
	step?: string;
	context?: string[];
	content?: string;
	data?: any;
}

/**
 * Submit a query to the API (non-streaming)
 */
export async function submitQuery(query: string): Promise<QueryResponse> {
	const { data, error } = await genAIClient.POST('/queries/', {
		body: {
			question: query
		}
	});

	if (error) {
		throw new Error(`API Error: ${JSON.stringify(error)}`);
	}

	return data as QueryResponse;
}

/**
 * Submit a query with streaming response using Server-Sent Events
 */
export async function submitQueryStream(
	query: string,
	onChunk: (chunk: StreamChunk) => void,
	onComplete?: (finalResponse: QueryResponse) => void,
	onError?: (error: string) => void
): Promise<void> {
	try {
		const response = await fetch(`${apiConfig.genAIAPIUrl}/queries/streams`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'text/event-stream'
			},
			body: JSON.stringify({ question: query })
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const reader = response.body?.getReader();
		if (!reader) {
			throw new Error('Failed to get response reader');
		}

		const decoder = new TextDecoder();
		let buffer = '';

		try {
			while (true) {
				const { done, value } = await reader.read();

				if (done) break;

				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split('\n');
				buffer = lines.pop() || ''; // Keep incomplete line in buffer

				for (const line of lines) {
					if (line.trim() === '') continue;

					if (line.startsWith('data: ')) {
						const data = line.slice(6); // Remove 'data: ' prefix

						if (data === '[DONE]') {
							return;
						}

						try {
							const parsed = JSON.parse(data);
							onChunk(parsed);

							// If this is the final complete response
							if (parsed.type === 'complete') {
								onComplete?.(parsed.data);
							}
						} catch (parseError) {
							console.warn('Failed to parse SSE data:', data);
						}
					}
				}
			}
		} finally {
			reader.releaseLock();
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		onError?.(errorMessage);
		throw error;
	}
}

/**
 * Get health status of the API
 */
export async function getHealth(): Promise<{ status: string }> {
	const { data, error } = await genAIClient.GET('/health');

	if (error) {
		throw new Error(`API Error: ${JSON.stringify(error)}`);
	}

	if (typeof data === 'string') {
		return { status: data };
	}

	return data as { status: string };
}

/**
 * Test API connectivity
 */
export async function testConnection(): Promise<boolean> {
	try {
		await getHealth();
		return true;
	} catch {
		return false;
	}
}

// Add more API functions as needed based on your OpenAPI spec
