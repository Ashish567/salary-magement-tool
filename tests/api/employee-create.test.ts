import { describe, it, expect, beforeEach, vi } from 'vitest';
import { POST } from '../../src/app/api/employees/route';
import { prisma } from '../../src/lib/prisma';

describe('Employee Creation API (POST /api/employees)', () => {
  const validEmployee = {
    firstName: 'Alice',
    lastName: 'Johnson',
    fullName: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    country: 'UK',
    jobTitle: 'Data Scientist',
    salary: 85000,
  };

  beforeEach(async () => {
    await prisma.employee.deleteMany();
  });

  const createRequest = (body: any) => {
    return new Request('http://localhost:3000/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  it('should create an employee and return 201', async () => {
    const req = createRequest(validEmployee);
    const res = await POST(req as any);
    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data.employee.email).toBe(validEmployee.email);

    // Verify DB persistence
    const dbEmployee = await prisma.employee.findUnique({
      where: { email: validEmployee.email },
    });
    expect(dbEmployee).not.toBeNull();
  });

  it('should return 400 for invalid email', async () => {
    const req = createRequest({ ...validEmployee, email: 'invalid-email' });
    const res = await POST(req as any);
    
    expect(res.status).toBe(400);
  });

  it('should return 400 for negative salary', async () => {
    const req = createRequest({ ...validEmployee, salary: -1000 });
    const res = await POST(req as any);
    
    expect(res.status).toBe(400);
  });

  it('should return 400 for missing fields', async () => {
    const req = createRequest({ firstName: 'Alice' });
    const res = await POST(req as any);
    
    expect(res.status).toBe(400);
  });

  it('should return 409 for duplicate email', async () => {
    // Create first employee
    await POST(createRequest(validEmployee) as any);
    
    // Attempt to create again
    const req = createRequest(validEmployee);
    const res = await POST(req as any);
    
    expect(res.status).toBe(409);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toContain('already exists');
  });

  it('should return 400 for invalid JSON body', async () => {
    const req = new Request('http://localhost:3000/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'invalid-json',
    });
    
    const res = await POST(req as any);
    expect(res.status).toBe(400);
  });
});
