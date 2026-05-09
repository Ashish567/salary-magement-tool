import { EmployeeRepository, EmployeeRepositoryError } from '@/repositories/employee.repository';
import { employeeSchema } from '@/validations/employee.schema';
import { CreateEmployeeRequest } from '@/dto/employee.dto';

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
}
