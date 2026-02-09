import { RateLimitInfo } from "@/lib/types/api"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface RateLimitBarProps {
  label: string
  info: RateLimitInfo
}

export function RateLimitBar({ label, info }: RateLimitBarProps) {
  const usage = info.limit > 0 ? ((info.limit - info.remaining) / info.limit) * 100 : 0

  let colorClass = "bg-green-600"
  if (usage > 80) {
    colorClass = "bg-red-600"
  } else if (usage > 50) {
    colorClass = "bg-yellow-400"
  }

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between items-baseline">
        <span className="font-bold text-sm uppercase tracking-tight">{label}</span>
        <span className="font-mono text-xs font-bold tabular-nums">
          {info.limit - info.remaining} / {info.limit}
        </span>
      </div>
      <Progress
        value={usage}
        className="h-4 border-2 border-black  rounded-none"
        indicatorClassName={cn(colorClass, "rounded-none transition-all duration-500 ease-out")}
      />
    </div>
  )
}
