import { describe, it, expect, beforeEach } from 'vitest';
import { DELETE } from '../../src/app/api/employees/[id]/route';
import { prisma } from '../../src/lib/prisma';

describe('Employee Delete API', () => {
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

  const createRequest = () => {
    return new Request(`http://localhost:3000/api/employees/${employeeId}`, {
      method: 'DELETE',
    });
  };

  it('should delete employee successfully', async () => {
    const req = createRequest();
    const res = await DELETE(req as any, { params: { id: employeeId } });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);

    const deleted = await prisma.employee.findUnique({ where: { id: employeeId } });
    expect(deleted).toBeNull();
  });

  it('should return 404 for non-existent employee', async () => {
    const req = new Request(`http://localhost:3000/api/employees/non-existent`, { method: 'DELETE' });
    const res = await DELETE(req as any, { params: { id: 'non-existent' } });
    expect(res.status).toBe(404);
  });
});
