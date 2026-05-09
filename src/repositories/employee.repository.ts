import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

export class EmployeeRepository {
  async createEmployee(data: {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    country: string;
    jobTitle: string;
    salary: number;
  }) {
    return await prisma.employee.create({
      data: {
        ...data,
      },
    });
  }

  async findEmployeeByEmail(email: string) {
    return await prisma.employee.findUnique({
      where: { email },
    });
  }

  async findEmployeeById(id: string) {
    return await prisma.employee.findUnique({
      where: { id },
    });
  }
}
