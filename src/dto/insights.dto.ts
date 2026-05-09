export interface CountryInsight {
  country: string;
  employeeCount: number;
  minimumSalary: number;
  maximumSalary: number;
  averageSalary: number;
}

export interface JobTitleInsight {
  country: string;
  jobTitle: string;
  averageSalary: number;
  employeeCount: number;
}

import { z } from 'zod';

export const jobTitleInsightQuerySchema = z.object({
  country: z.string().min(1, 'Country is required'),
  jobTitle: z.string().min(1, 'Job Title is required'),
});

export type JobTitleInsightQuery = z.infer<typeof jobTitleInsightQuerySchema>;
