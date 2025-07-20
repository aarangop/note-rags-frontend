import { env as publicEnv } from '$env/dynamic/public';

interface ApiConfig {
	baseUrl: string;
	openApiUrl: string;
}

export const apiConfig: ApiConfig = {
	baseUrl: publicEnv.PUBLIC_API_BASE_URL || 'http://localhost:8000',
	openApiUrl: publicEnv.PUBLIC_API_OPENAPI_URL || 'http://localhost:8000/openapi.json'
};

export default apiConfig;
