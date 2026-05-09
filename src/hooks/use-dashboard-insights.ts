import { useState, useEffect } from 'react';
import { CountryInsight, JobTitleInsight } from '@/dto/insights.dto';

interface DashboardInsights {
  summary: {
    totalEmployees: number;
    averageSalary: number;
    highestSalary: number;
    lowestSalary: number;
  };
  countryInsights: CountryInsight[];
  topJobTitles: JobTitleInsight[];
}

export function useDashboardInsights() {
  const [insights, setInsights] = useState<DashboardInsights | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [summaryRes, countriesRes, topRes] = await Promise.all([
          fetch('/api/insights/summary'),
          fetch('/api/insights/countries'),
          fetch('/api/insights/top'),
        ]);

        const summaryData = await summaryRes.json();
        const countriesData = await countriesRes.json();
        const topData = await topRes.json();

        if (summaryData.success && countriesData.success && topData.success) {
          setInsights({
            summary: summaryData.data,
            countryInsights: countriesData.data,
            topJobTitles: topData.data,
          });
        } else {
          setError('Failed to fetch dashboard data');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { insights, isLoading, error };
}
