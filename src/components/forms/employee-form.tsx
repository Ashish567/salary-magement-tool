"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/validations/employee.schema";
import { useCreateEmployee } from "@/hooks/use-create-employee";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

export function EmployeeForm() {
  const { createEmployee, isLoading, error: apiError } = useCreateEmployee();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      fullName: "",
      email: "",
      country: "",
      jobTitle: "",
      salary: 0,
    },
  });

  async function onSubmit(values: any) {
    const result = await createEmployee(values);
    if (result) {
      setSuccess(true);
      toast.success("Employee created successfully!");
      setTimeout(() => {
        router.push("/employees");
      }, 2000);
    } else {
      toast.error("Failed to create employee");
    }
  }

  if (success) {
    return (
      <Card className="border-green-100 bg-green-50/50">
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-green-900">Employee Created!</h3>
            <p className="text-green-700 text-sm">
              The employee has been successfully added to the system. Redirecting...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl shadow-primary/5 border-primary/10">
      <CardHeader>
        <CardTitle>Create Employee</CardTitle>
        <CardDescription>Enter the employee details to add them to the payroll.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="USA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="50000" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {apiError && (
              <div className="flex items-center gap-2 p-4 text-sm text-destructive bg-destructive/10 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span>{apiError}</span>
              </div>
            )}

            <Button type="submit" className="w-full h-11" disabled={isLoading} data-testid="submit-button">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Employee"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
