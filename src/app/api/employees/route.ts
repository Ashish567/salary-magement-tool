import { NextRequest, NextResponse } from 'next/server';
import { EmployeeService } from '@/services/employee.service';
import { EmployeeRepositoryError } from '@/repositories/employee.repository';

const employeeService = new EmployeeService();

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const employee = await employeeService.createEmployee(body);

    return NextResponse.json(
      { success: true, data: { employee } },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof EmployeeRepositoryError) {
      if (error.code === 'DUPLICATE_EMAIL') {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 409 }
        );
      }
    }

    // Generic validation or other errors
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 400 }
    );
  }
}
