import { EmployeeRepository, EmployeeRepositoryError } from '@/repositories/employee.repository';
import { employeeSchema } from '@/validations/employee.schema';
import { CreateEmployeeRequest, EmployeeListQuery } from '@/dto/employee.dto';
import { Prisma } from '@prisma/client';

export class EmployeeService {
  private repository: EmployeeRepository;

  constructor() {
    this.repository = new EmployeeRepository();
  }

  async createEmployee(data: CreateEmployeeRequest) {
    // 1. Validation
    const validation = employeeSchema.safeParse(data);
    if (!validation.success) {
      throw new Error(validation.error.errors[0].message);
    }

    // 2. Persistence
    try {
      return await this.repository.createEmployee(validation.data);
    } catch (error) {
      if (error instanceof EmployeeRepositoryError) {
        throw error;
      }
      throw new Error('Failed to create employee');
    }
  }

  async getEmployees(query: EmployeeListQuery) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 20));
    const skip = (page - 1) * limit;

    const where: Prisma.EmployeeWhereInput = {};

    if (query.search) {
      where.OR = [
        { fullName: { contains: query.search } },
        { email: { contains: query.search } },
        { country: { contains: query.search } },
        { jobTitle: { contains: query.search } },
      ];
    }

    if (query.country) {
      where.country = query.country;
    }

    if (query.jobTitle) {
      where.jobTitle = query.jobTitle;
    }

    const orderBy: Prisma.EmployeeOrderByWithRelationInput = {
      [query.sortBy || 'createdAt']: query.order || 'desc',
    };

    const { employees, total } = await this.repository.findEmployees({
      skip,
      take: limit,
      where,
      orderBy,
    });

    return {
      employees,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },
    };
  }
}
