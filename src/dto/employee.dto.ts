import { z } from 'zod';
import { Employee } from '@/types/employee.types';

export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  country: string;
  jobTitle: string;
  salary: number;
}

export interface CreateEmployeeResponse {
  success: boolean;
  data: {
    employee: Employee;
  };
}

export const EmployeeListQuerySchema = z.object({
  page: z.preprocess((val) => {
    const parsed = parseInt(val as string, 10);
    return isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }, z.number().min(1)).default(1),
  limit: z.preprocess((val) => {
    const parsed = parseInt(val as string, 10);
    return isNaN(parsed) || parsed < 1 ? 10 : Math.min(100, parsed);
  }, z.number().min(1).max(100)).default(10),
  search: z.string().optional(),
  country: z.string().optional(),
  jobTitle: z.string().optional(),
  sortBy: z.enum(['fullName', 'email', 'country', 'jobTitle', 'salary', 'createdAt']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export type EmployeeListQuery = z.infer<typeof EmployeeListQuerySchema>;

export interface EmployeeListResponse {
  success: boolean;
  data: {
    employees: Employee[];
    pagination: {
      total: number;
      totalPages: number;
      currentPage: number;
      limit: number;
    };
  };
}

export interface ErrorResponse {
  success: false;
  error: string;
  details?: any;
}
