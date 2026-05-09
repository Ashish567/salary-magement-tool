import { NextRequest } from 'next/server';
import { EmployeeService } from '@/services/employee.service';
import { EmployeeRepositoryError } from '@/repositories/employee.repository';
import { ApiResponse } from '@/lib/api-response';

const employeeService = new EmployeeService();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await employeeService.getEmployeeById(params.id);
    return ApiResponse.success({ employee });
  } catch (error: any) {
    if (error instanceof EmployeeRepositoryError && error.code === 'NOT_FOUND') {
      return ApiResponse.notFound(error.message);
    }
    return ApiResponse.badRequest(error.message || 'Internal Server Error');
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return ApiResponse.badRequest('Invalid JSON body');
    }

    const employee = await employeeService.updateEmployee(params.id, body);
    return ApiResponse.success({ employee });
  } catch (error: any) {
    if (error instanceof EmployeeRepositoryError) {
      if (error.code === 'DUPLICATE_EMAIL') {
        return ApiResponse.conflict(error.message);
      }
      if (error.code === 'NOT_FOUND') {
        return ApiResponse.notFound(error.message);
      }
    }
    return ApiResponse.badRequest(error.message || 'Internal Server Error');
  }
}
