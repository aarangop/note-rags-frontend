import apiConfig from '$lib/config/api';
import createClient from 'openapi-fetch';
import type { paths } from './types';

export const notesClient = createClient<paths>({
	baseUrl: apiConfig.notesAPIUrl
});

export default notesClient;
