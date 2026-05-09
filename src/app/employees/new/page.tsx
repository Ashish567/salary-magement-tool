import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { EmployeeForm } from "@/components/forms/employee-form";

export default function AddEmployeePage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Add <span className="text-primary">Employee</span>
          </h1>
          <p className="text-muted-foreground">
            Register a new employee to start managing their payroll and performance.
          </p>
        </div>
        
        <EmployeeForm />
      </div>
    </main>
  );
}
