"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useEmployees } from "@/hooks/use-employees";

export function PaginationControls() {
  const { pagination, setPage } = useEmployees();

  if (!pagination || pagination.totalPages <= 1) return null;

  const { currentPage, totalPages } = pagination;

  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5;

    if (totalPages <= showMax + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 'ellipsis', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4">
      <div className="text-sm text-muted-foreground order-2 sm:order-1">
        Showing page <span className="font-medium text-foreground">{currentPage}</span> of{" "}
        <span className="font-medium text-foreground">{totalPages}</span>{" "}
        <span className="text-xs">({pagination.total} total)</span>
      </div>
      <div className="flex items-center space-x-2 order-1 sm:order-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 px-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">Previous</span>
        </Button>
        <div className="flex items-center gap-1">
          {getPageNumbers().map((p, i) => (
            p === 'ellipsis' ? (
              <div key={`ellipsis-${i}`} className="flex h-8 w-8 items-center justify-center text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </div>
            ) : (
              <Button
                key={p}
                variant={currentPage === p ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setPage(p as number)}
              >
                {p}
              </Button>
            )
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 px-2"
        >
          <span className="hidden sm:inline mr-1">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
