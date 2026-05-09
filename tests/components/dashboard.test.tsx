import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import DashboardPage from '../../src/app/dashboard/page';
import { useDashboardInsights } from '../../src/hooks/use-dashboard-insights';

// Mock the hook
vi.mock('../../src/hooks/use-dashboard-insights', () => ({
  useDashboardInsights: vi.fn(),
}));

// Mock Recharts to avoid issues with JSDOM
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  BarChart: ({ children }: any) => <div>{children}</div>,
  Bar: () => <div>Bar</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  Tooltip: () => <div>Tooltip</div>,
  PieChart: ({ children }: any) => <div>{children}</div>,
  Pie: () => <div>Pie</div>,
  Cell: () => <div>Cell</div>,
}));

describe('DashboardPage', () => {
  const mockInsights = {
    summary: {
      totalEmployees: 10,
      averageSalary: 50000,
      highestSalary: 100000,
      lowestSalary: 20000,
    },
    countryInsights: [
      { country: 'India', employeeCount: 5, averageSalary: 40000, minimumSalary: 20000, maximumSalary: 100000 },
    ],
    topJobTitles: [
      { country: 'India', jobTitle: 'Software Engineer', averageSalary: 80000, employeeCount: 2 },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders metric cards correctly', () => {
    (useDashboardInsights as any).mockReturnValue({
      insights: mockInsights,
      isLoading: false,
    });

    render(<DashboardPage />);
    
    expect(screen.getByText(/total employees/i)).toBeDefined();
    expect(screen.getByText('10')).toBeDefined();
    expect(screen.getByText(/average salary/i)).toBeDefined();
  });

  it('shows loading skeletons when loading', () => {
    (useDashboardInsights as any).mockReturnValue({
      insights: null,
      isLoading: true,
    });

    const { container } = render(<DashboardPage />);
    expect(container.querySelector('.animate-pulse')).not.toBeNull();
  });

  it('shows error state when fetching fails', () => {
    (useDashboardInsights as any).mockReturnValue({
      insights: null,
      isLoading: false,
      error: 'Failed to fetch insights',
    });

    render(<DashboardPage />);
    expect(screen.getByText(/failed to fetch insights/i)).toBeDefined();
  });
});
