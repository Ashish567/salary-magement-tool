import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EmployeesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">Employees</h1>
        <Card>
          <CardHeader>
            <CardTitle>Employees Placeholder</CardTitle>
            <CardDescription>
              Employee management features will be built in future TDD
              iterations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              This page is intentionally minimal for foundational setup.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
