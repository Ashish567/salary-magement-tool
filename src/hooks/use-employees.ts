import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Employee } from '@/types/employee.types';
import { EmployeeListResponse, EmployeeListQuery } from '@/dto/employee.dto';

export function useEmployees() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<EmployeeListResponse['data']['pagination'] | null>(null);

  // Sync state with URL params
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const country = searchParams.get('country') || '';
  const jobTitle = searchParams.get('jobTitle') || '';
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const order = searchParams.get('order') || 'desc';

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams(searchParams.toString());
      if (!params.has('page')) params.set('page', '1');
      if (!params.has('limit')) params.set('limit', '10');

      const response = await fetch(`/api/employees?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setEmployees(result.data.employees);
        setPagination(result.data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const updateUrl = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    // Reset to page 1 on filter/search change unless explicitly setting page
    if (!newParams.page && (newParams.search !== undefined || newParams.country !== undefined || newParams.jobTitle !== undefined)) {
      params.set('page', '1');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    employees,
    isLoading,
    pagination,
    search,
    country,
    jobTitle,
    sortBy,
    order,
    setPage: (p: number) => updateUrl({ page: p.toString() }),
    setLimit: (l: number) => updateUrl({ limit: l.toString(), page: '1' }),
    setSearch: (s: string) => updateUrl({ search: s }),
    setFilter: (key: string, value: string) => updateUrl({ [key]: value }),
    setSort: (s: string, o: 'asc' | 'desc') => updateUrl({ sortBy: s, order: o }),
    refresh: fetchEmployees,
    removeEmployeeLocal: (id: string) => {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      if (pagination) {
        setPagination({
          ...pagination,
          total: pagination.total - 1,
        });
      }
    },
  };
}
