import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { EmployeeRepository } from '../../src/repositories/employee.repository';
import { prisma } from '../../src/lib/prisma';

describe('EmployeeRepository', () => {
  const repository = new EmployeeRepository();

  const employeeData = {
    firstName: 'Jane',
    lastName: 'Smith',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    country: 'Canada',
    jobTitle: 'Product Manager',
    salary: 75000,
  };

  beforeEach(async () => {
    // Clean DB before each test
    await prisma.employee.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create an employee successfully', async () => {
    const employee = await repository.createEmployee(employeeData);
    
    expect(employee).toBeDefined();
    expect(employee.id).toBeDefined();
    expect(employee.email).toBe(employeeData.email);
    expect(Number(employee.salary)).toBe(employeeData.salary);
  });

  it('should find an employee by email', async () => {
    await repository.createEmployee(employeeData);
    
    const found = await repository.findEmployeeByEmail(employeeData.email);
    
    expect(found).not.toBeNull();
    expect(found?.email).toBe(employeeData.email);
  });

  it('should return null if employee by email is not found', async () => {
    const found = await repository.findEmployeeByEmail('nonexistent@example.com');
    
    expect(found).toBeNull();
  });

  it('should find an employee by id', async () => {
    const created = await repository.createEmployee(employeeData);
    
    const found = await repository.findEmployeeById(created.id);
    
    expect(found).not.toBeNull();
    expect(found?.id).toBe(created.id);
  });

  it('should fail to create an employee with a duplicate email', async () => {
    await repository.createEmployee(employeeData);
    
    await expect(repository.createEmployee(employeeData)).rejects.toThrow();
  });
});
