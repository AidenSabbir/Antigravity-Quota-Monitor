import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { AccountStatus } from '@/lib/types/api';
import { checkThresholds } from '@/lib/alerts/checkThresholds';
import { Config } from '@/lib/types/config';

export function useAlerts(statuses: Record<string, AccountStatus>, config: Config) {
  const shownAlerts = useRef<Set<string>>(new Set());

  useEffect(() => {
    Object.entries(statuses).forEach(([accountName, status]) => {
      if (status.isLoading || status.error || !status.data) return;

      const warnings = checkThresholds(status.data, config.alertThreshold);
      
      warnings.forEach((warning) => {
        const alertKey = `${accountName}-${warning.type}`;
        
        if (shownAlerts.current.has(alertKey)) return;

        shownAlerts.current.add(alertKey);
        
        toast.warning('Rate Limit Alert', {
          description: `${accountName}: ${warning.type} usage at ${Math.round(warning.percentage)}%`,
          duration: 10000,
        });
      });
    });
  }, [statuses, config.alertThreshold]);
}
