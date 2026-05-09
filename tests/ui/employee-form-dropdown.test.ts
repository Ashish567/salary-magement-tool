import { render, screen } from '@testing-library/react';
import { EmployeeForm } from '@/components/forms/employee-form';

// Simple wrapper to avoid Next.js router errors
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

test('EmployeeForm renders country and job title dropdowns', () => {
  render(<EmployeeForm />);
  // Expect two comboboxes (Select components) to be in the document
  const combos = screen.getAllByRole('combobox');
  expect(combos).toHaveLength(2);
});
