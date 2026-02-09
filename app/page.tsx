"use client";

import { useRateLimits } from "@/hooks/useRateLimits";
import { Header } from "@/components/dashboard/Header";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { statuses, isLoading, lastUpdated, refetch, config } = useRateLimits();
  
  const accounts = config?.accounts || [];
  const hasAccounts = accounts.length > 0;

  // If no accounts, show empty state
  if (!isLoading && !hasAccounts) {
      return (
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <Header lastUpdated={lastUpdated} onRefresh={refetch} isLoading={isLoading} />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="brutalist-border bg-card p-8 max-w-lg w-full brutalist-shadow text-center">
            <div className="w-20 h-20 bg-foreground text-background mx-auto flex items-center justify-center mb-6">
              <PlusCircle className="h-10 w-10" />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
              No Accounts
            </h2>
            <p className="text-gray-600 font-bold mb-6 text-lg">
              Add your API keys to the configuration to start monitoring rate limits.
            </p>
            <div className="bg-muted p-4 text-left font-mono text-xs border-2 border-[var(--brutalist-border-color)] mb-6 overflow-x-auto">
              <p className="mb-2 font-bold text-muted-foreground text-xs">// config.local.json example</p>
              <pre className="text-foreground">
{`{
  "accounts": [
    {
      "name": "Production",
      "apiKey": "sk-...",
      "color": "#FF4136"
    }
  ]
}`}
              </pre>
            </div>
            <Button className="w-full bg-foreground text-background hover:bg-muted-foreground border-none rounded-none h-14 text-lg font-bold uppercase">
              Configure Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background pb-20">
      <Header 
        lastUpdated={lastUpdated} 
        onRefresh={refetch} 
        isLoading={isLoading} 
      />

      <main className="container mx-auto p-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {isLoading && Object.keys(statuses).length === 0 ? (
              // Loading Skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[400px] brutalist-border bg-card p-6 space-y-4">
                  <Skeleton className="h-8 w-1/2 bg-muted/50" />
                  <Skeleton className="h-4 w-full bg-muted/50" />
                  <Skeleton className="h-4 w-3/4 bg-muted/50" />
                  <div className="pt-8 space-y-4">
                     <Skeleton className="h-20 w-full bg-muted/50" />
                     <Skeleton className="h-20 w-full bg-muted/50" />
                  </div>
                </div>
              ))
            ) : (
              // Actual Cards
              accounts.map((account) => {
                const status = statuses[account.name] || { 
                  account, 
                  status: 'loading', 
                  lastUpdated: 0 
                };
                return (
                  <AccountCard key={account.name} status={status} />
                );
              })
            )}
          </div>
      </main>
    </div>
  );
}
