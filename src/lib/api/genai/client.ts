import createClient from 'openapi-fetch';
import { apiConfig } from '../../config/api';
import type { paths } from '../types';

// Create the API client with base configuration
export const genAIClient = createClient<paths>({
	baseUrl: apiConfig.genAIAPIUrl
});

// Optional: Add global request/response interceptors
genAIClient.use({
	onRequest({ request }) {
		// Add auth headers, logging, etc.
		console.log('API Request:', request.method, request.url);
		return request;
	},
	onResponse({ response }) {
		// Add response logging, error handling, etc.
		console.log('API Response:', response.status, response.url);
		return response;
	}
});

export default genAIClient;
