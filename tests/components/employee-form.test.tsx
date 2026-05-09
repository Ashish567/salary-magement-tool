import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmployeeForm } from '../../src/components/forms/employee-form';
import { useCreateEmployee } from '../../src/hooks/use-create-employee';

// Mock the hook
vi.mock('../../src/hooks/use-create-employee', () => ({
  useCreateEmployee: vi.fn(),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
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
    const { container } = render(<EmployeeForm />);
    
    expect(container.querySelector('input[name="firstName"]')).toBeDefined();
    expect(container.querySelector('input[name="lastName"]')).toBeDefined();
    expect(container.querySelector('input[name="fullName"]')).toBeDefined();
    expect(container.querySelector('input[name="email"]')).toBeDefined();
    expect(container.querySelector('input[name="country"]')).toBeDefined();
    expect(container.querySelector('input[name="jobTitle"]')).toBeDefined();
    expect(container.querySelector('input[name="salary"]')).toBeDefined();
    expect(container.querySelector('[data-testid="submit-button"]')).toBeDefined();
  });

  it('shows validation errors for invalid input', async () => {
    const { container } = render(<EmployeeForm />);
    
    const submitButton = container.querySelector('[data-testid="submit-button"]') as HTMLButtonElement;
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getAllByText(/required/i)).toBeDefined();
    });
  });

  it('submits the form with valid data', async () => {
    const { container } = render(<EmployeeForm />);
    
    fireEvent.change(container.querySelector('input[name="firstName"]')!, { target: { value: 'John' } });
    fireEvent.change(container.querySelector('input[name="lastName"]')!, { target: { value: 'Doe' } });
    fireEvent.change(container.querySelector('input[name="fullName"]')!, { target: { value: 'John Doe' } });
    fireEvent.change(container.querySelector('input[name="email"]')!, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(container.querySelector('input[name="country"]')!, { target: { value: 'USA' } });
    fireEvent.change(container.querySelector('input[name="jobTitle"]')!, { target: { value: 'Engineer' } });
    fireEvent.change(container.querySelector('input[name="salary"]')!, { target: { value: '50000' } });
    
    const submitButton = container.querySelector('[data-testid="submit-button"]') as HTMLButtonElement;
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
    
    const { container } = render(<EmployeeForm />);
    
    const submitButton = container.querySelector('[data-testid="submit-button"]') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
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
