import { prisma } from '@/lib/prisma';
import { CountryInsight, JobTitleInsight } from '@/dto/insights.dto';

export class InsightsRepository {
  async getCountryInsights(): Promise<CountryInsight[]> {
    const aggregations = await prisma.employee.groupBy({
      by: ['country'],
      _count: {
        _all: true,
      },
      _min: {
        salary: true,
      },
      _max: {
        salary: true,
      },
      _avg: {
        salary: true,
      },
    });

    return aggregations.map((item) => ({
      country: item.country,
      employeeCount: item._count._all,
      minimumSalary: item._min.salary || 0,
      maximumSalary: item._max.salary || 0,
      averageSalary: Math.round(item._avg.salary || 0),
    }));
  }

  async getJobTitleInsight(country: string, jobTitle: string): Promise<JobTitleInsight | null> {
    const aggregation = await prisma.employee.aggregate({
      where: {
        country,
        jobTitle,
      },
      _count: {
        _all: true,
      },
      _avg: {
        salary: true,
      },
    });

    if (aggregation._count._all === 0) {
      return null;
    }

    return {
      country,
      jobTitle,
      employeeCount: aggregation._count._all,
      averageSalary: Math.round(aggregation._avg.salary || 0),
    };
  }
}
