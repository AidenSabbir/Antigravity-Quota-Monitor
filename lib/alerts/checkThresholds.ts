import { RateLimitData } from '@/lib/types/api';

export interface RateLimitWarning {
  type: string;
  current: number;
  limit: number;
  percentage: number;
  model?: string;
}

export function checkThresholds(data: RateLimitData, threshold: number): RateLimitWarning[] {
  const warnings: RateLimitWarning[] = [];
  
  if (data.models) {
    Object.entries(data.models).forEach(([modelName, info]) => {
      const usage = ((info.limit - info.remaining) / info.limit) * 100;
      
      if (usage >= threshold) {
        warnings.push({
          type: `quota-${modelName}`,
          current: info.limit - info.remaining,
          limit: info.limit,
          percentage: usage,
          model: modelName
        });
      }
    });
  }

  const requests = data.requests;
  if (requests && requests.limit > 0) {
      const reqUsage = ((requests.limit - requests.remaining) / requests.limit) * 100;
      if (reqUsage >= threshold) {
        warnings.push({
          type: 'requests',
          current: requests.limit - requests.remaining,
          limit: requests.limit,
          percentage: reqUsage,
        });
      }
  }

  const tokens = data.tokens;
  if (tokens && tokens.limit > 0) {
      const tokUsage = ((tokens.limit - tokens.remaining) / tokens.limit) * 100;
      if (tokUsage >= threshold) {
        warnings.push({
          type: 'tokens',
          current: tokens.limit - tokens.remaining,
          limit: tokens.limit,
          percentage: tokUsage,
        });
      }
  }

  return warnings;
}
