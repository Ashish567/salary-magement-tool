import { describe, it, expect } from 'vitest';
import { generateEmployee, generateEmployees } from '../../src/utils/employee-generator';
import { COUNTRIES, JOB_TITLES } from '../../src/constants/employee-constants';

describe('EmployeeGenerator', () => {
  it('generates a valid employee object', () => {
    const emp = generateEmployee();
    expect(emp.firstName).toBeDefined();
    expect(emp.lastName).toBeDefined();
    expect(emp.fullName).toBe(`${emp.firstName} ${emp.lastName}`);
    expect(emp.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(COUNTRIES).toContain(emp.country);
    expect(JOB_TITLES).toContain(emp.jobTitle);
    expect(emp.salary).toBeGreaterThan(0);
  });

  it('generates a specified number of employees', () => {
    const count = 10;
    const employees = generateEmployees(count);
    expect(employees).toHaveLength(count);
    
    // Check uniqueness of emails in small batch
    const emails = new Set(employees.map(e => e.email));
    expect(emails.size).toBe(count);
  });

  it('generates salaries within realistic ranges', () => {
    const emp = generateEmployee();
    // Assuming realistic salary between 30k and 300k
    expect(emp.salary).toBeGreaterThanOrEqual(30000);
    expect(emp.salary).toBeLessThanOrEqual(300000);
  });
});
