import { describe, it, expect } from 'vitest';
import { employeeSchema } from '../../src/validations/employee.schema';

describe('Employee Validation Schema', () => {
  const validEmployee = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    country: 'USA',
    jobTitle: 'Software Engineer',
    salary: 50000,
  };

  it('should pass with a valid employee', () => {
    const result = employeeSchema.safeParse(validEmployee);
    expect(result.success).toBe(true);
  });

  it('should fail with an invalid email', () => {
    const result = employeeSchema.safeParse({
      ...validEmployee,
      email: 'invalid-email',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email');
    }
  });

  it('should fail with a negative salary', () => {
    const result = employeeSchema.safeParse({
      ...validEmployee,
      salary: -100,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('salary');
    }
  });

  it('should fail with a zero salary', () => {
    const result = employeeSchema.safeParse({
      ...validEmployee,
      salary: 0,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('salary');
    }
  });

  it('should fail when required fields are missing', () => {
    const result = employeeSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path[0]);
      expect(paths).toContain('firstName');
      expect(paths).toContain('lastName');
      expect(paths).toContain('email');
      expect(paths).toContain('country');
      expect(paths).toContain('jobTitle');
      expect(paths).toContain('salary');
    }
  });

  it('should fail with empty strings for required fields', () => {
    const result = employeeSchema.safeParse({
      ...validEmployee,
      firstName: '',
      lastName: '',
      country: '',
      jobTitle: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path[0]);
      expect(paths).toContain('firstName');
      expect(paths).toContain('lastName');
      expect(paths).toContain('country');
      expect(paths).toContain('jobTitle');
    }
  });

  it('should fail with firstName too short', () => {
    const result = employeeSchema.safeParse({
      ...validEmployee,
      firstName: 'A',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('firstName');
    }
  });

  it('should fail with lastName too short', () => {
    const result = employeeSchema.safeParse({
      ...validEmployee,
      lastName: 'B',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('lastName');
    }
  });
});
