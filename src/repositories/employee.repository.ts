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

  async findEmployees(params: {
    skip: number;
    take: number;
    where: Prisma.EmployeeWhereInput;
    orderBy: Prisma.EmployeeOrderByWithRelationInput;
  }) {
    try {
      const [employees, total] = await Promise.all([
        prisma.employee.findMany({
          skip: params.skip,
          take: params.take,
          where: params.where,
          orderBy: params.orderBy,
        }),
        prisma.employee.count({
          where: params.where,
        }),
      ]);

      return { employees, total };
    } catch (error) {
      throw new EmployeeRepositoryError('Failed to fetch employees');
    }
  }

  async updateEmployee(id: string, data: Partial<Prisma.EmployeeUpdateInput>) {
    try {
      return await prisma.employee.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new EmployeeRepositoryError('Email already exists', 'DUPLICATE_EMAIL');
        }
        if (error.code === 'P2025') {
          throw new EmployeeRepositoryError('Employee not found', 'NOT_FOUND');
        }
      }
      throw new EmployeeRepositoryError('Failed to update employee');
    }
  }

  async deleteEmployee(id: string) {
    try {
      return await prisma.employee.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new EmployeeRepositoryError('Employee not found', 'NOT_FOUND');
        }
      }
      throw new EmployeeRepositoryError('Failed to delete employee');
    }
  }
}
