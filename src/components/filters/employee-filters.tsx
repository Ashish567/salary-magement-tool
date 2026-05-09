"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEmployees } from "@/hooks/use-employees";
import { COUNTRIES, JOB_TITLES } from "@/constants/employee-constants";

export function EmployeeFilters() {
  const { country, jobTitle, setFilter } = useEmployees();

  return (
    <div className="flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-left-2 duration-300">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground ml-1">Country</label>
        <Select value={country || "all"} onValueChange={(v) => setFilter('country', v === 'all' ? '' : v)}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent className="z-50">
            <SelectItem value="all">All Countries</SelectItem>
            {COUNTRIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground ml-1">Job Title</label>
        <Select value={jobTitle || "all"} onValueChange={(v) => setFilter('jobTitle', v === 'all' ? '' : v)}>
          <SelectTrigger className="w-[200px] bg-background">
            <SelectValue placeholder="All Job Titles" />
          </SelectTrigger>
          <SelectContent className="z-50">
            <SelectItem value="all">All Job Titles</SelectItem>
            {JOB_TITLES.map((jt) => (
              <SelectItem key={jt} value={jt}>{jt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
