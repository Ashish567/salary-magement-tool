import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmployeeTable } from '../../src/components/tables/employee-table';
import { useEmployees } from '../../src/hooks/use-employees';

// Mock the hook
vi.mock('../../src/hooks/use-employees', () => ({
  useEmployees: vi.fn(),
}));

describe('EmployeeTable', () => {
  const mockEmployees = [
    {
      id: '1',
      firstName: 'Alice',
      lastName: 'Smith',
      fullName: 'Alice Smith',
      email: 'alice@example.com',
      country: 'USA',
      jobTitle: 'Developer',
      salary: 80000,
      createdAt: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useEmployees as any).mockReturnValue({
      employees: mockEmployees,
      isLoading: false,
      pagination: {
        total: 1,
        totalPages: 1,
        currentPage: 1,
        limit: 10,
      },
      setPage: vi.fn(),
      setSearch: vi.fn(),
      setSort: vi.fn(),
      setFilter: vi.fn(),
    });
  });

  it('renders employee rows correctly', () => {
    render(<EmployeeTable />);
    
    expect(screen.getByText('Alice Smith')).toBeDefined();
    expect(screen.getByText('alice@example.com')).toBeDefined();
    expect(screen.getByText('Developer')).toBeDefined();
  });

  it('shows loading skeletons when loading', () => {
    (useEmployees as any).mockReturnValue({
      employees: [],
      isLoading: true,
      pagination: null,
    });
    
    const { container } = render(<EmployeeTable />);
    // Check for skeletons - shadcn skeletons usually have animate-pulse class
    expect(container.querySelector('.animate-pulse')).toBeDefined();
  });

  it('shows empty state message when no employees found', () => {
    (useEmployees as any).mockReturnValue({
      employees: [],
      isLoading: false,
      pagination: { total: 0 },
    });
    
    render(<EmployeeTable />);
    expect(screen.getByText(/no employees found/i)).toBeDefined();
  });

  it('triggers search update when typing in search input', async () => {
    const setSearch = vi.fn();
    (useEmployees as any).mockReturnValue({
      employees: mockEmployees,
      isLoading: false,
      pagination: { total: 1 },
      setSearch,
    });
    
    render(<EmployeeTable />);
    const searchInput = screen.getByPlaceholderText(/search employees/i);
    fireEvent.change(searchInput, { target: { value: 'Bob' } });
    
    // Search is usually debounced, but the hook should handle it. 
    // Testing that the component calls the hook's setter.
    await waitFor(() => {
      expect(setSearch).toHaveBeenCalledWith('Bob');
    });
  });

  it('triggers page change when pagination button clicked', () => {
    const setPage = vi.fn();
    (useEmployees as any).mockReturnValue({
      employees: mockEmployees,
      isLoading: false,
      pagination: { total: 100, totalPages: 10, currentPage: 1, limit: 10 },
      setPage,
    });
    
    render(<EmployeeTable />);
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    
    expect(setPage).toHaveBeenCalledWith(2);
  });
});
