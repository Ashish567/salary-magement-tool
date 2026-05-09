import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DeleteEmployeeDialog } from '../../src/components/dialogs/delete-employee-dialog';
import { useDeleteEmployee } from '../../src/hooks/use-delete-employee';

// Mock the hook
vi.mock('../../src/hooks/use-delete-employee', () => ({
  useDeleteEmployee: vi.fn(),
}));

describe('DeleteEmployeeDialog', () => {
  const mockDeleteEmployee = vi.fn();
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockDeleteEmployee.mockResolvedValue(true);
    (useDeleteEmployee as any).mockReturnValue({
      deleteEmployee: mockDeleteEmployee,
      isLoading: false,
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('triggers deletion when confirm is clicked', async () => {
    render(
      <DeleteEmployeeDialog 
        employeeId="1" 
        employeeName="John Doe" 
        onSuccess={mockOnSuccess} 
      />
    );
    
    // Open the dialog
    const trigger = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(trigger);
    
    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: /confirm delete/i });
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      expect(mockDeleteEmployee).toHaveBeenCalledWith('1');
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('disables buttons while deleting', async () => {
    (useDeleteEmployee as any).mockReturnValue({
      deleteEmployee: mockDeleteEmployee,
      isLoading: true,
    });
    
    render(
      <DeleteEmployeeDialog 
        employeeId="1" 
        employeeName="John Doe" 
      />
    );
    
    const trigger = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(trigger);
    
    const confirmButton = screen.getByRole('button', { name: /deleting/i });
    expect(confirmButton).toBeDisabled();
  });
});
