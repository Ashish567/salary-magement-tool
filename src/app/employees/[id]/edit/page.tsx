import { EmployeeForm } from "@/components/forms/employee-form";

export default function EditEmployeePage({ params }: { params: { id: string } }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
            Edit <span className="text-primary">Employee</span>
          </h1>
          <p className="text-muted-foreground">
            Update the profile and payroll information for this employee.
          </p>
        </div>
        
        <EmployeeForm employeeId={params.id} />
      </div>
    </main>
  );
}
