import { Account } from '@/lib/types/config';
import { RateLimitData } from '@/lib/types/api';
import { parseRateLimitHeaders } from './parseHeaders';

export async function fetchAccountRateLimits(account: Account): Promise<RateLimitData> {
  const url = `${account.baseUrl || 'https://api.anthropic.com'}/v1/messages`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-api-key': account.apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1,
        messages: [{ role: 'user', content: 'Hi' }],
      }),
    });

    // Check for 401 specifically
    if (response.status === 401) {
      throw new Error('Invalid API Key');
    }

    // Even if other error (400/429), headers might be present.
    // If no headers, throw error.
    if (!response.headers.get('anthropic-ratelimit-requests-limit')) {
       if (!response.ok) {
         throw new Error(`API Error: ${response.status} ${response.statusText}`);
       }
    }

    return parseRateLimitHeaders(response.headers);
  } catch (error) {
    // console.error(`Error fetching rate limits for ${account.name}:`, error);
    throw error;
  }
}
