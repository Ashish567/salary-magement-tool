import { useState, useEffect } from 'react';
import { Employee } from '@/types/employee.types';

export function useEmployee(id?: string) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchEmployee = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/employees/${id}`);
        const result = await response.json();
        if (result.success) {
          setEmployee(result.data.employee);
        } else {
          setError(result.error || 'Failed to fetch employee');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  return { employee, isLoading, error };
}
