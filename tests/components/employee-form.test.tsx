import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmployeeForm } from '../../src/components/forms/employee-form';
import { useCreateEmployee } from '../../src/hooks/use-create-employee';

// Mock the hook
vi.mock('../../src/hooks/use-create-employee', () => ({
  useCreateEmployee: vi.fn(),
}));

describe('EmployeeForm', () => {
  const mockCreateEmployee = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    (useCreateEmployee as any).mockReturnValue({
      createEmployee: mockCreateEmployee,
      isLoading: false,
      error: null,
    });
  });

  it('renders all form fields correctly', () => {
    render(<EmployeeForm />);
    
    expect(screen.getByLabelText(/first name/i)).toBeDefined();
    expect(screen.getByLabelText(/last name/i)).toBeDefined();
    expect(screen.getByLabelText(/full name/i)).toBeDefined();
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText(/country/i)).toBeDefined();
    expect(screen.getByLabelText(/job title/i)).toBeDefined();
    expect(screen.getByLabelText(/salary/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /create employee/i })).toBeDefined();
  });

  it('shows validation errors for invalid input', async () => {
    render(<EmployeeForm />);
    
    const submitButton = screen.getByRole('button', { name: /create employee/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getAllByText(/required/i)).toBeDefined();
    });
  });

  it('submits the form with valid data', async () => {
    render(<EmployeeForm />);
    
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/country/i), { target: { value: 'USA' } });
    fireEvent.change(screen.getByLabelText(/job title/i), { target: { value: 'Engineer' } });
    fireEvent.change(screen.getByLabelText(/salary/i), { target: { value: '50000' } });
    
    const submitButton = screen.getByRole('button', { name: /create employee/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockCreateEmployee).toHaveBeenCalledWith(expect.objectContaining({
        email: 'john.doe@example.com',
        salary: 50000,
      }));
    });
  });

  it('disables the submit button when loading', () => {
    (useCreateEmployee as any).mockReturnValue({
      createEmployee: mockCreateEmployee,
      isLoading: true,
      error: null,
    });
    
    render(<EmployeeForm />);
    
    const submitButton = screen.getByRole('button', { name: /creating/i });
    expect(submitButton).toBeDisabled();
  });

  it('displays error message from API failure', () => {
    (useCreateEmployee as any).mockReturnValue({
      createEmployee: mockCreateEmployee,
      isLoading: false,
      error: 'Email already exists',
    });
    
    render(<EmployeeForm />);
    
    expect(screen.getByText(/email already exists/i)).toBeDefined();
  });
});
