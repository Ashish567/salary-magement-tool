"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useEmployees } from "@/hooks/use-employees";

export function EmployeeSearch() {
  const { search, setSearch } = useEmployees();
  const [localValue, setLocalValue] = useState(search);

  // Debounce search update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== search) {
        setSearch(localValue);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localValue, search, setSearch]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search employees..."
        className="pl-9"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
    </div>
  );
}
