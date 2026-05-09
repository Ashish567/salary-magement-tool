"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEmployees } from "@/hooks/use-employees";

export function EmployeeFilters() {
  const { country, jobTitle, setFilter } = useEmployees();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select value={country} onValueChange={(v) => setFilter('country', v === 'all' ? '' : v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Countries" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Countries</SelectItem>
          <SelectItem value="USA">USA</SelectItem>
          <SelectItem value="UK">UK</SelectItem>
          <SelectItem value="Canada">Canada</SelectItem>
          <SelectItem value="India">India</SelectItem>
          <SelectItem value="Germany">Germany</SelectItem>
        </SelectContent>
      </Select>

      <Select value={jobTitle} onValueChange={(v) => setFilter('jobTitle', v === 'all' ? '' : v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Job Titles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Job Titles</SelectItem>
          <SelectItem value="Developer">Developer</SelectItem>
          <SelectItem value="Designer">Designer</SelectItem>
          <SelectItem value="Manager">Manager</SelectItem>
          <SelectItem value="Analyst">Analyst</SelectItem>
          <SelectItem value="Engineer">Engineer</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
