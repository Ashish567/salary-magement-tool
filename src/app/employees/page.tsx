import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { EmployeeTable } from "@/components/tables/employee-table";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function EmployeesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Employee <span className="text-primary">Directory</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your organization's workforce, view salary details, and track joining dates.
          </p>
        </div>
        
        <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
          <EmployeeTable />
        </Suspense>
      </div>
    </main>
  );
}
