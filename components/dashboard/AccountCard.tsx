import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AccountStatus } from "@/hooks/useRateLimits";
import { ModelLimits } from "./ModelLimits";
import { AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

interface AccountCardProps {
  status: AccountStatus;
}

export function AccountCard({ status }: AccountCardProps) {
  const { account, data, error, status: loadStatus } = status;

  const shadowColor = account.color || 'var(--brutalist-shadow-color)';

  return (
    <Card
      className="h-full flex flex-col transition-all hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--shadow-color)]"
      style={{
        borderColor: account.color || 'var(--brutalist-border-color)',
        boxShadow: `4px 4px 0px 0px ${shadowColor}`,
        '--shadow-color': shadowColor
      } as React.CSSProperties}
    >
      <CardHeader className="border-b-4 pb-4" style={{ borderColor: account.color || 'var(--brutalist-border-color)' }}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold truncate pr-2">
            {account.name}
          </CardTitle>
          <Badge variant={loadStatus === 'error' ? 'destructive' : 'default'} className="shrink-0">
            {loadStatus === 'loading' && <Loader2 className="h-3 w-3 animate-spin mr-1" />}
            {loadStatus === 'error' && <AlertTriangle className="h-3 w-3 mr-1" />}
            {loadStatus === 'ok' && <CheckCircle className="h-3 w-3 mr-1" />}
            {loadStatus.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-6">
        {loadStatus === 'loading' && !data && (
          <div className="flex h-32 items-center justify-center text-muted-foreground font-mono font-bold">
            Loading rate limits...
          </div>
        )}

        {loadStatus === 'error' && (
          <div className="flex h-32 items-center justify-center text-destructive font-mono font-bold text-center p-4">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <div>Error: {error || "Failed to fetch data"}</div>
          </div>
        )}

        {data && <ModelLimits data={data} />}
      </CardContent>
    </Card>
  );
}
