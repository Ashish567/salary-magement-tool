"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useEmployees } from "@/hooks/use-employees";
import { EmployeeSearch } from "@/components/search/employee-search";
import { EmployeeFilters } from "@/components/filters/employee-filters";
import { PaginationControls } from "@/components/pagination/pagination-controls";
import { DeleteEmployeeDialog } from "@/components/dialogs/delete-employee-dialog";
import { format } from "date-fns";
import { ArrowUpDown, Edit, MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export function EmployeeTable() {
  const { 
    employees, 
    isLoading, 
    sortBy, 
    order, 
    setSort, 
    setSearch, 
    setFilter, 
    search, 
    country, 
    jobTitle,
    refresh 
  } = useEmployees();

  const hasFilters = !!(search || country || jobTitle);

  const clearFilters = () => {
    setSearch('');
    setFilter('country', '');
    setFilter('jobTitle', '');
  };

  const handleSort = (field: string) => {
    const newOrder = sortBy === field && order === 'asc' ? 'desc' : 'asc';
    setSort(field, newOrder);
  };

  const SortButton = ({ field, label }: { field: string, label: string }) => (
    <Button 
      variant="ghost" 
      onClick={() => handleSort(field)} 
      className="-ml-4 h-8 data-[state=open]:bg-accent"
    >
      <span>{label}</span>
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );

  return (
    <Card className="border-primary/10 shadow-xl shadow-primary/5">
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Directory</CardTitle>
            <CardDescription>
              Manage your organization's employees and their payroll details.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <EmployeeSearch />
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 px-2 lg:px-3">
                Reset
                <X className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <EmployeeFilters />
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden relative max-h-[600px] overflow-y-auto">
          <Table>
            <TableHeader className="bg-muted/50 sticky top-0 z-10">
              <TableRow>
                <TableHead className="bg-muted/50"><SortButton field="fullName" label="Full Name" /></TableHead>
                <TableHead className="bg-muted/50">Email</TableHead>
                <TableHead className="bg-muted/50">Country</TableHead>
                <TableHead className="bg-muted/50">Job Title</TableHead>
                <TableHead className="bg-muted/50"><SortButton field="salary" label="Salary" /></TableHead>
                <TableHead className="bg-muted/50"><SortButton field="createdAt" label="Joined" /></TableHead>
                <TableHead className="bg-muted/50 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <TableCell key={j}><Skeleton className="h-6 w-full animate-pulse" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No employees found.
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{employee.fullName}</TableCell>
                    <TableCell className="text-muted-foreground">{employee.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{employee.country}</Badge>
                    </TableCell>
                    <TableCell>{employee.jobTitle}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(employee.salary)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(employee.createdAt), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/employees/${employee.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeleteEmployeeDialog 
                          employeeId={employee.id} 
                          employeeName={employee.fullName} 
                          onSuccess={refresh}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <PaginationControls />
      </CardContent>
    </Card>
  );
}
