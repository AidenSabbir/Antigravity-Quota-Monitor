export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: string; // ISO date string
}

export interface RateLimitData {
  requests?: RateLimitInfo;
  tokens?: RateLimitInfo;
  priority?: {
    input: RateLimitInfo;
    output: RateLimitInfo;
  };
  models?: Record<string, RateLimitInfo>;
}

export interface AccountStatus {
  data?: RateLimitData;
  isLoading: boolean;
  error?: string;
  lastUpdated?: number;
}
