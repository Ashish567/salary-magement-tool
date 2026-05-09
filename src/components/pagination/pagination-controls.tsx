"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEmployees } from "@/hooks/use-employees";

export function PaginationControls() {
  const { pagination, setPage } = useEmployees();

  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing page {pagination.currentPage} of {pagination.totalPages} ({pagination.total} total)
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          data-testid="prev-page"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              variant={pagination.currentPage === p ? "default" : "outline"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setPage(p)}
              data-testid={`page-${p}`}
            >
              {p}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          data-testid="next-page"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
