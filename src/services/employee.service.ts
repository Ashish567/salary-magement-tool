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
    const { skip, take, page } = this.getPaginationParams(query);
    const where = this.buildWhereClause(query);
    const orderBy = this.buildOrderByClause(query);

    const { employees, total } = await this.repository.findEmployees({
      skip,
      take,
      where,
      orderBy,
    });

    return {
      employees,
      pagination: {
        total,
        totalPages: Math.ceil(total / take),
        currentPage: page,
        limit: take,
      },
    };
  }

  private getPaginationParams(query: EmployeeListQuery) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 20));
    return {
      skip: (page - 1) * limit,
      take: limit,
      page,
    };
  }

  private buildWhereClause(query: EmployeeListQuery): Prisma.EmployeeWhereInput {
    const where: Prisma.EmployeeWhereInput = {};

    if (query.search) {
      const search = query.search;
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { country: { contains: search } },
        { jobTitle: { contains: search } },
      ];
    }

    if (query.country) {
      where.country = query.country;
    }

    if (query.jobTitle) {
      where.jobTitle = query.jobTitle;
    }

    return where;
  }

  private buildOrderByClause(query: EmployeeListQuery): Prisma.EmployeeOrderByWithRelationInput {
    const sortBy = query.sortBy || 'createdAt';
    const order = query.order || 'desc';

    return {
      [sortBy]: order,
    };
  }

  async getEmployeeById(id: string) {
    const employee = await this.repository.findEmployeeById(id);
    if (!employee) {
      throw new EmployeeRepositoryError('Employee not found', 'NOT_FOUND');
    }
    return employee;
  }

  async updateEmployee(id: string, data: Partial<CreateEmployeeRequest>) {
    // 1. Partial Validation (if fields are provided)
    const validation = employeeSchema.partial().safeParse(data);
    if (!validation.success) {
      throw new Error(validation.error.errors[0].message);
    }

    // 2. Persistence
    try {
      return await this.repository.updateEmployee(id, validation.data);
    } catch (error) {
      if (error instanceof EmployeeRepositoryError) {
        throw error;
      }
      throw new Error('Failed to update employee');
    }
  }
}
