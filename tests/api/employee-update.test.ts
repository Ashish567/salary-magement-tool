import { describe, it, expect, beforeEach } from 'vitest';
import { GET, PUT } from '../../src/app/api/employees/[id]/route';
import { prisma } from '../../src/lib/prisma';

describe('Employee Update API', () => {
  let employeeId: string;

  beforeEach(async () => {
    await prisma.employee.deleteMany();
    const emp = await prisma.employee.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        country: 'USA',
        jobTitle: 'Engineer',
        salary: 50000,
      },
    });
    employeeId = emp.id;
  });

  const createRequest = (method: string, body?: any) => {
    return new Request(`http://localhost:3000/api/employees/${employeeId}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
    });
  };

  describe('GET /api/employees/[id]', () => {
    it('should return employee details', async () => {
      const req = createRequest('GET');
      const res = await GET(req as any, { params: { id: employeeId } });
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body.data.employee.fullName).toBe('John Doe');
    });

    it('should return 404 for non-existent employee', async () => {
      const req = new Request(`http://localhost:3000/api/employees/non-existent`, { method: 'GET' });
      const res = await GET(req as any, { params: { id: 'non-existent' } });
      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/employees/[id]', () => {
    it('should update employee successfully', async () => {
      const updateData = {
        firstName: 'Johnathan',
        salary: 60000,
      };
      const req = createRequest('PUT', updateData);
      const res = await PUT(req as any, { params: { id: employeeId } });
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body.data.employee.firstName).toBe('Johnathan');
      expect(body.data.employee.salary).toBe(60000);
    });

    it('should reject invalid email', async () => {
      const req = createRequest('PUT', { email: 'invalid-email' });
      const res = await PUT(req as any, { params: { id: employeeId } });
      expect(res.status).toBe(400);
    });

    it('should reject duplicate email', async () => {
      await prisma.employee.create({
        data: {
          firstName: 'Jane',
          lastName: 'Doe',
          fullName: 'Jane Doe',
          email: 'jane@example.com',
          country: 'USA',
          jobTitle: 'Designer',
          salary: 50000,
        },
      });

      const req = createRequest('PUT', { email: 'jane@example.com' });
      const res = await PUT(req as any, { params: { id: employeeId } });
      expect(res.status).toBe(409);
    });
  });
});
