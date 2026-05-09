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

export interface EmployeeListQuery {
  page?: number;
  limit?: number;
  search?: string;
  country?: string;
  jobTitle?: string;
  sortBy?: 'fullName' | 'email' | 'country' | 'jobTitle' | 'salary' | 'createdAt';
  order?: 'asc' | 'desc';
}

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
