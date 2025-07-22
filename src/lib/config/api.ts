import { env as publicEnv } from '$env/dynamic/public';

interface ApiConfig {
	genAIAPIUrl: string;
	notesAPIUrl: string;
}

export const apiConfig: ApiConfig = {
	genAIAPIUrl: publicEnv.PUBLIC_GENAI_API_BASE_URL || 'http://localhost:8000',
	notesAPIUrl: publicEnv.PUBLIC_NOTES_API_BASE_URL || 'http://localhost:8001'
};

export default apiConfig;
