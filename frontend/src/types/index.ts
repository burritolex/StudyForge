export interface HealthStatus {
  status: string;
  service: string;
  timestamp?: string;
  configuredAiServiceUrl?: string;
}

export interface AiServiceHealth {
  status: string;
  service: string;
  version: string;
  configured_llm_model: string;
  configured_embedding_model: string;
  embedding_dimension: number;
  gemini_api_key_configured: boolean;
}
