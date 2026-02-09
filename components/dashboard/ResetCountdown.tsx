import { useEffect, useState } from 'react';

interface ResetCountdownProps {
  resetTime: string;
}

export function ResetCountdown({ resetTime }: ResetCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const resetDate = new Date(resetTime);
      const now = new Date();
      const diff = resetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('Resetting...');
        return;
      }

      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (minutes > 0) {
        setTimeLeft(`Resets in ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`Resets in ${seconds}s`);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [resetTime]);

  return (
    <span className="font-mono font-bold tabular-nums text-xs">
      {timeLeft}
    </span>
  );
}
