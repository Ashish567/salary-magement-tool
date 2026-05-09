import { NextRequest } from 'next/server';
import { EmployeeService } from '@/services/employee.service';
import { EmployeeRepositoryError } from '@/repositories/employee.repository';
import { ApiResponse } from '@/lib/api-response';

const employeeService = new EmployeeService();

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return ApiResponse.badRequest('Invalid JSON body');
    }

    const employee = await employeeService.createEmployee(body);

    return ApiResponse.created({ employee });
  } catch (error: any) {
    if (error instanceof EmployeeRepositoryError) {
      if (error.code === 'DUPLICATE_EMAIL') {
        return ApiResponse.conflict(error.message);
      }
    }

    // Generic validation or other errors
    return ApiResponse.badRequest(error.message || 'Internal Server Error');
  }
}
