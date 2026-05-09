import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

export class EmployeeRepositoryError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'EmployeeRepositoryError';
  }
}

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
    try {
      return await prisma.employee.create({
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new EmployeeRepositoryError('Email already exists', 'DUPLICATE_EMAIL');
        }
      }
      throw new EmployeeRepositoryError('Failed to create employee');
    }
  }

  async findEmployeeByEmail(email: string) {
    try {
      return await prisma.employee.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new EmployeeRepositoryError('Failed to find employee by email');
    }
  }

  async findEmployeeById(id: string) {
    try {
      return await prisma.employee.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new EmployeeRepositoryError('Failed to find employee by id');
    }
  }
}
