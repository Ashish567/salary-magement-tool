import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Placeholder</CardTitle>
            <CardDescription>
              Overview widgets and analytics will be added in upcoming steps.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Starter UI shell ready for TDD-driven implementation.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
