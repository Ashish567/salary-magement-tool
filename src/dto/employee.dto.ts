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

export interface ErrorResponse {
  success: false;
  error: string;
  details?: any;
}
