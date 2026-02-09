import { RateLimitData, RateLimitInfo } from "@/lib/types/api"
import { RateLimitBar } from "./RateLimitBar"
import { ResetCountdown } from "./ResetCountdown"

interface ModelLimitsProps {
  data: RateLimitData
}

function LimitGroup({ label, info }: { label: string; info: RateLimitInfo }) {
  return (
    <div className="space-y-1">
      <RateLimitBar label={label} info={info} />
      <div className="flex justify-end">
        <ResetCountdown resetTime={info.reset} />
      </div>
    </div>
  )
}

export function ModelLimits({ data }: ModelLimitsProps) {
  const models = data.models || {};
  const hasModels = Object.keys(models).length > 0;

  return (
    <div className="flex flex-col gap-6 pb-4">
      {!hasModels && !data.requests && !data.tokens && (
        <div className="text-muted-foreground italic text-sm text-center py-4">No quota data available.</div>
      )}

      {(data.requests || data.tokens) && (
        <div className="flex flex-col gap-4 p-4 border-2 border-gray-500 bg-muted">
          <h3 className="text-lg font-black uppercase tracking-tighter border-b-2 border-[var(--brutalist-border-color)] pb-2">Global Limits</h3>
          {data.requests && <LimitGroup label="Requests" info={data.requests} />}
          {data.tokens && <LimitGroup label="Tokens" info={data.tokens} />}
        </div>
      )}

      {hasModels && (
        <div className="flex flex-col gap-4 p-4 border-2 border-gray-500 bg-muted">
          <h3 className="text-lg font-black uppercase tracking-tighter border-b-2 border-[var(--brutalist-border-color)] pb-2">Model Quotas</h3>
          {Object.entries(models).map(([name, info]) => (
            <LimitGroup key={name} label={name} info={info} />
          ))}
        </div>
      )}
    </div>
  )
}
