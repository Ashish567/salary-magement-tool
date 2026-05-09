import { useState } from 'react';
import { CreateEmployeeRequest } from '@/dto/employee.dto';
import { Employee } from '@/types/employee.types';

export function useUpdateEmployee() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateEmployee = async (id: string, data: Partial<CreateEmployeeRequest>) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        return result.data.employee as Employee;
      } else {
        setError(result.error || 'Update failed');
        return null;
      }
    } catch (err) {
      setError('Network error');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateEmployee, isLoading, error };
}
