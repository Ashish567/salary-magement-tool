import { useState } from 'react';

export function useDeleteEmployee() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteEmployee = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        return true;
      } else {
        setError(result.error || 'Deletion failed');
        return false;
      }
    } catch (err) {
      setError('Network error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteEmployee, isLoading, error };
}
