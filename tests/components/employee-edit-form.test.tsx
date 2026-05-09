import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { EmployeeForm } from '../../src/components/forms/employee-form';
import { useUpdateEmployee } from '../../src/hooks/use-update-employee';
import { useEmployee } from '../../src/hooks/use-employee';

// Mock hooks
vi.mock('../../src/hooks/use-update-employee', () => ({
  useUpdateEmployee: vi.fn(),
}));

vi.mock('../../src/hooks/use-employee', () => ({
  useEmployee: vi.fn(),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('EmployeeEditForm', () => {
  const mockEmployee = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    country: 'USA',
    jobTitle: 'Engineer',
    salary: 50000,
  };

  const mockUpdateEmployee = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useEmployee as any).mockReturnValue({
      employee: mockEmployee,
      isLoading: false,
    });
    (useUpdateEmployee as any).mockReturnValue({
      updateEmployee: mockUpdateEmployee,
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('prefills the form with existing employee data', () => {
    const { container } = render(<EmployeeForm employee={mockEmployee} />);
    
    expect((container.querySelector('input[name="firstName"]') as HTMLInputElement).value).toBe('John');
    expect((container.querySelector('input[name="email"]') as HTMLInputElement).value).toBe('john.doe@example.com');
  });

  it('submits updated data correctly', async () => {
    const { container } = render(<EmployeeForm employee={mockEmployee} />);
    
    const firstNameInput = container.querySelector('input[name="firstName"]')!;
    fireEvent.change(firstNameInput, { target: { value: 'Johnathan' } });
    
    const submitButton = container.querySelector('[data-testid="submit-button"]')!;
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockUpdateEmployee).toHaveBeenCalledWith('1', expect.objectContaining({
        firstName: 'Johnathan',
      }));
    });
  });

  it('shows loading state while fetching employee', () => {
    (useEmployee as any).mockReturnValue({
      employee: null,
      isLoading: true,
    });
    
    render(<EmployeeForm employeeId="1" />);
    expect(screen.getByText(/loading/i)).toBeDefined();
  });
});
