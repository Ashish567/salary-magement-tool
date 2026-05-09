"use client";

import React, { useMemo, useCallback } from "react";
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
import { ArrowUpDown, Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { GenericErrorBoundary } from "@/components/error-boundary/generic-error-boundary";

// Optimized Currency Formatter (Static to avoid re-creation)
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

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
    removeEmployeeLocal 
  } = useEmployees();

  const hasFilters = useMemo(() => !!(search || country || jobTitle), [search, country, jobTitle]);

  const clearFilters = useCallback(() => {
    setSearch('');
    setFilter('country', '');
    setFilter('jobTitle', '');
  }, [setSearch, setFilter]);

  const handleSort = useCallback((field: string) => {
    const newOrder = sortBy === field && order === 'asc' ? 'desc' : 'asc';
    setSort(field, newOrder);
  }, [sortBy, order, setSort]);

  // Memoized Sort Button Component
  const SortButton = useMemo(() => {
    return ({ field, label }: { field: string, label: string }) => (
      <Button 
        variant="ghost" 
        onClick={() => handleSort(field)} 
        className="-ml-4 h-8 transition-all hover:bg-primary/10 hover:text-primary"
      >
        <span>{label}</span>
        <ArrowUpDown className={`ml-2 h-4 w-4 transition-transform ${sortBy === field ? 'opacity-100 scale-110 text-primary' : 'opacity-50'}`} />
      </Button>
    );
  }, [handleSort, sortBy]);

  return (
    <GenericErrorBoundary>
      <Card className="border-primary/10 shadow-xl shadow-primary/5 overflow-hidden">
        <CardHeader className="space-y-4 bg-muted/20 pb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight">Employee Directory</CardTitle>
              <CardDescription className="text-base">
                Manage your organization's workforce and payroll with ease.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <EmployeeSearch />
              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 px-2 lg:px-3 text-destructive hover:bg-destructive/10">
                  Reset
                  <X className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <EmployeeFilters />
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[250px]"><SortButton field="fullName" label="Full Name" /></TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="hidden lg:table-cell">Job Title</TableHead>
                  <TableHead><SortButton field="salary" label="Salary" /></TableHead>
                  <TableHead className="hidden sm:table-cell"><SortButton field="createdAt" label="Joined" /></TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <TableCell key={j}><Skeleton className="h-6 w-full" /></TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : employees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-48 text-center text-muted-foreground animate-in fade-in duration-500">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-lg font-medium">No results found</p>
                        <p className="text-sm">Try adjusting your filters or search query.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  employees.map((employee) => (
                    <TableRow key={employee.id} className="hover:bg-muted/40 transition-colors group">
                      <TableCell className="font-semibold text-primary/80">{employee.fullName}</TableCell>
                      <TableCell className="text-muted-foreground hidden md:table-cell">{employee.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal">{employee.country}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{employee.jobTitle}</TableCell>
                      <TableCell className="font-mono text-sm font-medium">
                        {currencyFormatter.format(employee.salary)}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm hidden sm:table-cell">
                        {format(new Date(employee.createdAt), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary" asChild>
                            <Link href={`/employees/${employee.id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DeleteEmployeeDialog 
                            employeeId={employee.id} 
                            employeeName={employee.fullName} 
                            onSuccess={() => removeEmployeeLocal(employee.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 border-t bg-muted/5">
            <PaginationControls />
          </div>
        </CardContent>
      </Card>
    </GenericErrorBoundary>
  );
}
