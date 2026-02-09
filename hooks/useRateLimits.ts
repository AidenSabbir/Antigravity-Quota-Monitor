import { useState, useEffect, useCallback } from 'react';
import { Config, Account, DEFAULT_CONFIG } from '@/lib/types/config';
import { RateLimitData, RateLimitInfo } from '@/lib/types/api';

export interface AccountStatus {
  account: Account;
  status: 'ok' | 'error' | 'loading';
  data?: RateLimitData;
  error?: string;
  lastUpdated: number;
}

export function useRateLimits(initialConfig?: Config) {
  const [config, setConfig] = useState<Config>(initialConfig || DEFAULT_CONFIG);
  const [statuses, setStatuses] = useState<Record<string, AccountStatus>>({});
  const [lastGlobalUpdate, setLastGlobalUpdate] = useState<number>(Date.now());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAntigravityData = useCallback(async () => {
    if (Object.keys(statuses).length === 0) setIsLoading(true);

    try {
      const res = await fetch('/api/antigravity-data');
      if (!res.ok) throw new Error('Failed to fetch antigravity data');
      
      const json = await res.json();
      const accountsRaw = json.accounts || [];
      
      const newStatuses: Record<string, AccountStatus> = {};
      const newAccounts: Account[] = [];

      accountsRaw.forEach((acc: any) => {
        const email = acc.email;
        const cachedQuota = acc.cachedQuota || {};
        
        const models: Record<string, RateLimitInfo> = {};
        
        Object.entries(cachedQuota).forEach(([modelName, quota]: [string, any]) => {
          models[modelName] = {
            limit: 100,
            remaining: Math.round((quota.remainingFraction || 0) * 100),
            reset: quota.resetTime || new Date().toISOString()
          };
        });

        // Deterministic color generation from email string
        let hash = 0;
        for (let i = 0; i < email.length; i++) {
          hash = email.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = '#' + ((hash & 0x00FFFFFF).toString(16).toUpperCase()).padStart(6, '0');

        const account: Account = {
          name: email,
          apiKey: 'managed-by-opencode',
          color: color
        };
        
        newAccounts.push(account);

        newStatuses[email] = {
          account,
          status: 'ok',
          data: { models },
          lastUpdated: Date.now()
        };
      });

      setStatuses(newStatuses);
      setConfig(prev => ({ ...prev, accounts: newAccounts }));
      setLastGlobalUpdate(Date.now());
    } catch (error: any) {
      console.error("Error fetching antigravity data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [statuses]);

  useEffect(() => {
    fetchAntigravityData();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchAntigravityData, 30000);
    return () => clearInterval(interval);
  }, [fetchAntigravityData]);

  return {
    statuses,
    isLoading,
    lastUpdated: lastGlobalUpdate,
    refetch: fetchAntigravityData,
    config
  };
}
