import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import { useEffect, useState } from "react"

interface HeaderProps {
  lastUpdated?: number
  onRefresh?: () => void
  isLoading?: boolean
}

export function Header({ lastUpdated, onRefresh, isLoading }: HeaderProps) {
  const [timeAgo, setTimeAgo] = useState<string>("")

  useEffect(() => {
    if (!lastUpdated) return

    const updateTime = () => {
      const seconds = Math.floor((Date.now() - lastUpdated) / 1000)
      if (seconds < 60) {
        setTimeAgo(`${seconds}s ago`)
      } else {
        const minutes = Math.floor(seconds / 60)
        setTimeAgo(`${minutes}m ago`)
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [lastUpdated])

  return (
    <header className="flex items-center justify-between brutalist-border bg-background p-6 sticky top-0 z-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          Antigravity Monitor
        </h1>
        <div className="flex items-center gap-2 text-sm font-bold font-mono uppercase text-gray-500">
          <span>Status: Active</span>
          {lastUpdated && (
            <>
              <span>•</span>
              <span>Updated: {timeAgo}</span>
            </>
          )}
        </div>
      </div>

      <Button 
        onClick={onRefresh} 
        disabled={isLoading}
        className="brutalist-border bg-background text-foreground hover:bg-foreground hover:text-background transition-all brutalist-shadow active:shadow-none active:translate-x-[4px] active:translate-y-[4px] rounded-none h-12 px-6 font-bold uppercase tracking-wider"
      >
        <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        {isLoading ? 'Refreshing...' : 'Refresh'}
      </Button>
    </header>
  )
}
