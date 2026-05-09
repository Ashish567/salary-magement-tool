import { EmployeeForm } from "@/components/forms/employee-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function EditEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="flex flex-col gap-4">
          <Button variant="ghost" className="w-fit -ml-4" asChild>
            <Link href="/employees">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Directory
            </Link>
          </Button>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
              Edit <span className="text-primary">Employee</span>
            </h1>
            <p className="text-muted-foreground">
              Update the profile and payroll information for this employee.
            </p>
          </div>
        </div>
        
        <EmployeeForm employeeId={id} />
      </div>
    </main>
  );
}
