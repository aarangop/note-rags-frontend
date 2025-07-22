import type { StatusCheck } from '$lib/types/status';
import genAIClient from './client';

export async function getGenAIAPIStatus() {
	const { data, error } = await genAIClient.GET('/health');
	if (error) {
		throw new Error(`API Error: ${JSON.stringify(error)}`);
	}
	return data;
}

export const genAIApiStatusCheck: StatusCheck = {
	async checkHealth() {
		const startTime = Date.now();
		try {
			const { data, error } = await genAIClient.GET('/health');
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
