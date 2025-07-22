export interface ApiStatus {
	name: string;
	isHealthy: boolean;
	lastChecked: Date;
	responseTime?: number;
	error?: string;
}

export interface StatusCheck {
	checkHealth: () => Promise<{ isHealthy: boolean; responseTime?: number; error?: string }>;
}
