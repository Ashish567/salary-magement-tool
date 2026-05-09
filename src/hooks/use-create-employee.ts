import { useState } from 'react';
import { CreateEmployeeRequest, CreateEmployeeResponse, ErrorResponse } from '@/dto/employee.dto';

export function useCreateEmployee() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEmployee = async (data: CreateEmployeeRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorData = result as ErrorResponse;
        setError(errorData.error || 'Failed to create employee');
        return null;
      }

      return (result as CreateEmployeeResponse).data.employee;
    } catch (e) {
      setError('An unexpected error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createEmployee,
    isLoading,
    error,
  };
}
