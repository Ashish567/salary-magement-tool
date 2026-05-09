"use client";

import { useDashboardInsights } from "@/hooks/use-dashboard-insights";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SalaryCountryChart } from "@/components/dashboard/salary-country-chart";
import { EmployeeDistributionChart } from "@/components/dashboard/department-distribution-chart";
import { TopJobTitlesChart } from "@/components/dashboard/top-job-titles-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertCircle
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DashboardPage() {
  const { insights, isLoading, error } = useDashboardInsights();

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">HR Analytics</h1>
        <p className="text-muted-foreground">
          Real-time insights into organization-wide salary distribution and workforce metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full rounded-xl" />
          ))
        ) : (
          <>
            <MetricCard 
              title="Total Employees" 
              value={insights?.summary.totalEmployees || 0} 
              description="Total workforce size" 
              icon={Users} 
            />
            <MetricCard 
              title="Average Salary" 
              value={`$${(insights?.summary.averageSalary || 0).toLocaleString()}`} 
              description="Across all regions" 
              icon={DollarSign} 
            />
            <MetricCard 
              title="Highest Salary" 
              value={`$${(insights?.summary.highestSalary || 0).toLocaleString()}`} 
              description="Peak compensation" 
              icon={TrendingUp} 
            />
            <MetricCard 
              title="Lowest Salary" 
              value={`$${(insights?.summary.lowestSalary || 0).toLocaleString()}`} 
              description="Base compensation" 
              icon={TrendingDown} 
            />
          </>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">
        {isLoading ? (
          <>
            <Skeleton className="h-[450px] col-span-4 lg:col-span-2 rounded-xl" />
            <Skeleton className="h-[450px] col-span-4 lg:col-span-2 rounded-xl" />
          </>
        ) : (
          <>
            <SalaryCountryChart data={insights?.countryInsights || []} />
            <EmployeeDistributionChart data={insights?.countryInsights || []} />
          </>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {isLoading ? (
          <Skeleton className="h-[450px] col-span-4 rounded-xl" />
        ) : (
          <TopJobTitlesChart data={insights?.topJobTitles || []} />
        )}
      </div>
    </div>
  );
}
