import { RateLimitData } from '@/lib/types/api';

export function parseRateLimitHeaders(headers: Headers): RateLimitData {
  const getHeader = (key: string) => headers.get(key);
  const getInt = (key: string) => parseInt(getHeader(key) || '0', 10);
  const getDate = (key: string) => getHeader(key) || new Date().toISOString();

  // Requests
  const requests = {
    limit: getInt('anthropic-ratelimit-requests-limit'),
    remaining: getInt('anthropic-ratelimit-requests-remaining'),
    reset: getDate('anthropic-ratelimit-requests-reset'),
  };

  // Tokens
  const tokens = {
    limit: getInt('anthropic-ratelimit-tokens-limit'),
    remaining: getInt('anthropic-ratelimit-tokens-remaining'),
    reset: getDate('anthropic-ratelimit-tokens-reset'),
  };

  // Priority (check if headers exist)
  let priority = undefined;
  if (getHeader('anthropic-priority-input-tokens-limit')) {
    priority = {
      input: {
        limit: getInt('anthropic-priority-input-tokens-limit'),
        remaining: getInt('anthropic-priority-input-tokens-remaining'),
        reset: getDate('anthropic-priority-input-tokens-reset'),
      },
      output: {
        limit: getInt('anthropic-priority-output-tokens-limit'),
        remaining: getInt('anthropic-priority-output-tokens-remaining'),
        reset: getDate('anthropic-priority-output-tokens-reset'),
      },
    };
  }

  return { requests, tokens, priority };
}
